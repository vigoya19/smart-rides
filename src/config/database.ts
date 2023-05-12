import * as dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Ride } from '../ride/ride.entity';
import { Rider } from '../rider/rider.entity';
import { Driver } from '../driver/driver.entity';
import { PaymentSource } from '../payment-resource//payment-source.entity';
import { CreateAllTables1634231796594 } from '../migrations/CreateAllTables1634231796594';
import { data1679412942234 } from '../migrations/data1679412942234';

dotenv.config();

export const database = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Rider, Driver, Ride, PaymentSource],
  migrations: [CreateAllTables1634231796594, data1679412942234],
  namingStrategy: new SnakeNamingStrategy(),
};
