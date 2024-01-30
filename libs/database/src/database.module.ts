import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryService } from './user.repository/user.repository.service';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, UserRepositoryService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
