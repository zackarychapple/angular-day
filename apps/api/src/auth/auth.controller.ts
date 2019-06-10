import {Body, Controller, Post, Req} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from '../users/login.dto';
import {RequestWithSession} from '../common/RequestWithSession';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {
  }

  @Post('/login')
  login(@Body() loginDto: LoginDto, @Req() req: RequestWithSession) {
    const token = this.authService.signIn(loginDto);
    req.session.token = token;
    return token;
  }
}
