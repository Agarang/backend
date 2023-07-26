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

    this.$extends({
      query: {
        $allModels: {
          async create({ model, operation, args, query }) {
            if (args.data.createdAt) {
              args.data.createdAt = new Date().toISOString();
            }

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
