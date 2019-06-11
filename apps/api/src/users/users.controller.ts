import {Body, Catch, Controller, Get, HttpException, HttpStatus, Param, Post} from '@nestjs/common';
import {UsersService} from './users.service';
import {CreateUserDto} from './user.dto';
import {plainToClass} from 'class-transformer';

@Catch()
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {
  }

  @Get('/:username')
  async getUser(@Param('username')username: string) {
    const fetchedUser = await this.usersService.findByUsername(username);
    if (fetchedUser) {
      return plainToClass(CreateUserDto, fetchedUser);
    } else {
      throw new HttpException({error: 'User Not Found'}, HttpStatus.NOT_FOUND);
    }
  }

  // TODO: why does having CreateUserDto break this now?
  @Post('/')
  async create(@Body() userDto) {
    await this.usersService.createUser(userDto);
    return HttpStatus.OK;
  }

  @Post('/roles')
  async addRole(@Body() body:any){
    await this.usersService.addRole(body.role);
    return HttpStatus.OK;
  }
}
