import { Module } from '@nestjs/common';
import { ConfigModule as CM } from '@nestjs/config';
import appConfig from '@config/configurations/app';
import databaseConfig from '@config/configurations/database';
@Module({
  imports: [
    CM.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [appConfig, databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}
