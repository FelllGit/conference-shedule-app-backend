import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { SheduledMeetsService } from './sheduled-meets.service';
import { CreateSheduledMeetDto } from './dto/create-sheduled-meet.dto';
import { UpdateSheduledMeetDto } from './dto/update-sheduled-meet.dto';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IsCreatorGuard } from '../guards/is-creator.guard';

@Controller('sheduled-meets')
export class SheduledMeetsController {
  constructor(private readonly sheduledMeetsService: SheduledMeetsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() createSheduledMeetDto: CreateSheduledMeetDto) {
    return this.sheduledMeetsService.create(createSheduledMeetDto);
  }

  @Get()
  findAll() {
    return this.sheduledMeetsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheduledMeetsService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, IsCreatorGuard)
  update(
    @Param('id', ParseIntPipe) id,
    @Body() updateSheduledMeetDto: UpdateSheduledMeetDto,
  ) {
    return this.sheduledMeetsService.update(id, updateSheduledMeetDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, IsCreatorGuard)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.sheduledMeetsService.remove(id);
  }
}
