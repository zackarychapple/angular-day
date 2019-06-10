import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import {CatEntity} from './cat.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CacheService} from '../cache/cache.service';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity])],
  controllers: [CatsController],
  providers: [CatsService, CacheService]
})
export class CatsModule {}
