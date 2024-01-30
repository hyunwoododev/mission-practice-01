import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class DatabaseService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  /**
   * DatabaseService constructor.
   * @param configService - Instance of ConfigService for accessing environment variables.
   */
  constructor(private readonly configService: ConfigService) {
    // Call the PrismaClient constructor with the provided database URL.
    super({
      datasources: {
        db: {
          url: configService.get('DATABASE_URL'),
        },
      },
    });
  }

  /**
   * Lifecycle hook: Called when the module is initialized.
   * Establishes a connection to the database.
   */
  async onModuleInit() {
    await this.$connect();
  }

  /**
   * Lifecycle hook: Called when the module is destroyed.
   * Closes the connection to the database.
   */
  async onModuleDestroy() {
    await this.$disconnect();
  }
}
