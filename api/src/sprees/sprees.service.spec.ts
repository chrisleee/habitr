import { Test, TestingModule } from '@nestjs/testing';
import { SpreesService } from './sprees.service';

describe('SpreesService', () => {
  let service: SpreesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpreesService],
    }).compile();

    service = module.get<SpreesService>(SpreesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
