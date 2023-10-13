import appConfig from './values/app';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [appConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class EnvironmentModule {}
