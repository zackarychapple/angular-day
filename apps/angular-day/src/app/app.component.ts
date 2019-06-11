import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@angular-day/api-interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AuthService} from './auth.service';

@Component({
  selector: 'angular-day-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breed = '';
  //TODO: Refactor other calls to do this
  hello$ = this.http.get<Message>('/api/hello');

  // THIS WAS A HUGE HELP: https://stackoverflow.com/questions/37344066/firebase-this-domain-is-not-authorized/48475438#48475438
  // https://stackoverflow.com/questions/56196172/error-403-restricted-client-with-google-signin-in-flutter
  constructor(private http: HttpClient, public afAuth: AngularFireAuth, public authService: AuthService) {
    afAuth.user.subscribe((user: any) => {
      if (typeof user.email === 'undefined') {
        this.authService.setUser(user.user);
      } else {
        this.authService.setUser(user);
      }
    })
  }

  async login() {
    const user = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.validateAuth(user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
