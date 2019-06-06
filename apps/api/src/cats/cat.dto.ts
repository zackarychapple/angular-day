import {IsNotEmpty} from 'class-validator';

export class CatDto {
  @IsNotEmpty()
  breed: string;

  @IsNotEmpty()
  owner: string;
}
