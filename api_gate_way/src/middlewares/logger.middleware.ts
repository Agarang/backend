import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request & { now: number }, res: Response, next: NextFunction) {
    req.now = Date.now();
    next();
  }
}
