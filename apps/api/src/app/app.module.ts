import {Module} from '@nestjs/common';

import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from '../cats/cats.module';
import {TypeOrmModule} from '@nestjs/typeorm';
import {OwnersModule} from '../owners/owners.module';
import {HealthcheckModule} from '../healthcheck/healthcheck.module';
import {UsersModule} from '../users/users.module';
import {AuthModule} from '../auth/auth.module';

@Module({
  imports: [
    CatsModule,
    OwnersModule,
    HealthcheckModule,
    UsersModule,
    AuthModule,
    TypeOrmModule.forRoot({
      // These should be pulled from Env
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'angularday',
      entities: [__dirname + '../../**/*.entity{.ts,.js}'],
      synchronize: true,
    })
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
