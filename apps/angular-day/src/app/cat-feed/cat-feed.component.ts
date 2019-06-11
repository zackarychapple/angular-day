import {Component, OnInit} from '@angular/core';
import {CatFeedService} from './cat-feed.service';

@Component({
  selector: 'angular-day-cat-feed',
  templateUrl: './cat-feed.component.html',
  styleUrls: ['./cat-feed.component.scss']
})
export class CatFeedComponent implements OnInit {

  constructor(private catFeedService: CatFeedService) {
  }

  ngOnInit() {
    this.catFeedService.sendCat('omg');
    this.catFeedService.getCatEvent().subscribe(cats => {
      // TODO: Print this feed on the screen
      console.log(cats);
    })
  }

}
