import { HttpException } from '@nestjs/common';
export abstract class IBaseException {
  errorCode: string;
  timestamp: string;
  statusCode: number;
  path: string;
  message: string;
}

export class BaseException extends HttpException implements IBaseException {
  constructor(errorCode: string, message: string, statusCode: number) {
    super({ errorCode, message }, statusCode);
    this.errorCode = errorCode;
    this.statusCode = statusCode;
    this.message = message;
  }

  errorCode: string;

  statusCode: number;

  timestamp: string;

  path: string;

  message: string;
}
