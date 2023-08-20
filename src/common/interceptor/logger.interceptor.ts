import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '../../lib/winston/winston.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    const now = Date.now();
    let timestamp = Date().toString();
    Logger.log(`request : ${method} ${url} ${timestamp}`);
    return next.handle().pipe(
      tap(() => {
        const responseTime = Date.now() - now;
        timestamp = Date().toString();
        Logger.log(`response : ${method} ${url} ${timestamp} ${responseTime}ms`);
      }),
    );
  }
}
