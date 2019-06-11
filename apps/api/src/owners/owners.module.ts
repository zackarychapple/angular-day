import {Module} from '@nestjs/common';
import {OwnersController} from './owners.controller';
import {CatsService} from '../cats/cats.service';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CatEntity} from '../cats/cat.entity';
import {CacheService} from '../cache/cache.service';
import {CqrsModule} from '@nestjs/cqrs';
import {AcquiredCatHandler} from '../cats/acquired-cat.handler';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), CqrsModule],
  controllers: [OwnersController],
  providers: [CatsService, CacheService, AcquiredCatHandler]
})
export class OwnersModule {
}
