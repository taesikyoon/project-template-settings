import { Module } from '@nestjs/common';
import { LoggingInterceptor } from './interceptor/winston-logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  controllers: [],
  providers: [{ provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class WinstonLoggingModule {}
