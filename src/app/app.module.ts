import { CountriesListComponent } from './components/countries-list/countries-list.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
import { AgmCoreModule } from '@agm/core';
import { NgxUiLoaderModule } from 'ngx-ui-loader';
import {PagerService} from './services/pager.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CountriesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FontAwesomeModule,
    AutocompleteLibModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD6yqgdp2QpkUfiylBm-81zF8cf0hR2AG4'
    }),
    NgxUiLoaderModule
  ],
  providers: [PagerService],
  bootstrap: [AppComponent]
})

export class AppModule {

}
