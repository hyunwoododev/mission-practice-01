import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  /**
   * Intercepts the execution context and call handler, applying logging.
   * @param context - The execution context.
   * @param next - The call handler for the next middleware or controller.
   * @returns An observable or promise of an observable with logging applied.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    // Log a message before the handler is executed.
    console.log('Before log...');

    // Record the current timestamp for measuring execution time.
    const now = Date.now();

    // Log the URL of the incoming request.
    console.log(context.switchToHttp().getRequest().url);

    // Continue the execution and log a message after the handler is executed.
    return next
      .handle()
      .pipe(tap(() => console.log(`After log... ${Date.now() - now} ms`)));
  }
}
