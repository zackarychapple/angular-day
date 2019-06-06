import {Body, Catch, Controller, Get, HttpException, HttpStatus, Param, Post, Res} from '@nestjs/common';
import {Response} from 'express';
import * as fs from "fs";
import * as path from "path";
import * as https from 'https';
import {CatDto} from './cat.dto';
import {CatsService} from './cats.service';
import {BreedSearchDto} from './breed_search.dto';

@Catch()
@Controller('cats')
export class CatsController {
  allBreeds: Array<any>;

  constructor(private catsService: CatsService) {
    this.allBreeds = []
  }

  @Get('/')
  async getAllBreeds(@Res() res: Response) {
    if (this.allBreeds.length === 0) {
      // Originally from https://api.thecatapi.com/v1/breeds
      const catsRaw = await fs.readFileSync(path.resolve(process.cwd(), `apps/api/src/cats/cats.json`));
      const catsJson = JSON.parse(catsRaw.toString());
      this.allBreeds = catsJson;
      res.json(catsJson)
    } else {
      res.send(this.allBreeds)
    }
  }

  @Post('/')
  async saveCat(@Body() catDto: CatDto) {
    const saveResult = await this.catsService.saveCatByOwner(catDto);
    if (saveResult) {
      return {message: 'Cat Saved Successfully'}
    } else {
      throw new HttpException({error: 'We could not save your cat'}, HttpStatus.BAD_REQUEST)
    }
  }

  @Get('/:breedID')
  getBreed(@Param('breedID') breedID: string, @Res() res: Response) {
    const breedQuery =
      `https://api.thecatapi.com/v1/images/search?limit=9&mime_types=&order=Random&size=small&page=0&breed_ids=${breedID}&sub_id=demo-a44f13`;

    https.get(breedQuery, (response: any) => {

        let json = '';
        response.on('data', function (chunk) {
          json += chunk;
        });
        response.on('end', function () {
          if (res.statusCode === 200) {
            try {
              const data: Array<BreedSearchDto> = JSON.parse(json);
              res.status(HttpStatus.OK);
              res.json(data);
            } catch (e) {
              res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({error: 'Error Parsing Cats'});
            }
          } else {
            res.status(HttpStatus.NOT_FOUND).json({error: 'Breed Not Found'});
          }
        });
      }
    );
  }
}
