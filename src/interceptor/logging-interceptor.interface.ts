import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before log...');
    const now = Date.now();
    console.log(context.switchToHttp().getRequest().url);
    return next
      .handle()
      .pipe(tap(() => console.log(`After log... ${Date.now() - now} ms`)));
  }
}
