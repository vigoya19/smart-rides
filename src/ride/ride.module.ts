import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ride } from './ride.entity';
import { Rider } from '../rider/rider.entity';
import { RideService } from './ride.service';
import { RideController } from './ride.controller';
import { Driver } from '../driver/driver.entity';
import { PaymentSource } from '../payment-resource/payment-source.entity';

import { PaymentProviderModule } from '../provider/payment-provider.module.ts.module';
import { HttpModule } from '@nestjs/axios';
import { DistanceService } from '../common/sharedServices/distances.service';

@Module({
  imports: [
    HttpModule,
    PaymentProviderModule,

    TypeOrmModule.forFeature([Ride, Rider, Driver, PaymentSource]),
  ],
  providers: [RideService, DistanceService],
  controllers: [RideController],
  exports: [RideService],
})
export class RideModule {}
