import {Catch, Controller, Get, Param} from '@nestjs/common';
import {CatsService} from '../cats/cats.service';
import {CatDto} from '../cats/cat.dto';
import {plainToClass} from 'class-transformer';

@Catch()
@Controller('owner')
export class OwnersController {

  constructor(private catsService: CatsService) {
  }

  @Get('/:ownerName')
  async getCats(@Param('ownerName') ownerName: string) {
    // TODO: make sure this is cleaned up
    const returnedCats = [];
    const fetchedCats: Array<CatDto> = await this.catsService.getCatsByOwner(ownerName);
    fetchedCats.forEach((cat: CatDto) => {
      const newCat = plainToClass(CatDto, cat);
      returnedCats.push(newCat);
    });
    return returnedCats;
  }
}
