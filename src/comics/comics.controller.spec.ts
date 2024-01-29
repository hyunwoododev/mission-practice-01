import { Test, TestingModule } from '@nestjs/testing';
import { ComicsController } from './comics.controller';
import { ComicsService } from './comics.service';

describe('ComicsController', () => {
  let controller: ComicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComicsController],
      providers: [ComicsService],
    }).compile();

    controller = module.get<ComicsController>(ComicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
