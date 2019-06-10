import {Entity, PrimaryColumn} from 'typeorm';

// TODO: Find out why this cant be role.entity.ts

@Entity()
export class RoleEntity {
  @PrimaryColumn({nullable: false})
  name: string;
}
