import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database.service';
import { AbstractRepository } from '../abstract.repository';

@Injectable()
export class ComicRepository extends AbstractRepository {
  constructor(private readonly databaseService: DatabaseService) {
    super(databaseService, 'comics'); //TODO: avoid hardcoding
  }
}
