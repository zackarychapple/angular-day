import {AggregateRoot} from '@nestjs/cqrs';
import {LoseCatEvent} from './lose-cat.event';
import {AcquiredCatEvent} from './acquired-cat.event';
import {AcquiredCatCommand} from './acquired-cat.command';

export class Owner extends AggregateRoot {
  constructor(private readonly id: string) {
    super();
  }

  acquireCat(cat: AcquiredCatCommand) {
    this.apply(new AcquiredCatEvent(this.id, cat))
  }

  loseCat(cat: AcquiredCatCommand) {
    this.apply(new LoseCatEvent(this.id, cat))
  }
}
