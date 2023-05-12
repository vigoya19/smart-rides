import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GlobalHttpModule } from '../common/axios/global-http.module';
import { PaymentProviderService } from './payment-provider.service';

@Module({
  imports: [HttpModule, GlobalHttpModule],
  providers: [PaymentProviderService, GlobalHttpModule],
  exports: [PaymentProviderService],
})
export class PaymentProviderModule {}
