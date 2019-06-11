import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // TODO: Add an HTTP interceptor to this to make it send the user token on every request
  user;

  constructor(private http: HttpClient) {
  }

  setUser(user){
    this.user = user.email;
  }

  validateAuth(user) {
    this.http.post('/api/auth/thirdPartyLogin', user).subscribe(result => {
      console.log('result');
    })
  }
}
