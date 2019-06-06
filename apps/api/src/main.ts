/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import * as compression from 'compression';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  /*
  This is for adding compression to our application responses
  */
  app.use(compression());

  /*
  This is for using the type validation via the DTO's
  */
  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
