import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage, User } from '../decorator/customize';
import type { IUser } from '../users/users.interface';

@ApiTags('companies')
@ApiBearerAuth('token')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  // #54: POST /companies
  @Post()
  @ResponseMessage('Create a new company')
  create(@Body() createCompanyDto: CreateCompanyDto, @User() user: IUser) {
    return this.companiesService.create(createCompanyDto, user);
  }

  // #59: GET /companies?current=1&pageSize=10
  @Get()
  @ResponseMessage('Fetch list companies with paginate')
  findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query() queryString: Record<string, string>,
  ) {
    return this.companiesService.findAll(
      +current || 1,
      +pageSize || 10,
      new URLSearchParams(queryString).toString(),
    );
  }

  @Get(':id')
  @ResponseMessage('Fetch a company by id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  // #57: PATCH /companies/:id
  @Patch(':id')
  @ResponseMessage('Update a company')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @User() user: IUser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, user);
  }

  // #58: DELETE /companies/:id (soft delete)
  @Delete(':id')
  @ResponseMessage('Delete a company')
  remove(@Param('id') id: string, @User() user: IUser) {
    return this.companiesService.remove(id, user);
  }
}
