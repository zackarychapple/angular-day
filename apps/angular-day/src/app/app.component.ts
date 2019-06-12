import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Message} from '@angular-day/api-interface';
import {AngularFireAuth} from '@angular/fire/auth';
import {auth} from 'firebase';
import {AuthService} from './auth.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'angular-day-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  breed = '';
  loginForm: FormGroup;
  user$: Observable<any>;
  user: string = '';
  userSubject: BehaviorSubject<any> = new BehaviorSubject('');
  //TODO: Refactor other calls to do this
  hello$ = this.http.get<Message>('/api/hello');

  // THIS WAS A HUGE HELP: https://stackoverflow.com/questions/37344066/firebase-this-domain-is-not-authorized/48475438#48475438
  // https://stackoverflow.com/questions/56196172/error-403-restricted-client-with-google-signin-in-flutter
  constructor(private http: HttpClient,
              public afAuth: AngularFireAuth, public authService: AuthService) {
    this.user$ = this.userSubject.asObservable();
    //TODO Verify this still works
    afAuth.user.subscribe((user: any) => {
      if (user !== null) {
        if (typeof user.email === 'undefined') {
          this.authService.setUser(user.user.email);
        } else {
          this.authService.setUser(user.email);
        }
        this.userSubject.next(this.authService.getUser());
      }
    })
  }

  ngOnInit() {
    this.loginForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
    this.user$.subscribe((returnedUser) => {
      this.user = returnedUser;
    });
  }

  onSubmit() {
    // TODO: Need to add some error handling on the form
    this.authService.login(this.loginForm.value).subscribe((response: any) => {
      this.authService.setUser(response.username);
      this.userSubject.next(this.authService.getUser());
    });
  }

  async loginWithGoogle() {
    const user = await this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    this.authService.validateAuth(user);
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
