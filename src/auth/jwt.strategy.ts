import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from '../users/users.service';
import { omit } from 'lodash';
import { User } from '../users/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne({ email: payload.email });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    // Return the user without the password field
    return omit(user, ['password']);
  }
}
