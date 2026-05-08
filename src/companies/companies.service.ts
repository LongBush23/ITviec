import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import { Company, CompanyDocument } from './schemas/company.schema';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import type { SoftDeleteModel } from '../utils/soft-delete.plugin';
import type { IUser } from '../users/users.interface';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectModel(Company.name)
    private companyModel: SoftDeleteModel<CompanyDocument>,
  ) {}

  create(createCompanyDto: CreateCompanyDto, user: IUser) {
    return this.companyModel.create({
      ...createCompanyDto,
      createdBy: { _id: user._id, email: user.email },
    });
  }

  async findAll(currentPage: number, pageSize: number, queryString: string) {
    const { filter, sort } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;

    const skip = (currentPage - 1) * pageSize;
    const total = await this.companyModel.countDocuments(filter);

    const result = await this.companyModel
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(sort as any)
      .lean();

    return {
      meta: {
        current: currentPage,
        pageSize,
        pages: Math.ceil(total / pageSize),
        total,
      },
      result,
    };
  }

  async findOne(id: string) {
    const company = await this.companyModel.findById(id).lean();
    if (!company)
      throw new NotFoundException(`Company with id ${id} not found`);
    return company;
  }

  update(id: string, updateCompanyDto: UpdateCompanyDto, user: IUser) {
    return this.companyModel.findByIdAndUpdate(
      id,
      {
        ...updateCompanyDto,
        updatedBy: { _id: user._id, email: user.email },
      },
      { new: true },
    );
  }

  async remove(id: string, user: IUser) {
    await this.companyModel.findByIdAndUpdate(id, {
      deletedBy: { _id: user._id, email: user.email },
    });
    return this.companyModel.softDelete({ _id: id });
  }
}
