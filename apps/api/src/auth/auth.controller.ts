import {Body, Controller, HttpStatus, Logger, Post, Req, Res} from '@nestjs/common';
import {AuthService} from './auth.service';
import {LoginDto} from '../users/login.dto';
import {RequestWithSession} from '../common/RequestWithSession';
import {UsersService} from '../users/users.service';
import {CreateUserDto} from '../users/user.dto';
import {Response} from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService, private userService: UsersService) {
  }

  @Post('/login')
  async login(@Body() loginDto: LoginDto, @Req() req: RequestWithSession, @Res() res: Response) {
    const token = await this.authService.signIn(loginDto);
    if (token === this.authService.NOT_AUTHORIZED) {
      res.status(HttpStatus.UNAUTHORIZED);
    } else if (token === this.authService.USE_IDENTITY_PROVIDER) {
      // TODO: Make the UI handle this gracefully
      res.status(HttpStatus.CONFLICT);
    } else {
      req.session.token = token;
      res.status(HttpStatus.OK);
      res.send({token: token, username: loginDto.username});
    }
  }

  @Post('/thirdPartyLogin')
  async thirdPartyLogin(@Body() identity: any, @Req() req: RequestWithSession) {
    // TODO: handle the error case where its not validated
    Logger.log('here');
    const payload = await this.authService.verifyWithGoogle(identity.credential.oauthIdToken);

    req.session.token = identity.credential.oauthIdToken;
    const user = await this.userService.findByUsername(payload.email);
    if (typeof user === 'undefined') {
      const generatedUser = new CreateUserDto();
      generatedUser.username = payload.email;
      generatedUser.roles = ['user'];
      generatedUser.password = '';
      generatedUser.identityProvider = payload.iss;
      await this.userService.createUser(generatedUser);
      return identity.credential.oauthIdToken;
    }
    return identity.credential.oauthIdToken;
  }
}
