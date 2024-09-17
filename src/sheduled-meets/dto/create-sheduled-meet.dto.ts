import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateSheduledMeetDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  creator_user: number;

  @IsDateString(
    {},
    { message: 'sheduledDate must be a valid ISO 8601 date string' },
  )
  sheduledDate: string;

  @IsNotEmpty()
  @IsNumber({}, { each: true })
  userIds: number[];
}
