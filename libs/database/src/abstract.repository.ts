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
  constructor(databaseService: DatabaseService, modelName: string) {
    this.model = databaseService[modelName];
  }

  async find(filterQuery?: FilterQuery) {
    try {
      const result = await this.model.findMany(
        filterQuery ? { where: filterQuery.where } : {},
      );
      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Error while finding document.');
    }
  }

  async create<T>(data: T) {
    try {
      const result = await this.model.create({
        data,
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new InternalServerErrorException('Error while creating document.');
    }
  }

  // async findOne(filterQuery: FilterQuery): Promise<any> {
  //   try {
  //     // 모델 이름을 동적으로 사용
  //     const document = await this.model.findFirst({
  //       where: filterQuery.where,
  //     });

  //     // 조회된 데이터가 없을 경우 예외 처리
  //     if (!document) {
  //       throw new NotFoundException(
  //         `Document not found with filterQuery: ${JSON.stringify(filterQuery.where)}`,
  //       );
  //     }

  //     return document;
  //   } catch (error) {
  //     // database에서 발생한 에러 처리
  //     throw new InternalServerErrorException(
  //       error.message || 'Error while finding document.',
  //     );
  //   }
  // }

  //   async findOneAndUpdate(
  //     filterQuery: FilterQuery<TDocument>,
  //     update: UpdateQuery<TDocument>,
  //   ) {
  //     const document = await this.model.findOneAndUpdate(filterQuery, update, {
  //       lean: true,
  //       new: true,
  //     });

  //     if (!document) {
  //       this.logger.warn(`Document not found with filterQuery:`, filterQuery);
  //       throw new NotFoundException('Document not found.');
  //     }

  //     return document;
  //   }

  //   async upsert(
  //     filterQuery: FilterQuery<TDocument>,
  //     document: Partial<TDocument>,
  //   ) {
  //     return this.model.findOneAndUpdate(filterQuery, document, {
  //       lean: true,
  //       upsert: true,
  //       new: true,
  //     });
  //   }
}
