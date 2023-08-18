import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { HttpExceptionFilter } from '@common/filters/httpException.filter';
import { AppConfig } from '@config/configurations/app';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const appConfig: AppConfig = configService.get('APP');

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // app.enableVersioning({
  //   type: VersioningType.URI,
  //   prefix: 'api',
  // });

  await app.listen(appConfig.APP_PORT);
}
bootstrap();
