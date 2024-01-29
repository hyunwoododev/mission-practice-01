import { Module } from '@nestjs/common';
import { UserRepositoryService } from './user.repository.service';

@Module({
  providers: [UserRepositoryService],
  exports: [UserRepositoryService],
})
export class DatabaseModule {}
