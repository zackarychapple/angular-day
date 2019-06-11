import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UsersService} from '../users/users.service';
import {LoginDto} from '../users/login.dto';
import {CryptService} from '../crypt/crypt.service';

@Injectable()
export class AuthService {
  NOT_AUTHORIZED = 'Not an authorized user';

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private crypt: CryptService
  ) {
  }

  async signIn(loginDto: LoginDto): Promise<string> {
    const user: JwtPayload = {username: loginDto.username, password: loginDto.password};
    const validUser = await this.validateUser(user);
    if(validUser){
      return this.jwtService.sign(user);
    } else {
      return this.NOT_AUTHORIZED
    }
  }

  async validateUser(payload: JwtPayload): Promise<any> {
    const fetchedUser = await this.usersService.findByUsername(payload.username);
    if(typeof fetchedUser === 'undefined'){
      return false;
    } else {
      return await this.crypt.validateHash(payload.password, fetchedUser.password);
    }
  }
}
