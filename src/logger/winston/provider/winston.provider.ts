import { LoggerOptions } from './winston.config';

class WinstonLogger {
  private readonly logger;
  private static instance: WinstonLogger;

  constructor() {
    this.logger = LoggerOptions;
  }

  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
    }
    return WinstonLogger.instance;
  }

  log(message: string, context?: any) {
    this.logger.info({ message, context });
  }

  error(message: string, context?: any, stack?: any) {
    this.logger.error({ message, context, stack });
  }

  warn(message: string, context?: any) {
    this.logger.warn({ message, context });
  }

  debug(message: string, context?: any) {
    this.logger.debug({ message, context });
  }

  verbose(message: string, context?: any) {
    this.logger.trace({ message, context });
  }
}

export const Logger = WinstonLogger.getInstance();
