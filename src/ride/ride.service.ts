import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Position } from '../position/position.entity';
import { Driver } from '../driver/driver.entity';
import { Rider } from '../rider/rider.entity';
import { Ride } from '../ride/ride.entity';
import { v4 as uuidv4 } from 'uuid';
import { PaymentProviderService } from '../provider/payment-provider.service';
import { PaymentSource } from '../payment-resource/payment-source.entity';
import { DistanceService } from '../common/sharedServices/distances.service';

@Injectable()
export class RideService {
  constructor(
    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,
    @InjectRepository(Driver)
    private driverRepository: Repository<Driver>,
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    @InjectRepository(PaymentSource)
    private paymentRepository: Repository<PaymentSource>,
    private paymentProviderService: PaymentProviderService,
  ) {}

  async requestRide(email: string, startPosition: Position): Promise<Ride> {
    const rider = await this.findOrCreateRiderByEmail(email);
    const driver = await this.getDriver(startPosition);

    return this.createRide(rider, driver, startPosition);
  }

  private async createRide(
    rider: Rider,
    driver: Driver,
    startPosition: Position,
  ): Promise<Ride> {
    const ride = new Ride();
    ride.driver = driver;
    ride.rider = rider;
    ride.startDate = new Date();
    ride.startPosition = startPosition;

    return this.rideRepository.save(ride);
  }

  async finishRide(id: number, endPosition: Position): Promise<Ride> {
    const ride = await this.getRideById(id);
    const reference = uuidv4();

    DistanceService.completeRide(endPosition, ride);

    const transaction = await this.createTransaction(ride, reference);
    const payment = await this.createPayment(reference, transaction);

    ride.paymentSource = payment;

    return this.rideRepository.save(ride);
  }

  private async getRideById(id: number): Promise<Ride> {
    return this.rideRepository.findOneById(id);
  }

  private async createTransaction(ride: Ride, reference: string): Promise<any> {
    return this.paymentProviderService.transaction(ride, reference);
  }

  private async createPayment(
    reference: string,
    transaction: any,
  ): Promise<PaymentSource> {
    const payment = new PaymentSource(
      reference,
      transaction.data.id,
      transaction.data.status,
    );

    return this.paymentRepository.save(payment);
  }

  private async getDriver(position: Position) {
    const drivers = await this.driverRepository.find();

    const driversWithDistance = drivers.map((driver) => {
      const distance = DistanceService.haversine(
        position.latitude,
        position.longitude,
        driver.position.latitude,
        driver.position.longitude,
      );
      return { ...driver, distance };
    });

    driversWithDistance.sort((a, b) => a.distance - b.distance);

    return driversWithDistance[0];
  }

  private async findOrCreateRiderByEmail(email: string): Promise<Rider> {
    let rider = await this.riderRepository.findOne({ where: { email } });

    if (!rider) {
      rider = new Rider();
      rider.email = email;
      rider = await this.riderRepository.save(rider);
    }

    return rider;
  }
}
