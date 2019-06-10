import {IsNotEmpty} from 'class-validator';
import {Expose} from 'class-transformer';

export class CatDto {
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  owner: string;

  @Expose({groups: ['admin']})
  hideout: string;

  constructor(partial: Partial<CatDto>) {
    Object.assign(this, partial);
  }
}
