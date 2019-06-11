import {Component, OnInit} from '@angular/core';
import {CatFeedService} from './cat-feed.service';

@Component({
  selector: 'angular-day-cat-feed',
  templateUrl: './cat-feed.component.html',
  styleUrls: ['./cat-feed.component.scss']
})
export class CatFeedComponent implements OnInit {
  feed: Array<any> = [];

  constructor(private catFeedService: CatFeedService) {
    this.catFeedService.getCatEvent().subscribe((cats:any) => {
      this.feed.push(cats);
    })
  }

  ngOnInit() {
  }

}
