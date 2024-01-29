import { Module } from '@nestjs/common';
import { ComicsService } from './comics.service';
import { ComicsController } from './comics.controller';

@Module({
  controllers: [ComicsController],
  providers: [ComicsService],
})
export class ComicsModule {}
