import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class requestRideDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNumber()
  @IsNotEmpty()
  latitude: number;

  @IsNumber()
  @IsNotEmpty()
  longitude: number;
}
