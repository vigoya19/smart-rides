import {
  Controller,
  Post,
  Get,
  NotFoundException,
  BadRequestException,
  Body,
} from '@nestjs/common';
import { RideService } from '../ride/ride.service';
import { Ride } from '../ride/ride.entity';
import { Position } from '../position/position.entity';
import { ApiTags } from '@nestjs/swagger';

import { FinishRideDto } from './dto/finish-ride.dto';
import { requestRideDto } from './dto/request-ride.dto';

@ApiTags('Ride Endpoints')
@Controller('/api/ride')
export class RideController {
  constructor(private readonly rideService: RideService) {}

  @Post('/request-ride')
  async requestRide(@Body() request: requestRideDto): Promise<Ride> {
    const startPosition = new Position(request.latitude, request.longitude);
    return this.rideService.requestRide(request.email, startPosition);
  }

  @Post('/finish-ride')
  async finishRide(@Body() request: FinishRideDto): Promise<Ride> {
    const endPosition = new Position(request.latitude, request.longitude);
    return this.rideService.finishRide(request.id, endPosition);
  }
}
