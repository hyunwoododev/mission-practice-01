import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggingInterceptor } from './interceptor/logging-interceptor.interface';
import { ResponseInterceptor } from './interceptor/response-interceptor.interface';
import { ErrorInterceptor } from './interceptor/error-interceptor.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

// Bootstrap the Nest.js application
async function bootstrap() {
  // Create the Nest application instance
  const app = await NestFactory.create(AppModule);

  // Apply global interceptors for logging, response transformation, and error handling
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalInterceptors(new ErrorInterceptor());

  // Configure Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('mission API')
    .setDescription('Just for preparing the mission')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // Start listening on port 3000
  await app.listen(3000);
}

// Call the bootstrap function to start the application
bootstrap();