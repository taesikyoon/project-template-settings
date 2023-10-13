import { Controller, Get, Query } from '@nestjs/common';
import { Logger } from './winston/winston.provider';

@Controller('log')
export class AppController {
  @Get('info')
  useInfoLog(@Query('message') message: string): string {
    if (!message) message = 'Test Message';

    Logger.log(message);
    return 'Check the log file - Info Level';
  }
  @Get('error')
  useErrorLog(@Query('message') message: string): string {
    if (!message) message = 'Test Message';

    Logger.error(message);
    return 'Check the log file - Error Level';
  }

  @Get('warn')
  useWarnLog(@Query('message') message: string): string {
    if (!message) message = 'Test Message';

    Logger.warn(message);
    return 'Check the log file - Warn Level';
  }

  @Get('debug')
  useDebugLog(@Query('message') message: string): string {
    if (!message) message = 'Test Message';

    Logger.debug(message);
    return 'Check the log file - Debug Level';
  }

  @Get('verbose')
  useVerboseLog(@Query('message') message: string): string {
    if (!message) message = 'Test Message';

    Logger.verbose(message);
    return 'Check the log file - Verbose Level';
  }
}
