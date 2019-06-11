import {Column, Entity, JoinTable, ManyToMany, PrimaryColumn} from 'typeorm';
import {RoleEntity} from './Role.entity';

// TODO: Find out why this cant be users.entity.ts

@Entity()
export class UsersEntity {
  @PrimaryColumn()
  username: string;

  @ManyToMany(type => RoleEntity, role => role.name, {cascade: ["update"]})
  @JoinTable()
  roles: Array<RoleEntity>;

  @Column({nullable: false, default: ''})
  password: string;

  @Column({nullable: false, default: 'self'})
  identityProvider: string;
}
