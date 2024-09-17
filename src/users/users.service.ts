import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ErrorCode } from '../utils/error';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...user } = createUserDto;

    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);

    try {
      return await this.userRepository.save({
        ...user,
        password: hash,
      });
    } catch (err) {
      if (err.code === '23505') {
        throw new ConflictException({
          message: 'User with this email is already exist',
          code: ErrorCode.USER_CREATE_FAILED_EMAIL,
        });
      } else {
        throw new InternalServerErrorException({
          message: 'Error saving',
          code: ErrorCode.USER_CREATE_FAILED,
        });
      }
    }
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findOne(criteria: { id?: number; email?: string }): Promise<User> {
    if (criteria.id) {
      return this.userRepository.findOne({ where: { id: criteria.id } });
    } else if (criteria.email) {
      return this.userRepository.findOne({ where: { email: criteria.email } });
    }
    throw new Error('Invalid criteria');
  }
}
