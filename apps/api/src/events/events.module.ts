import {Module} from '@nestjs/common';
import {EventsGateway} from './events.gateway';
import {EventsLogsService} from './events-logs.service';

@Module({
  providers: [EventsGateway, EventsLogsService],
  exports: [EventsLogsService]
})
export class EventsModule {
}
