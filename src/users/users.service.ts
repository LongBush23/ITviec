import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import type { SoftDeleteModel } from '../utils/soft-delete.plugin';

const SALT_ROUNDS = 10;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(
      createUserDto.password,
      SALT_ROUNDS,
    );
    const created = await this.userModel.create({
      ...createUserDto,
      password: hashedPassword,
    });
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
    const user = await this.userModel
      .findById(id)
      .select('-password -refreshToken')
      .lean();
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

  async updateRefreshToken(userId: string, refreshToken: string | null) {
    const hashed = refreshToken
      ? await bcrypt.hash(refreshToken, SALT_ROUNDS)
      : null;
    return this.userModel.findByIdAndUpdate(userId, { refreshToken: hashed });
  }

  async validateRefreshToken(
    userId: string,
    refreshToken: string,
  ): Promise<boolean> {
    const user = await this.userModel
      .findById(userId)
      .select('refreshToken')
      .lean();
    if (!user?.refreshToken) return false;
    return bcrypt.compare(refreshToken, user.refreshToken);
  }
}
