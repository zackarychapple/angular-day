import {Injectable} from '@nestjs/common';
import {BehaviorSubject, Observable, ReplaySubject} from 'rxjs';
import {AcquiredCatEvent} from '../cats/acquired-cat.event';

@Injectable()
export class EventsLogsService {
  cats: Observable<any>;
  // catsSubject: BehaviorSubject<[AcquiredCatEvent] | []> = new BehaviorSubject([]);
  catsSubject = new ReplaySubject(10); // TODO: Add a type here
  userCount: Observable<number>;
  userCountSubject: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor() {
    this.userCount = this.userCountSubject.asObservable();
    this.cats = this.catsSubject.asObservable();
  }

  catMovement(event: AcquiredCatEvent) {
    // const currentCats: any = this.catsSubject.value;
    // currentCats.unshift(event);
    // TODO: Cut this to 10 if over
    this.catsSubject.next(event);
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
