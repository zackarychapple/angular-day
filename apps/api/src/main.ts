/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 **/
import * as compression from 'compression';
import {NestFactory} from '@nestjs/core';

import {AppModule} from './app/app.module';
import {ValidationPipe} from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger';
import * as connectRedis from 'connect-redis';
import * as expressSession from 'express-session';

const sessionConfig: any = {
  secret: '12345',
  cookie: {maxAge: 2 * 60 * 60 * 1000},
  resave: false,
  saveUninitialized: true,
};
const redisStore = connectRedis(expressSession);

sessionConfig.store = new redisStore({
  host: 'localhost',
  port: 6379,
});

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

  /*
  This is for using a session
  */
  app.use(expressSession(sessionConfig));

  /*
  This is the setup for swagger documentation on our application
  */
  const options = new DocumentBuilder()
    .setTitle('nestjs ng china Example')
    .setDescription('Demonstrating that Swagger API documentation can be created from nestJS')
    .setVersion('1.0') // This should pull from package.json
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.port || 3333;
  await app.listen(port, () => {
    console.log('Listening at http://localhost:' + port + '/' + globalPrefix);
  });
}

bootstrap();
