import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BreedListComponent} from './breed-list/breed-list.component';
import {BreedGridComponent} from './breed-grid/breed-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {LoginComponent} from './login/login.component';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AuthService} from './auth.service';
import {SocketIoModule} from 'ngx-socket-io';
import { CatFeedComponent } from './cat-feed/cat-feed.component';
import {CatFeedService} from './cat-feed/cat-feed.service';

const MATERIAL_MODULES = [
  MatGridListModule,
  MatSelectModule
];

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  declarations: [AppComponent, BreedListComponent, BreedGridComponent, LoginComponent, HomeComponent, CatFeedComponent],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ...MATERIAL_MODULES,
    SocketIoModule.forRoot({
      url: 'http://localhost:3333',
    }),
  ],
  providers: [AuthService, CatFeedService],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(){}
}
