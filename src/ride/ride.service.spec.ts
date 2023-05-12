// ride.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { RideService } from './ride.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Ride } from '../ride/ride.entity';
import { Driver } from '../driver/driver.entity';
import { Rider } from '../rider/rider.entity';
import { PaymentSource } from '../payment-resource/payment-source.entity';
import { PaymentProviderService } from '../provider/payment-provider.service';
import { Position } from '../position/position.entity';

describe('RideService', () => {
  let rideService: RideService;
  let rideRepository: Repository<Ride>;
  let driverRepository: Repository<Driver>;
  let riderRepository: Repository<Rider>;
  let paymentRepository: Repository<PaymentSource>;
  let paymentProviderService: PaymentProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RideService,
        {
          provide: getRepositoryToken(Ride),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Driver),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Rider),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(PaymentSource),
          useClass: Repository,
        },
        {
          provide: PaymentProviderService,
          useValue: {
            transaction: jest.fn(),
          },
        },
      ],
    }).compile();

    rideService = module.get<RideService>(RideService);
    rideRepository = module.get<Repository<Ride>>(getRepositoryToken(Ride));
    driverRepository = module.get<Repository<Driver>>(
      getRepositoryToken(Driver),
    );
    riderRepository = module.get<Repository<Rider>>(getRepositoryToken(Rider));
    paymentRepository = module.get<Repository<PaymentSource>>(
      getRepositoryToken(PaymentSource),
    );
    paymentProviderService = module.get<PaymentProviderService>(
      PaymentProviderService,
    );
  });

  it('should be defined', () => {
    expect(rideService).toBeDefined();
  });

  describe('requestRide', () => {
    it('should create a new ride', async () => {
      const email = 'test@example.com';
      const startPosition = new Position(12.34, 56.78);

      const rider = new Rider();
      rider.email = email;

      const driver = new Driver();
      driver.position = startPosition;

      jest.spyOn(riderRepository, 'findOne').mockResolvedValue(rider);
      jest.spyOn(driverRepository, 'find').mockResolvedValue([driver]);
      jest
        .spyOn(rideRepository, 'save')
        .mockImplementation((ride) => Promise.resolve(ride as Ride));

      const ride = await rideService.requestRide(email, startPosition);

      expect(ride.rider.email).toEqual(email);
      expect(ride.startPosition).toEqual(startPosition);
    });
  });

  describe('finishRide', () => {
    it('should complete the ride and save payment information', async () => {
      const rideId = 1;
      const endPosition = new Position(12.34, 56.78);

      const startPosition = new Position(12.34, 56.78);
      const ride = new Ride();
      ride.id = rideId;
      ride.startPosition = startPosition;
      ride.startDate = new Date();

      const transactionData = { id: 'transaction_id', status: 'success' };
      const transactionResponse = { data: transactionData };

      jest.spyOn(rideRepository, 'findOneById').mockResolvedValue(ride);

      jest
        .spyOn(paymentProviderService, 'transaction')
        .mockImplementation((_ride: Ride, _reference: string) =>
          Promise.resolve(transactionResponse),
        );

      jest
        .spyOn(paymentRepository, 'save')
        .mockImplementation((payment) =>
          Promise.resolve(payment as PaymentSource),
        );
      jest
        .spyOn(rideRepository, 'save')
        .mockImplementation((updatedRide) =>
          Promise.resolve(updatedRide as Ride),
        );

      const completedRide = await rideService.finishRide(rideId, endPosition);

      expect(completedRide.paymentSource.paymentId).toEqual(transactionData.id);

      expect(completedRide.paymentSource.status).toEqual(
        transactionData.status,
      );
    });
  });

  describe('getDriver', () => {
    it('should return the nearest driver', async () => {
      const position = new Position(12.34, 56.78);

      const driver1 = new Driver();
      driver1.position = new Position(12.35, 56.78);

      const driver2 = new Driver();
      driver2.position = new Position(12.36, 56.78);

      const drivers = [driver1, driver2];

      jest.spyOn(driverRepository, 'find').mockResolvedValue(drivers);

      const getDriverMethod = (rideService as any).getDriver;
      const nearestDriver = await getDriverMethod.call(rideService, position);

      expect(nearestDriver.position).toEqual(driver1.position);
    });
  });

  describe('findOrCreateRiderByEmail', () => {
    it('should return an existing rider', async () => {
      const email = 'test@example.com';
      const rider = new Rider();
      rider.email = email;

      jest.spyOn(riderRepository, 'findOne').mockResolvedValue(rider);

      const findOrCreateRiderMethod = (rideService as any)
        .findOrCreateRiderByEmail;
      const foundRider = await findOrCreateRiderMethod.call(rideService, email);

      expect(foundRider.email).toEqual(email);
    });

    it('should create a new rider if not found', async () => {
      const email = 'new@example.com';

      jest.spyOn(riderRepository, 'findOne').mockResolvedValue(undefined);
      jest
        .spyOn(riderRepository, 'save')
        .mockImplementation((rider) => Promise.resolve(rider as Rider));

      const findOrCreateRiderMethod = (rideService as any)
        .findOrCreateRiderByEmail;
      const newRider = await findOrCreateRiderMethod.call(rideService, email);

      expect(newRider.email).toEqual(email);
    });
  });
});
