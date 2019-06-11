import {Injectable} from '@angular/core';
import {BreedSearchDto} from '../../../../api/src/cats/breed_search.dto';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CatDto} from '../../../../api/src/cats/cat.dto';
import {AuthService} from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class BreedGridService {
  getBreedData(breed: string): Observable<Array<BreedSearchDto>> {
    return this.http.get<Array<BreedSearchDto>>(`/api/cats/${breed}`);
  }

  acquireCat(cat) {
    const importantCatInfo = {id: cat.id, url: cat.url};
    const catDTO: CatDto = {breed: JSON.stringify(importantCatInfo), owner: this.auth.user, hideout: 'My House'};
    return this.http.post('/api/cats', catDTO);
  }

  constructor(private http: HttpClient, private auth: AuthService) {
  }
}
