import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base.exception';

const UnexpectedExceptionCodeEnum = {
  Unexpected: { message: 'Unexpected Error', code: '9999' },
} as const;

export class UnexpectedException extends BaseException {
  constructor() {
    super(
      UnexpectedExceptionCodeEnum.Unexpected.code,
      UnexpectedExceptionCodeEnum.Unexpected.message,
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
