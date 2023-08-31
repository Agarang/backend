import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query'],
    });
  }

  async onModuleInit() {
    await this.$connect();
    await this.$extends({
      query: {
        user: {
          async findMany({ model, operation, args, query }) {
            args = {
              where: {
                deletedAt: null,
              },
              ...args,
            };
            return query(args);
          },
          async findFirst({ model, operation, args, query }) {
            args = {
              where: {
                deletedAt: null,
              },
              ...args,
            };
            return query(args);
          },
        },
      },
    });
  }

  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      await app.close();
    });
  }
}
