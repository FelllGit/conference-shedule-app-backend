import { Test, TestingModule } from '@nestjs/testing';
import { SheduledMeetsService } from './sheduled-meets.service';

describe('SheduledMeetsService', () => {
  let service: SheduledMeetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SheduledMeetsService],
    }).compile();

    service = module.get<SheduledMeetsService>(SheduledMeetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
