import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import { Serializable, HttpResponse } from './venue-response';


@Injectable()
export class VenueService {
  private venuesUrl = 'api/venues';  // URL to web api
  private exploreVenuesUrl = 'https://api.foursquare.com/v2/venues/explore';  // URL to web api
  private venueDetailUrl = 'https://api.foursquare.com/v2/venues';  // URL to web api
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http: Http) { }

  getVenues(searchTerm: string): Promise<HttpResponse> {
    return this.http.get(this.exploreVenuesUrl
      + '?near=' + searchTerm
      + '&offset=' + 0
      + '&limit=' + 30
      + '&venuePhotos=1'
      + '&near=' + searchTerm
      + '&client_id=' + 'QC4BPZAVQDAO1IFP1VWLPNEIQOHWFYL4C2ZELGCYGL55DTWF'
      + '&client_secret=' + 'VFRVIU03QYPNYG3AGXQEVJQFZZBBMIXFR0ZIFZJIQLC4D0QH'
      + '&v=' + '20170701')
               .toPromise()
               .then(response => {
                 var httpResponse = new HttpResponse();
                 httpResponse.fillFromJSONObject(response.json());
                 return httpResponse;
               })
               .catch(this.handleError);
  }

    getVenue(id: string): Promise<HttpResponse> {

    return this.http.get(this.venueDetailUrl + "/" + id
      + '?client_id=' + 'QC4BPZAVQDAO1IFP1VWLPNEIQOHWFYL4C2ZELGCYGL55DTWF'
      + '&client_secret=' + 'VFRVIU03QYPNYG3AGXQEVJQFZZBBMIXFR0ZIFZJIQLC4D0QH'
      + '&v=' + '20170701')
               .toPromise()
               .then(response => {
                 var httpResponse = new HttpResponse();
                 httpResponse.fillFromJSONObject(response.json());
                 return httpResponse;
               })
               .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }

}