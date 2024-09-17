import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { omit } from 'lodash';
import { User } from '../users/entities/user.entity';
import { ErrorCode } from '../utils/error';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    pass: string,
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email });
    if (user && !(await bcrypt.compare(pass, user.password))) {
      throw new NotFoundException({
        message: 'User not found',
        code: ErrorCode.USER_NOT_FOUND,
      });
    }
    if (user && (await bcrypt.compare(pass, user.password))) {
      return omit(user, ['password']);
    }
    return null;
  }

  async login(user: Omit<User, 'password'>) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
