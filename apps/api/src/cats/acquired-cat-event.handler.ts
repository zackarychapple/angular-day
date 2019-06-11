import {CommandHandler, EventPublisher, EventsHandler, ICommandHandler, IEventHandler} from '@nestjs/cqrs';
import {AcquiredCatCommand} from './acquired-cat.command';
import {Owner} from './owner.model';
import {AcquiredCatEvent} from './acquired-cat.event';
import {EventsLogsService} from '../events/events-logs.service';

@EventsHandler(AcquiredCatEvent)
export class AcquiredCatEventHandler implements IEventHandler<AcquiredCatEvent> {
  constructor(private eventsService: EventsLogsService){

  }
  handle(event: AcquiredCatEvent) {
    this.eventsService.catMovement(event);
  }

}
