import {Injectable} from '@angular/core';
import {BreedSearchDto} from '../../../../api/src/cats/breed_search.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreedGridService {
  getBreedData(breed: string): Observable<Array<BreedSearchDto>> {
    return this.http.get<Array<BreedSearchDto>>(`/api/cats/${breed}`);
  }


  constructor(private http: HttpClient) {
  }
}
