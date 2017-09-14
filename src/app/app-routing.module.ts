import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { VenuesComponent }      from './venues.component';
import { VenueDetailComponent }  from './venue-detail.component';

const routes: Routes = [
  { path: '', redirectTo: '/search', pathMatch: 'full' },
  { path: 'venue/:id', component: VenueDetailComponent },
  { path: 'search',     component: VenuesComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}