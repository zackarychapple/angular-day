import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse,} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {Logger} from '@nestjs/common';
import {EventsLogsService} from './events-logs.service';

@WebSocketGateway({origins: '*:*'})
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private eventLogs: EventsLogsService) {

  }

  handleConnection() {
    this.eventLogs.incrementUser();
    Logger.log('Client Connected to Socket');
  }

  handleDisconnect() {
    this.eventLogs.decrementUser();
    Logger.log('Client Disconnected to Socket');
  }


  @SubscribeMessage('events')
  onEvent(client, data: any): WsResponse<any> {
    const event = 'events';
    Logger.log('Event Received: ' + JSON.stringify(data));
    return {event, data};
  }

}
