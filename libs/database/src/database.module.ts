import { Module } from '@nestjs/common';
import { DatabaseService } from './database.service';
import { ConfigModule } from '@nestjs/config';
import { UserRepositoryService } from './users.repository/users.repository';

@Module({
  imports: [ConfigModule],
  providers: [DatabaseService, UserRepositoryService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
