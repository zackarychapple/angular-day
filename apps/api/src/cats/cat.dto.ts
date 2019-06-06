import {IsNotEmpty} from 'class-validator';
import {Exclude} from 'class-transformer';

export class CatDto {
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  owner: string;

  @Exclude()
  hideout: string;

  constructor(partial: Partial<CatDto>) {
    Object.assign(this, partial);
  }
}
