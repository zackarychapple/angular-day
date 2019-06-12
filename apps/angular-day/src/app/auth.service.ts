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

  login(auth) {
    return this.http.post('/api/auth/login', auth)
  }

  setUser(user) {
    this.user = user;
  }

  getUser(){
    return this.user;
  }

  validateAuth(user) {
    this.http.post('/api/auth/thirdPartyLogin', user).subscribe(result => {
      console.log('result');
    })
  }
}
