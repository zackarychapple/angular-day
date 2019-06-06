import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BreedListService} from './breed-list.service';

@Component({
  selector: 'angular-day-breed-list',
  templateUrl: './breed-list.component.html',
  styleUrls: ['./breed-list.component.scss']
})
export class BreedListComponent implements OnInit {
  @Output()
  selectedValue = new EventEmitter();

  selected = '';
  constructor(private breedListService: BreedListService) {

  }

  emitNewVal($event){
    this.selectedValue.emit($event.value)
  }

  ngOnInit() {

  }

}
