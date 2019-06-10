import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import {JwtModule} from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import {JwtStrategy} from './jwt.strategy';
import {AuthController} from './auth.controller';
import {UsersModule} from '../users/users.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'secretKey',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [PassportModule, AuthService],
})
export class AuthModule {}
