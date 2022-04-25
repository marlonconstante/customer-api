import {
  Controller,
  Body,
  Param,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { Customer } from './entities/customer.entity';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { FindCustomersDto } from './dto/find-customers.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@Controller('customers')
@ApiExtraModels(FindCustomersDto)
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @ApiCreatedResponse({
    description: 'Customer has been created successfully.',
    type: Customer,
  })
  @ApiUnprocessableEntityResponse({
    description: 'Customer with the email provided already exists.',
  })
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customersService.create(createCustomerDto);
  }

  @ApiOkResponse({
    description: 'Customers has been successfully fetched.',
    type: Customer,
    isArray: true,
  })
  @Get()
  findAll(@Query() findCustomersDto: FindCustomersDto) {
    return this.customersService.findAll(findCustomersDto);
  }

  @ApiOkResponse({
    description: 'Customer has been successfully fetched.',
    type: Customer,
  })
  @ApiNotFoundResponse({
    description: 'Customer with given id does not exist.',
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customersService.findOne(id);
  }

  @ApiOkResponse({
    description: 'Customer has been successfully updated.',
    type: Customer,
  })
  @ApiNotFoundResponse({
    description: 'Customer with given id does not exist.',
  })
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customersService.update(id, updateCustomerDto);
  }

  @ApiNoContentResponse({
    description: 'Customer has been successfully removed.',
  })
  @ApiNotFoundResponse({
    description: 'Customer with given id does not exist.',
  })
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.customersService.remove(id);
  }
}
