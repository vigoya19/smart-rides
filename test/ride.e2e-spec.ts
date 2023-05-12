import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../config/app.module';

describe('RideController (e2e)', () => {
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

  it('/api/ride/request-ride (POST)', () => {
    const requestBody = {
      email: 'test@example.com',
      latitude: 40.712776,
      longitude: -74.005974,
    };

    return request(app.getHttpServer())
      .post('/api/ride/request-ride')
      .send(requestBody)
      .expect(201)
      .then((response) => {
        // Add your assertions here, e.g.
        expect(response.body.rider.email).toEqual(requestBody.email);
        expect(response.body.startPosition.latitude).toEqual(
          requestBody.latitude,
        );
        expect(response.body.startPosition.longitude).toEqual(
          requestBody.longitude,
        );
      });
  });

  it('/api/ride/finish-ride (POST)', async () => {
    // Create a ride before finishing it
    const startPosition = {
      email: 'test@example.com',
      latitude: 40.712776,
      longitude: -74.005974,
    };

    const createdRideResponse = await request(app.getHttpServer())
      .post('/api/ride/request-ride')
      .send(startPosition);

    const createdRideId = createdRideResponse.body.id;

    const finishRideRequest = {
      id: createdRideId,
      latitude: 40.73061,
      longitude: -73.935242,
    };

    return request(app.getHttpServer())
      .post('/api/ride/finish-ride')
      .send(finishRideRequest)
      .expect(200)
      .then((response) => {
        // Add your assertions here, e.g.
        expect(response.body.id).toEqual(createdRideId);
        expect(response.body.endPosition.latitude).toEqual(
          finishRideRequest.latitude,
        );
        expect(response.body.endPosition.longitude).toEqual(
          finishRideRequest.longitude,
        );
      });
  });
});
