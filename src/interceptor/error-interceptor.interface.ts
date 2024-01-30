import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  /**
   * Intercepts the execution context and call handler, applying error handling.
   * @param context - The execution context.
   * @param next - The call handler for the next middleware or controller.
   * @returns An observable or promise of an observable with error handling applied.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((err) =>
        // Convert the error into a BadRequestException and re-throw it.
        throwError(() => new BadRequestException(err.message)),
      ),
    );
  }
}
