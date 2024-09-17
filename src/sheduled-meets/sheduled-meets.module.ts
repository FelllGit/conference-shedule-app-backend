import { Module } from '@nestjs/common';
import { SheduledMeetsService } from './sheduled-meets.service';
import { SheduledMeetsController } from './sheduled-meets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheduledMeet } from './entities/sheduled-meet.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SheduledMeet, User])],
  controllers: [SheduledMeetsController],
  providers: [SheduledMeetsService],
})
export class SheduledMeetsModule {}
