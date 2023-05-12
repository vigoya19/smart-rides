import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/config/app.module';
import { CreatePaymentSourceDto } from './../src/payment-resource/dto/create-payment-resource.dto';

describe('PaymentResourceController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/api/payment-source (POST)', () => {
    const createPaymentSourceDto: CreatePaymentSourceDto = {
      email: 'vigoya19@gmail.com',
      cardToken: 'tok_test_44428_3244e25497CBc4668fa7476989eeeCb0',
    };

    return request(app.getHttpServer())
      .post('/api/payment-source')
      .send(createPaymentSourceDto)
      .expect(201) // Cambia esto según la respuesta esperada de tu controlador
      .expect((res) => {
        const { paymentSourceId } = res.body.data;
        expect(paymentSourceId).toBeDefined();
      });
  });
});
