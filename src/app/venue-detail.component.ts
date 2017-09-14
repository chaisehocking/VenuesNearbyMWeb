import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Params } from '@angular/router';
import { Location }                 from '@angular/common';

import { HttpResponse, Response, Group, Item, Venue, Tip, Photo } from './venue-response';

import { VenueService } from './venue.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'venue-detail',
  templateUrl: './venue-detail.component.html',
  styleUrls: [ './venue-detail.component.css' ],
  providers: [ VenueService ]
})
export class VenueDetailComponent implements OnInit {
  @Input() venue: Venue
  constructor(
  private venueService: VenueService,
  private route: ActivatedRoute,
  private location: Location
) {}

  ngOnInit(): void {
    this.route.paramMap

    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        let id = ""+params['id'];
        console.log("params", params['id']);
        this.venueService.getVenue(id)
        .then(httpResponse => {
          this.venue = httpResponse.response.venue
          console.log("url" + this.venue.url)
        })
      }
    });
  }
}

