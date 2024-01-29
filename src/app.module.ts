import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@app/database';
import { ComicsModule } from './comics/comics.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [DatabaseModule, ComicsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
