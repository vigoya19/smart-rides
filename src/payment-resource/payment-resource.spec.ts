import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResourceController } from './payment-resource.controller';
import { RiderService } from '../rider/rider.service';
import { Rider } from '../rider/rider.entity';
import { CreatePaymentSourceDto } from './dto/create-payment-resource.dto';

describe('PaymentResourceController', () => {
  let controller: PaymentResourceController;
  let riderService: RiderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentResourceController],
      providers: [
        {
          provide: RiderService,
          useValue: {
            createPaymentSource: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PaymentResourceController>(
      PaymentResourceController,
    );
    riderService = module.get<RiderService>(RiderService);
  });

  describe('paymentSource', () => {
    it('should create a new payment source and assign it to the rider', async () => {
      const request: CreatePaymentSourceDto = {
        email: 'test@example.com',
        cardToken: 'card_token',
      };

      const rider = new Rider();
      rider.email = request.email;
      rider.paymentSourceId = 234;

      jest.spyOn(riderService, 'createPaymentSource').mockResolvedValue(rider);

      const result = await controller.paymentSource(request);

      expect(riderService.createPaymentSource).toHaveBeenCalledWith(
        request.email,
        request.cardToken,
      );
      expect(result).toEqual(rider);
    });
  });
});
