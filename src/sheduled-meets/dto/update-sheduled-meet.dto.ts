import { PartialType } from '@nestjs/mapped-types';
import { CreateSheduledMeetDto } from './create-sheduled-meet.dto';
import { IsOptional, IsString, IsDateString, IsArray } from 'class-validator';

export class UpdateSheduledMeetDto extends PartialType(CreateSheduledMeetDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  sheduledDate?: string;

  @IsOptional()
  @IsArray()
  userIds?: number[];
}
