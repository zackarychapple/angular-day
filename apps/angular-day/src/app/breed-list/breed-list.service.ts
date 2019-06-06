import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BreedDto} from '../../../../api/src/cats/breed.dto';

@Injectable({
  providedIn: 'root'
})
export class BreedListService {
  breedList$ = this.http.get<Array<BreedDto>>('/api/cats');

  constructor(private http: HttpClient) {
  }
}
