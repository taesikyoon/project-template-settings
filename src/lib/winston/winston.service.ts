import { createLogger, format, transports } from 'winston';

const { combine, timestamp, prettyPrint } = format;

class WinstonLogger {
  private readonly logger;
  private static instance: WinstonLogger;

  constructor() {
    this.logger = createLogger({
      format: combine(timestamp(), prettyPrint()),
      transports: [new transports.File({ filename: 'logger.log' })],
    });
  }

  static getInstance(): WinstonLogger {
    if (!WinstonLogger.instance) {
      WinstonLogger.instance = new WinstonLogger();
    }
    return WinstonLogger.instance;
  }

  log(message: string) {
    this.logger.info(message);
  }

  error(message: string, context?: any, stack?: any) {
    this.logger.error({ message, context, stack });
  }

  warn(message: string) {
    this.logger.warn(message);
  }

  debug(message: string) {
    this.logger.debug(message);
  }
}

export const Logger = WinstonLogger.getInstance();
