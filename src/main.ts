import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logging-interceptor.interface';
import { ResponseInterceptor } from './interceptor/response-interceptor.interface';
import { ErrorInterceptor } from './interceptor/error-interceptor.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ErrorInterceptor());
  await app.listen(3000);
}
bootstrap();
