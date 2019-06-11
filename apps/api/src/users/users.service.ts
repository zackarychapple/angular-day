import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './user.dto';
import {RoleEntity} from './Role.entity';
import {UsersEntity} from './Users.entity';
import {CryptService} from '../crypt/crypt.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userEntity: Repository<UsersEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    private crypto: CryptService
  ) {

  }

  async createUser(userDto: CreateUserDto) {
    const userEntity = new UsersEntity();
    // TODO: Clean this up
    userEntity.username = userDto.username;
    userEntity.identityProvider = userDto.identityProvider;
    userEntity.password = await this.crypto.hashPassword(userDto.password);
    const userRoles: Array<RoleEntity> = [];
    userDto.roles.forEach((role) => {
      const re = new RoleEntity();
      re.name = role;
      userRoles.push(re);
    });

    userEntity.roles = userRoles;
    await this.userEntity.save(userEntity);
  }

  findByUsername(username: string) {
    return this.userEntity.findOne(username, {relations: ['roles']});
  }

  async addRole(role: string) {
    const newRole = new RoleEntity();
    newRole.name = role;
    await this.roleEntity.save(newRole)
  }
}
