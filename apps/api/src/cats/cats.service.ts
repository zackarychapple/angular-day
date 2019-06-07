import {Injectable} from '@nestjs/common';
import {CatDto} from './cat.dto';
import {CatEntity} from './cat.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as fs from "fs";
import * as path from "path";
import {BreedDto} from './breed.dto';
import * as https from "https";
import {Response} from 'express';
import {BreedSearchDto} from './breed_search.dto';

@Injectable()
export class CatsService {
  allBreeds: Array<BreedDto>;

  constructor(@InjectRepository(CatEntity)
              private readonly catEntity: Repository<CatEntity>) {
    this.allBreeds = []
  }

  async getAllBreeds(): Promise<Array<BreedDto>> {
    if (this.allBreeds.length === 0) {
      // Originally from https://api.thecatapi.com/v1/breeds
      const catsRaw = await fs.readFileSync(path.resolve(process.cwd(), `apps/api/src/cats/cats.json`));
      const catsJson = JSON.parse(catsRaw.toString());
      this.allBreeds = catsJson;
      return catsJson
    } else {
      return this.allBreeds
    }
  }

  // TODO: Add Redis Cache and Memory cache of the responses from the breeds
  // TODO: I dont like that I have to pass in the response
  async getCatsByBreed(breedID: string, res: Response) {
    const breedQuery =
      `https://api.thecatapi.com/v1/images/search?limit=9&mime_types=&order=Random&size=small&page=0&breed_ids=${breedID}&sub_id=demo-a44f13`;
    https.get(breedQuery, (response: any) => {

        let json = '';
        response.on('data', function (chunk) {
          json += chunk;
        });
        response.on('end', function () {
          // TODO: Add this handling back
          // if (response.statusCode === 200) {
          try {
            const data: Array<BreedSearchDto> = JSON.parse(json);
            res.json(data);
          } catch (e) {
            debugger
            //   TODO: This crashes the server
            // throw new HttpException({error: 'Error Parsing Cats'}, HttpStatus.INTERNAL_SERVER_ERROR)
            // }
            // } else {
            //   throw new HttpException({error: 'Breed Not Found'}, HttpStatus.NOT_FOUND)
          }
        });
      }
    );
  }

  async getCatsByOwner(onwerName: string): Promise<any> {
    return await this.catEntity.find({where: {owner: onwerName}})
  }

  async saveCatByOwner(catdto: CatDto): Promise<CatDto> {
    // TODO: make sure this is cleaned up
    const entity = new CatEntity();
    Object.assign(entity, catdto);
    return await this.catEntity.save(entity);
  }
}
