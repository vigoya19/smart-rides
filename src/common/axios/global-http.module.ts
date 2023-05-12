import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { HttpRequestService } from './httpRequestService';

@Module({
  imports: [
    HttpModule.register({
      baseURL: `${process.env.PAYMENT_BASE_URL}`, // URL base para todas las solicitudes
      timeout: 50000, // Tiempo de espera en milisegundos antes de que la solicitud sea abortada
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PAYMENT_PRIVATE_TOKEN}`,
      },
    }),
  ],
  providers: [HttpRequestService],
  exports: [HttpModule, HttpRequestService],
})
export class GlobalHttpModule {}
