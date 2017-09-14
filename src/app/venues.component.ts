import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpResponse, Response, Group, Item, Venue, Tip, Photo } from './venue-response';
import { VenueService } from './venue.service';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'my-venues',
  templateUrl: './venues.component.html',
  styleUrls: [ './venues.component.css' ],
  providers: [ VenueService ]
})
export class VenuesComponent implements OnInit {
  items: Array<Item>;
  term: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private venueService: VenueService) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        this.search(params.term);
      });
  }

  gotoDetail(item: Item): void {
    this.router.navigate(['/venue', item.venue.id]);
  }

  search(term: string): void {
    if (!term) {
      return;
    }

    term = term.trim();
    if (term.length == 0) {
      return;
    }

    this.term = term;

    this.venueService.getVenues(term).then(httpResponse => {

      var items: Array<Item> = [];
      for (var group in httpResponse.response.groups) {
        items = items.concat(httpResponse.response.groups[group].items);

      }
      this.items = items;
    })
  }
}
