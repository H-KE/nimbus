import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';

import _ from 'underscore';

@Injectable()
export class TrackingService {
  goShippoTrackingUrl: string;
  options: RequestOptions;

  constructor(public http: Http) {
    this.goShippoTrackingUrl = 'https://api.goshippo.com/tracks/';

    let goShippoAPIKey = 'shippo_live_38a9964bfb72435ec6e6058e07638b9ef260083a';
    let headers = new Headers({ 'Authorization': 'ShippoToken ' + goShippoAPIKey });
    this.options = new RequestOptions({ headers: headers });
  }

  getTrackingInfo(carrier: string, trackingNumber: string): any {
    return this.http.get(this.goShippoTrackingUrl + carrier + '/' + trackingNumber, this.options);
  }
}
