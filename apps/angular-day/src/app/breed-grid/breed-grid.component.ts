import {Component, Input, OnChanges, SimpleChange} from '@angular/core';
import {BreedGridService} from './breed-grid.service';
import {BreedSearchDto} from '../../../../api/src/cats/breed_search.dto';

@Component({
  selector: 'angular-day-breed-grid',
  templateUrl: './breed-grid.component.html',
  styleUrls: ['./breed-grid.component.scss']
})
export class BreedGridComponent implements OnChanges {
  @Input()
  breed = '';

  breedResults: Array<BreedSearchDto>;

  constructor(private breedGridService: BreedGridService) {

  }

  acquire(cat) {
    this.breedGridService.acquireCat(cat).subscribe();
  }

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['breed'] && changes['breed'].previousValue !== changes['breed'].currentValue && changes['breed'].currentValue !== "") {
      this.breedGridService.getBreedData(this.breed).subscribe((breeddata: any) => {
        this.breedResults = breeddata;
      });
    }
  }
}
