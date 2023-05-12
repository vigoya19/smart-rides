import { DataSource } from 'typeorm';
import { database } from './database';

export const AppDataSource = new DataSource({ ...(database as any) });
