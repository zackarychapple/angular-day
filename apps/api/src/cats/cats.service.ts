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

  async saveCatByOwner(catdto: CatDto): Promise<boolean> {
    const saveResult = await this.catEntity.save(catdto);
    return true
  }
}
