import {JwtService} from '@nestjs/jwt';
import {Injectable} from '@nestjs/common';
import {JwtPayload} from './interfaces/jwt-payload.interface';
import {UsersService} from '../users/users.service';
import {LoginDto} from '../users/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {
  }

  async signIn(loginDto: LoginDto): Promise<string> {
    const user: JwtPayload = {username: loginDto.username};
    return this.jwtService.sign(user);
  }

  // This is used to validate the user exists in the database
  async validateUser(payload: JwtPayload): Promise<any> {
    return await this.usersService.findByUsername(payload.username);
  }
}
