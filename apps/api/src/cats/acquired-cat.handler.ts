import {CommandHandler, EventPublisher, ICommandHandler} from '@nestjs/cqrs';
import {AcquiredCatCommand} from './acquired-cat.command';
import {Owner} from './owner.model';

@CommandHandler(AcquiredCatCommand)
export class AcquiredCatHandler implements ICommandHandler<AcquiredCatCommand> {
  constructor(private readonly publisher: EventPublisher) {
  }

  async execute(command: AcquiredCatCommand) {
    const cat = this.publisher.mergeObjectContext(
      new Owner('1')
    );
    cat.acquireCat(command);
    cat.commit();
    return command;
  }
}
