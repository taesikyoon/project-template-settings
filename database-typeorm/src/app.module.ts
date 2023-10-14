import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EnvironmentModule } from './environment/environment.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [EnvironmentModule, DatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
