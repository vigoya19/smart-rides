import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from '../driver/driver.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Driver])],
  providers: [],
  controllers: [],
  exports: [],
})
export class DriverModule {}
