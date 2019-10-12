import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountriesListRoutingModule } from './countries-list-routing.module';
import { CountriesListComponent } from './countries-list.component';

@NgModule({
  // declarations: [CountriesListComponent],
  imports: [
    CommonModule,
    CountriesListRoutingModule
  ]
})
export class CountriesListModule { }
