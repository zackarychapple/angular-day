import {Body, Catch, Controller, Get, HttpException, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import {CatDto} from './cat.dto';
import {CatsService} from './cats.service';

@Catch()
@Controller('cats')
export class CatsController {

  constructor(private catsService: CatsService) {
  }

  @Get('/')
  async getAllBreeds() {
    return await this.catsService.getAllBreeds();
  }

  @Post('/')
  async saveCat(@Body() catDto: CatDto) {
    const saveResult = this.catsService.saveCatByOwner(catDto);
    if (saveResult) {
      return {message: 'Cat Saved Successfully'}
    } else {
      throw new HttpException({error: 'We could not save your cat'}, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('/:breedID')
  async getBreed(@Param('breedID') breedID: string, @Res() res: Response) {

    return await this.catsService.getCatsByBreed(breedID, res);
  }
}
