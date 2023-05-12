import { Controller, Post, Body } from '@nestjs/common';
import { Rider } from '../rider/rider.entity';
import { RiderService } from '../rider/rider.service';
import { CreatePaymentSourceDto } from './dto/create-payment-resource.dto';

@Controller('/api/payment-source')
export class PaymentResourceController {
  constructor(private readonly riderService: RiderService) {}

  @Post()
  async paymentSource(@Body() request: CreatePaymentSourceDto): Promise<Rider> {
    return await this.riderService.createPaymentSource(
      request.email,
      request.cardToken,
    );
  }
}
