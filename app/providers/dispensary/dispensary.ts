import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DISPENSARIES } from './mock-dispensaries';

@Injectable()
export class DispensaryService {

  constructor(private http: Http) {}

  getNearestDispensaries() {
    return DISPENSARIES;
  }

}
