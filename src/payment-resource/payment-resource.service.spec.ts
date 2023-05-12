import { Test, TestingModule } from '@nestjs/testing';
import { PaymentResourceService } from '../payment-resource/payment-source.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Rider } from '../rider/rider.entity';
import { PaymentProviderService } from '../provider/payment-provider.service';
import { Repository } from 'typeorm';
import { AcceptanceTokenResponseDto } from '../provider/dto/acceptance-token-response.dto';
import { HttpRequestService } from '../common/axios/httpRequestService';
import { HttpModule } from '@nestjs/axios';

describe('PaymentResourceService', () => {
  let service: PaymentResourceService;
  let riderRepository: Repository<Rider>;
  let paymentProviderService: PaymentProviderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],

      providers: [
        PaymentResourceService,
        {
          provide: getRepositoryToken(Rider),
          useClass: Repository,
        },
        PaymentProviderService,
        HttpRequestService,
      ],
    }).compile();

    service = module.get<PaymentResourceService>(PaymentResourceService);
    riderRepository = module.get(getRepositoryToken(Rider));
    paymentProviderService = module.get(PaymentProviderService);
  });

  describe('createPaymentSource', () => {
    const email = 'test@example.com';
    const cardToken = 'card_token';

    it('should create a new payment source and assign it to the rider', async () => {
      const acceptanceTokenResponse: AcceptanceTokenResponseDto = {
        data: {
          id: 'some_id',
          presigned_acceptance: { acceptance_token: 'acceptance_token' },
        },
      };

      const rider = new Rider();
      rider.email = email;

      jest.spyOn(riderRepository, 'findOne').mockResolvedValue(rider);
      jest.spyOn(riderRepository, 'save').mockResolvedValue(rider);
      jest
        .spyOn(paymentProviderService, 'acceptanceToken')
        .mockResolvedValue(acceptanceTokenResponse);
      jest.spyOn(paymentProviderService, 'paymentSource').mockResolvedValue({
        data: {
          id: 234,
        },
      });

      const updatedRider = await service.createPaymentSource(email, cardToken);

      expect(updatedRider.paymentSourceId).toEqual(234); //
    });
  });
});
