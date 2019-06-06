import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {BreedListComponent} from './breed-list/breed-list.component';
import {BreedGridComponent} from './breed-grid/breed-grid.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material';

const MATERIAL_MODULES = [
  MatGridListModule,
  MatSelectModule
];

@NgModule({
  declarations: [AppComponent, BreedListComponent, BreedGridComponent],
  imports: [BrowserModule, HttpClientModule, BrowserAnimationsModule, ...MATERIAL_MODULES],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
