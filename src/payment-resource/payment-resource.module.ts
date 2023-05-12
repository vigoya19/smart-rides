import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderService } from '../rider/rider.service';
import { Rider } from '../rider/rider.entity';
import { PaymentProviderModule } from '../provider/payment-provider.module.ts.module';
import { HttpModule } from '@nestjs/axios';
// import { RiderController } from '../rider/rider.controller';
import { Ride } from '../ride/ride.entity';
import { PaymentSource } from '../payment-resource/payment-source.entity';
import { PaymentResourceService } from './payment-source.service';
import { PaymentResourceController } from './payment-resource.controller';

@Module({
  imports: [
    HttpModule,
    PaymentProviderModule,
    TypeOrmModule.forFeature([Rider, Ride, PaymentSource]),
  ],
  providers: [PaymentResourceService, RiderService],
  controllers: [PaymentResourceController],
  exports: [PaymentResourceService],
})
export class PaymentResourceModule {}
