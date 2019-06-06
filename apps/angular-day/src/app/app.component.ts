import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from '@angular-day/api-interface';

@Component({
  selector: 'angular-day-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  breed = '';
  //TODO: Refactor other calls to do this
  hello$ = this.http.get<Message>('/api/hello');

  constructor(private http: HttpClient) {}
}
