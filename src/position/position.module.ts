import { Module } from '@nestjs/common';
import { Position } from '../position/position.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [TypeOrmModule.forFeature([Position])],
  providers: [],
  controllers: [],
  exports: [],
})
export class PositionModule {}
