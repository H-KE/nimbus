import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DISPENSARIES } from './mock-dispensaries';

/*
  Generated class for the Dispensary provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DispensaryService {

  constructor(private http: Http) {}

  getNearestDispensaries() {
    return DISPENSARIES;
  }

}
