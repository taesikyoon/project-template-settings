import { Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from './user/user.module';
import { LoggingInterceptor } from '@common/interceptor/logger.interceptor';
import { APP_INTERCEPTOR } from '@nestjs/core';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule],
  controllers: [AppController],
  providers: [AppService, Logger, { provide: APP_INTERCEPTOR, useClass: LoggingInterceptor }],
})
export class AppModule {}
