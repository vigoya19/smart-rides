import { database } from './database';
import { Module, Logger, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpService } from '@nestjs/axios';
import { AxiosError } from 'axios';
import { RideModule } from '../ride/ride.module';
import { RiderModule } from '../rider/rider.module';
import { PaymentProviderModule } from '../provider/payment-provider.module.ts.module';
import { PaymentResourceModule } from '../payment-resource/payment-resource.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ResponseInterceptor } from '../interceptors/response.interceptors';
import { APP_FILTER } from '@nestjs/core';
import { ErrorFilter } from '../filters/error.filters';
import { DriverModule } from '../driver/driver.module';
import { GlobalHttpModule } from '../common/axios/global-http.module';
import { PositionModule } from '../position/position.module';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: database.host,
      port: +database.port,
      username: database.username,
      password: database.password,
      database: database.database,
      entities: database.entities,
      namingStrategy: database.namingStrategy,
      synchronize: true,
    }),

    GlobalHttpModule,
    PositionModule,
    RideModule,
    RiderModule,
    DriverModule,
    PaymentProviderModule,
    PaymentResourceModule,
    TypeOrmModule.forFeature(database.entities),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: ErrorFilter,
    },
  ],
})
export class AppModule {
  private readonly logger = new Logger('HttpService');

  constructor(private httpService: HttpService) {}

  // onModuleInit() {
  //   this.httpService.axiosRef.interceptors.request.use((config) => {
  //     this.logger.log(
  //       `HTTP request: ${config.method.toUpperCase()} ${config.url}`,
  //     );
  //     return config;
  //   });

  //   this.httpService.axiosRef.interceptors.response.use(
  //     (response) => {
  //       this.logger.log(
  //         `HTTP response: ${response.status} ${response.statusText}`,
  //       );
  //       return response;
  //     },
  //     (error) => {
  //       const axiosError = error as AxiosError;
  //       if (axiosError.response) {
  //         this.logger.error(axiosError.response.data);
  //       } else {
  //         this.logger.error('Error:', axiosError.message);
  //       }
  //       throw error;
  //     },
  //   );
  // }
}
