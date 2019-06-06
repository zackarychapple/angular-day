import {Injectable} from '@nestjs/common';
import {CatDto} from './cat.dto';
import {CatEntity} from './cat.entity';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';

@Injectable()
export class CatsService {
  constructor(@InjectRepository(CatEntity)
              private readonly catEntity: Repository<CatEntity>) {

  }

  async saveCatByOwner(catdto: CatDto): Promise<CatDto> {
    // TODO: make sure this is cleaned up
    const entity = new CatEntity();
    Object.assign(entity, catdto);
    return await this.catEntity.save(entity);
  }
}
