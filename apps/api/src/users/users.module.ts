import {Module} from '@nestjs/common';
import {UsersService} from './users.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersController} from './users.controller';
import {UsersEntity} from './Users.entity';
import {RoleEntity} from './Role.entity';
import {CryptService} from '../crypt/crypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersEntity]),
    TypeOrmModule.forFeature([RoleEntity])
  ],
  controllers: [
    UsersController,
  ],
  providers: [
    UsersService, CryptService
  ],
  exports: [
    UsersService,
  ],
})
export class UsersModule {
}
