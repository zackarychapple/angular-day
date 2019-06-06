import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class CatEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({length: 500})
  owner: string;

  @Column()
  breed: string;

  @Column({nullable:true})
  hideout: string;
}
