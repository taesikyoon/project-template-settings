import databaseConfig from './values/database';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
      load: [databaseConfig],
    }),
  ],
  controllers: [],
  providers: [],
})
export class EnvironmentModule {}
