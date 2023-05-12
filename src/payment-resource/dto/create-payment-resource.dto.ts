import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreatePaymentSourceDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  cardToken: string;
}
