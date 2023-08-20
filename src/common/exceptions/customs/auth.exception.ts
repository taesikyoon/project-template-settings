import { HttpStatus } from '@nestjs/common';
import { BaseException } from '../base.exception';

const AuthExceptionCodeEnum = {
  EmailNotFound: { message: 'Email not found', code: '0001' },
  NotAuthenticated: { message: 'Not authenticated', code: '0002' },
  EmailExists: { message: 'Email already exists', code: '0003' },
  JwtInvalidToken: { message: 'Invalid JWT token', code: '0004' },
  JwtUserNotFound: { message: 'User not found in JWT', code: '0005' },
  JwtExpired: { message: 'JWT token expired', code: '0006' },
  JwtInvalidSignature: { message: 'Invalid JWT signature', code: '0007' },
  UserNotFound: { message: 'User not found', code: '0008' },
} as const;

export class UserNotFoundException extends BaseException {
  constructor() {
    super(AuthExceptionCodeEnum.UserNotFound.code, AuthExceptionCodeEnum.UserNotFound.message, HttpStatus.NOT_FOUND);
  }
}
