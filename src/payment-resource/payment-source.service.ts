import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rider } from '../rider/rider.entity';
import { PaymentProviderService } from '../provider/payment-provider.service';

@Injectable()
export class PaymentResourceService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,
    private paymentProviderService: PaymentProviderService,
  ) {}

  async createPaymentSource(email: string, cardToken: string): Promise<Rider> {
    const rider = await this.findOrCreateRiderByEmail(email);
    const acceptanceToken = await this.fetchAcceptanceToken();
    const paymentSource = await this.assignPaymentSourceToRider(
      rider,
      cardToken,
      acceptanceToken,
    );

    rider.paymentSourceId = paymentSource.data.id;
    return this.riderRepository.save(rider);
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

  private async fetchAcceptanceToken(): Promise<any> {
    return this.paymentProviderService.acceptanceToken();
  }

  private async assignPaymentSourceToRider(
    rider: Rider,
    cardToken: string,
    acceptanceToken: any,
  ): Promise<any> {
    return this.paymentProviderService.paymentSource(
      rider,
      cardToken,
      acceptanceToken.data.presigned_acceptance.acceptance_token,
    );
  }
}
