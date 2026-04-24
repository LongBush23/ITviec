import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import aqp from 'api-query-params';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const created = await this.userModel.create(createUserDto);
    return this.userModel.findById(created._id).select('-password').lean();
  }

  async findAll(currentPage: number, pageSize: number, queryString: string) {
    const { filter, sort } = aqp(queryString);
    delete filter.current;
    delete filter.pageSize;

    const skip = (currentPage - 1) * pageSize;
    const total = await this.userModel.countDocuments(filter);

    const result = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(pageSize)
      .sort(sort as any)
      .select('-password')
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
    const user = await this.userModel.findById(id).select('-password').lean();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async findByEmail(email: string) {
    return this.userModel.findOne({ email }).lean();
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .select('-password')
      .lean();
    if (!user) throw new NotFoundException(`User with id ${id} not found`);
    return user;
  }

  async remove(id: string) {
    return this.userModel.softDelete({ _id: id });
  }
}
