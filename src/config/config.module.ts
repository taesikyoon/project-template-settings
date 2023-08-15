import { Module } from '@nestjs/common';
import { ConfigModule as CM, ConfigService } from '@nestjs/config';
import configuration from './configuration';
// import configuration from './configuration';

@Module({
  imports: [
    CM.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class ConfigModule {}
