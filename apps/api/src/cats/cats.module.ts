import {Module} from '@nestjs/common';
import {CatsController} from './cats.controller';
import {CatsService} from './cats.service';
import {CatEntity} from './cat.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CacheService} from '../cache/cache.service';
import {CqrsModule} from '@nestjs/cqrs';
import {AcquiredCatHandler} from './acquired-cat.handler';
import {AcquiredCatEventHandler} from './acquired-cat-event.handler';
import {EventsModule} from '../events/events.module';

@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), CqrsModule, EventsModule],
  controllers: [CatsController],
  providers: [CatsService, CacheService, AcquiredCatHandler, AcquiredCatEventHandler]
})
export class CatsModule {
}
