import {BreedDto} from './breed.dto';

export class BreedSearchDto {
  breeds: Array<BreedDto>;
  id: string;
  url: string;
  width: number;
  height: number;
}
