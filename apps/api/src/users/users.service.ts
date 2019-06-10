import {Injectable} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {CreateUserDto} from './user.dto';
import {RoleEntity} from './Role.entity';
import {UsersEntity} from './Users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userEntity: Repository<UsersEntity>,
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>
  ) {

  }

  async createUser(userDto: CreateUserDto) {
    const userEntity = new UsersEntity();
    userEntity.username = userDto.username;

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
