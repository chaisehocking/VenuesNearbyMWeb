import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent }         from './app.component';
import { VenuesComponent }      from './venues.component';
import { VenueDetailComponent }  from './venue-detail.component';
import { VenueService }          from './venue.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    VenueDetailComponent,
    VenuesComponent,
  ],
  providers: [ VenueService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }