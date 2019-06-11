import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class CatFeedService {

  constructor(private socket: Socket) {
  }

  sendCat(msg: string) {
    this.socket.emit('events', msg);
  }

  getCatEvent() {
    return this.socket
      .fromEvent('events');
  }
}
