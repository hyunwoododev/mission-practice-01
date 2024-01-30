import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class UserRepositoryService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllUsers() {
    return this.databaseService.user.findMany();
  }

  async createUser(data: CreateUserDto) {
    return this.databaseService.user.create({
      data,
    });
  }
}
