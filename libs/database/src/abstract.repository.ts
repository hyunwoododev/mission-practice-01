import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';

import { DatabaseService } from './database.service';

export interface FilterQuery {
  where: Record<string, any>;
}

@Injectable()
export abstract class AbstractRepository {
  protected model: any;

  /**
   * Constructor for AbstractRepository.
   * @param databaseService - Instance of DatabaseService providing PrismaClient.
   * @param modelName - Name of the Prisma model associated with the repository.
   */
  constructor(databaseService: DatabaseService, modelName: string) {
    this.model = databaseService[modelName];
  }

  /**
   * Find multiple records based on optional filter criteria.
   * @param filterQuery - Optional filter criteria.
   * @returns A list of records matching the filter criteria.
   * @throws InternalServerErrorException if an error occurs during the operation.
   */
  async find(filterQuery?: FilterQuery) {
    try {
      const result = await this.model.findMany(
        filterQuery ? { where: filterQuery.where } : {},
      );
      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Error while finding documents.');
    }
  }

  /**
   * Create a new record.
   * @param data - Data to be inserted for the new record.
   * @returns The created record.
   * @throws InternalServerErrorException if an error occurs during the operation.
   */
  async create<T>(data: T) {
    try {
      const result = await this.model.create({
        data,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException(
        'Error while creating a document.',
      );
    }
  }

  /**
   * Find a single record based on filter criteria.
   * @param filterQuery - Filter criteria to find the record.
   * @returns The found record.
   * @throws NotFoundException if the record is not found.
   * @throws InternalServerErrorException if an error occurs during the operation.
   */
  async findOne(filterQuery: FilterQuery): Promise<any> {
    try {
      const result = await this.model.findFirst({
        where: filterQuery.where,
      });

      if (!result) {
        throw new NotFoundException(
          `Record not found with filterQuery: ${JSON.stringify(filterQuery.where)}`,
        );
      }

      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Error while finding a document.');
    }
  }
}
