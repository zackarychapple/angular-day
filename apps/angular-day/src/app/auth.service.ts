import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
  }

  validateAuth(user) {
    this.http.post('/api/auth/thirdPartyLogin', user).subscribe(result => {
      console.log('result');
      debugger;
    })
  }
}
