// winston.provider.ts
import { Logger } from './winston.provider';

describe('WinstonLogger', () => {
  let winstonLogger;

  beforeEach(() => {
    winstonLogger = Logger;
  });

  it('should log information', () => {
    const spy = jest.spyOn(winstonLogger.logger, 'info');

    winstonLogger.log('Test log message', { context: 'Test context' });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test log message',
        context: { context: 'Test context' },
      }),
    );
  });

  it('should log error', () => {
    const spy = jest.spyOn(winstonLogger.logger, 'error');

    winstonLogger.error(
      'Test error message',
      { context: 'Test context' },
      { stack: 'Test stack' },
    );

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test error message',
        context: { context: 'Test context' },
        stack: { stack: 'Test stack' },
      }),
    );
  });

  it('should log warning', () => {
    const spy = jest.spyOn(winstonLogger.logger, 'warn');

    winstonLogger.warn('Test warn message', { context: 'Test context' });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test warn message',
        context: { context: 'Test context' },
      }),
    );
  });

  it('should log debug', () => {
    const spy = jest.spyOn(winstonLogger.logger, 'debug');

    winstonLogger.debug('Test debug message', { context: 'Test context' });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test debug message',
        context: { context: 'Test context' },
      }),
    );
  });

  it('should log verbose', () => {
    const spy = jest.spyOn(winstonLogger.logger, 'trace');

    winstonLogger.verbose('Test verbose message', { context: 'Test context' });

    expect(spy).toHaveBeenCalledWith(
      expect.objectContaining({
        message: 'Test verbose message',
        context: { context: 'Test context' },
      }),
    );
  });
});
