import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { Min, Max, IsInt } from 'class-validator';
import { CreateCustomerDto } from './create-customer.dto';

export class FindCustomersDto extends PartialType(CreateCustomerDto) {
  @ApiProperty({
    type: Number,
    required: false,
  })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  page = 1;

  @ApiProperty({
    type: Number,
    required: false,
  })
  @Min(1)
  @Max(100)
  @IsInt()
  @Type(() => Number)
  size = 10;
}
