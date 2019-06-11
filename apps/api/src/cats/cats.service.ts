import {Injectable, Logger} from '@nestjs/common';
import {CatDto} from './cat.dto';
import {CatEntity} from './cat.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import * as fs from "fs";
import * as path from "path";
import {BreedDto} from './breed.dto';
import {request, transport} from 'popsicle';
import {CacheService} from '../cache/cache.service';
import {CommandBus} from '@nestjs/cqrs';
import {AcquiredCatCommand} from './acquired-cat.command';
import {CircuitBreakerProtected} from 'nest-circuitbreaker';

@Injectable()
export class CatsService {
  allBreeds: Array<BreedDto>;

  constructor(@InjectRepository(CatEntity)
              private readonly catEntity: Repository<CatEntity>,
              private readonly commandBus: CommandBus,
              private cache: CacheService) {
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

  async getCatsByBreed(breedID: string) {
    const cachedEntry = await this.cache.getLocalWithFallback(breedID);
    if (cachedEntry === this.cache.NOT_CACHED) {
      const breedQuery =
        `https://api.thecatapi.com/v1/images/search?limit=9&mime_types=&order=Random&size=small&page=0&breed_ids=${breedID}&sub_id=demo-a44f13`;
      const res = await transport()(request(breedQuery));
      // TODO: We need to add proper handling here https://github.com/serviejs/popsicle/blob/791c68b0a340a040d3380339b60ac5f9755e0e78/src/node.spec.ts#L27
      const breedData = await res.body.json();
      await this.cache.setLocalWithFallback(breedID, breedData);
      return breedData;
    } else {
      return cachedEntry
    }
  }

  // TODO: We need to update the circuit breaker to not require manual install of hysterixjs and rxjs-compat
  @CircuitBreakerProtected({
    timeout: 100,
    fallbackTo: this.failCat
  })
  async getCatsByOwner(onwerName: string): Promise<any> {
    return await this.catEntity.find({where: {owner: onwerName}})
  }

  async failCat(ownerName: string){
    Logger.log(ownerName);
    return ownerName;
  }

  async deleteCatsById(cats: Array<number>): Promise<any> {
    return await this.catEntity.delete(cats);
  }

  async saveCatByOwner(catdto: CatDto): Promise<CatDto> {
    // TODO: make sure this is cleaned up
    // TODO: Add a time based cache here with an automatic bust on new
    const entity = new CatEntity();
    Object.assign(entity, catdto);
    await this.commandBus.execute(
      new AcquiredCatCommand(catdto)
    );
    return await this.catEntity.save(entity);
  }
}
