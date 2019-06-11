import {Module} from '@nestjs/common';
import {CatsController} from './cats.controller';
import {CatsService} from './cats.service';
import {CatEntity} from './cat.entity';
import {TypeOrmModule} from '@nestjs/typeorm';
import {CacheService} from '../cache/cache.service';
import {CommandBus, CqrsModule} from '@nestjs/cqrs';
import {AcquiredCatHandler} from './acquired-cat.handler';
import {AcquiredCatEventHandler} from './acquired-cat-event.handler';
import {EventsModule} from '../events/events.module';
import {Repository} from 'typeorm';
import {addCircuitBreakerSupportTo} from 'nest-circuitbreaker';


//TODO: How can I get a injection working with inject repository
@Module({
  imports: [TypeOrmModule.forFeature([CatEntity]), CqrsModule, EventsModule],
  controllers: [CatsController],
  providers: [
    {
      provide: CatsService,
      useFactory: (catEntity: Repository<CatEntity>, commandBus: CommandBus, cache: CacheService) => {
        return addCircuitBreakerSupportTo(new CatsService(catEntity, commandBus, cache), CatsService);
      },
      inject: [
        CommandBus, CacheService
      ]
    },
    CacheService,
    AcquiredCatHandler,
    AcquiredCatEventHandler
  ]
})
export class CatsModule {
}
