import {Body, Controller, HttpStatus, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from '../users/login.dto';
import {RequestWithSession} from '../common/RequestWithSession';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Req() req: RequestWithSession) {
    const token = await this.authService.signIn(loginDto);
    if (token === this.authService.NOT_AUTHORIZED) {
      return HttpStatus.UNAUTHORIZED
    } else {
      req.session.token = token;
      return token;
    }
  }
}
