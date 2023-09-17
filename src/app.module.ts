import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@config/config.module';
import { DatabaseModule } from '@database/database.module';
import { UserModule } from './user/user.module';
import { WinstonLoggingModule } from '@logger/winston/winston.test.module';

@Module({
  imports: [ConfigModule, DatabaseModule, UserModule, WinstonLoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
