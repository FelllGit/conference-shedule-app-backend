import { Test, TestingModule } from '@nestjs/testing';
import { SheduledMeetsController } from './sheduled-meets.controller';
import { SheduledMeetsService } from './sheduled-meets.service';

describe('SheduledMeetsController', () => {
  let controller: SheduledMeetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SheduledMeetsController],
      providers: [SheduledMeetsService],
    }).compile();

    controller = module.get<SheduledMeetsController>(SheduledMeetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
