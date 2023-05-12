import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RiderService } from '../rider/rider.service';
import { Rider } from '../rider/rider.entity';
import { PaymentProviderModule } from '../provider/payment-provider.module.ts.module';
import { HttpModule } from '@nestjs/axios';
import { RiderController } from './rider.controller';
import { Ride } from '../ride/ride.entity';
import { PaymentSource } from '../payment-resource/payment-source.entity';

@Module({
  imports: [
    HttpModule,
    PaymentProviderModule,
    TypeOrmModule.forFeature([Rider, Ride, PaymentSource]),
  ],
  providers: [RiderService],
  controllers: [RiderController],
  exports: [RiderService],
})
export class RiderModule {}
