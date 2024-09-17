import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'User name' })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  name: string;

  @ApiProperty({ description: 'User password' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @MaxLength(20)
  password: string;
}
