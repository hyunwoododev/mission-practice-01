import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { AbstractRepository } from '../abstract.repository';

@Injectable()
export class UserRepositoryService extends AbstractRepository {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'user'); //TODO: avoid hardcoding
  }
}
