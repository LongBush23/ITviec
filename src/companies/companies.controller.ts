import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import { Request as ExpressRequest } from 'express';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { AuthUser } from '../auth/auth.service';

interface RequestWithUser extends ExpressRequest {
  user: AuthUser;
}

@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  create(
    @Body() createCompanyDto: CreateCompanyDto,
    @Request() req: RequestWithUser,
  ) {
    return this.companiesService.create(createCompanyDto, req.user);
  }

  @Get()
  findAll(
    @Query('current') current: string,
    @Query('pageSize') pageSize: string,
    @Query() query: Record<string, string>,
  ) {
    const currentPage = +current || 1;
    const size = +pageSize || 10;
    const queryString = new URLSearchParams(query).toString();
    return this.companiesService.findAll(currentPage, size, queryString);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.companiesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
    @Request() req: RequestWithUser,
  ) {
    return this.companiesService.update(id, updateCompanyDto, req.user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @Request() req: RequestWithUser) {
    return this.companiesService.remove(id, req.user);
  }
}
