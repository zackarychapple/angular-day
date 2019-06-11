import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UsersService} from '../users/users.service';
import {LoginDto} from '../users/login.dto';
import {CryptService} from '../crypt/crypt.service';
import {OAuth2Client} from 'google-auth-library';

// TODO: document this is from here: https://console.developers.google.com/apis/credentials/oauthclient/779520957016-ekh0npk6kg91rf1n46og448m8a5vqjro.apps.googleusercontent.com?project=angular-day&folder&organizationId
const client = new OAuth2Client('779520957016-ekh0npk6kg91rf1n46og448m8a5vqjro.apps.googleusercontent.com');

@Injectable()
export class AuthService {
  NOT_AUTHORIZED = 'Not an authorized user';
  USE_IDENTITY_PROVIDER = 'Use third party identity provider';

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private crypt: CryptService
  ) {
  }

  async verifyWithGoogle(token) {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: '779520957016-ekh0npk6kg91rf1n46og448m8a5vqjro.apps.googleusercontent.com'
    });
    return ticket.getPayload();
  }

  async signIn(loginDto: LoginDto): Promise<string> {
    const user: JwtPayload = {username: loginDto.username, password: loginDto.password};
    const validUser = await this.validateUser(user);
    if (validUser === this.USE_IDENTITY_PROVIDER) {
      return this.USE_IDENTITY_PROVIDER
    } else if (validUser) {
      return this.jwtService.sign(user);
    } else {
      return this.NOT_AUTHORIZED
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const fetchedUser = await this.usersService.findByUsername(payload.username);
    if (fetchedUser.identityProvider !== 'self') {
      return this.USE_IDENTITY_PROVIDER;
    }
    if (typeof fetchedUser === 'undefined') {
      return false;
    } else {
      return await this.crypt.validateHash(payload.password, fetchedUser.password);
    }
  }
}
