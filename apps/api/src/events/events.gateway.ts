import {SubscribeMessage, WebSocketGateway, WebSocketServer, WsResponse,} from '@nestjs/websockets';
import {Server} from 'socket.io';
import {Logger} from '@nestjs/common';
import {EventsLogsService} from './events-logs.service';
import {plainToClass} from 'class-transformer';
import {CatDto} from '../cats/cat.dto';

@WebSocketGateway({origins: '*:*'})
export class EventsGateway {
  @WebSocketServer()
  server: Server;
  wsClients = [];

  constructor(private eventLogs: EventsLogsService) {
    this.eventLogs.cats.subscribe((catEvent) => {
      const newCat = plainToClass(CatDto, catEvent.cat.cat);
      // TODO: Get rid of this hack when i restructure breed
      newCat.breed = JSON.parse(newCat.breed);
      this.broadcast('events', newCat)
    })
  }

  handleConnection(client) {
    this.wsClients.push(client);
    this.eventLogs.incrementUser();
    this.broadcast('connected', {});
    Logger.log('Client Connected to Socket');
  }

  handleDisconnect(client) {
    for (let i = 0; i < this.wsClients.length; i++) {
      if (this.wsClients[i] === client) {
        this.wsClients.splice(i, 1);
        break;
      }
    }
    this.broadcast('disconnect', {});

    this.eventLogs.decrementUser();
    Logger.log('Client Disconnected to Socket');
  }

  private broadcast(event, message: any) {
    for (const c of this.wsClients) {
      c.emit(event, message);
    }
  }

  @SubscribeMessage('events')
  handleEvent(client, data: any): WsResponse<any> {
    const event = 'events';
    return {event, data};
  }

}
