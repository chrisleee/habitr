import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  // if (process.env.NODE_ENV === 'development') {
  app.use(
    cors({
      allowedHeaders: [
        'Authorization',
        'Content-Type',
        'Access-Control-Allow-Origin',
        'Accept',
      ],
      preflightContinue: false,
      methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'DELETE', 'POST'],
      optionsSuccessStatus: 204,
      origin: true,
    }),
  );
  // }

  const port = 8080;
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
