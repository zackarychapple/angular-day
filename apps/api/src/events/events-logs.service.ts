import {Injectable} from '@nestjs/common';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class EventsLogsService {
  userCount: Observable<number>;
  userCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.userCount = this.userCountSubject.asObservable();
  }

  incrementUser() {
    this.userCountSubject.next(this.userCountSubject.value + 1);
  }

  decrementUser() {
    const currentValue = this.userCountSubject.value;
    if (currentValue > 0) {
      this.userCountSubject.next(this.userCountSubject.value - 1);
    }
  }
}
