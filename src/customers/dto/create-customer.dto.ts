import { Type } from 'class-transformer';
import { IsString, IsEmail, IsDate, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsDate()
  @Type(() => Date)
  birthDate: Date;
}
