import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Rider } from '../rider/rider.entity';
import { PaymentProviderService } from '../provider/payment-provider.service';

import { Ride } from '../ride/ride.entity';

@Injectable()
export class RiderService {
  constructor(
    @InjectRepository(Rider)
    private riderRepository: Repository<Rider>,

    @InjectRepository(Ride)
    private rideRepository: Repository<Ride>,

    private paymentProviderService: PaymentProviderService,
  ) {}

  async createPaymentSource(email: string, cardToken: string): Promise<Rider> {
    const rider = await this.getOrCreateRider(email);

    const acceptanceToken = await this.paymentProviderService.acceptanceToken();
    const paymentSource = await this.paymentProviderService.paymentSource(
      rider,
      cardToken,
      acceptanceToken.data.presigned_acceptance.acceptance_token,
    );

    rider.paymentSourceId = paymentSource.data.id;

    return this.riderRepository.save(rider);
  }

  private async getOrCreateRider(email: string): Promise<Rider> {
    const rider = await this.riderRepository.findOne({
      where: {
        email,
      },
    });

    if (rider) {
      return rider;
    }

    const newRider = new Rider();
    newRider.email = email;

    return this.riderRepository.save(newRider);
  }
}
