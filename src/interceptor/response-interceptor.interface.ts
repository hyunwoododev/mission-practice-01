import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
  statusCode: number;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  /**
   * Intercepts the execution context and call handler, applying response formatting.
   * @param context - The execution context.
   * @param next - The call handler for the next middleware or controller.
   * @returns An observable or promise of an observable with response formatting applied.
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<Response<T>> | Promise<Observable<Response<T>>> {
    // Continue the execution and format the response.
    return next.handle().pipe(
      map((data) => {
        // Format the response by adding a statusCode property.
        return { data, statusCode: 200 };
      }),
    );
  }
}
