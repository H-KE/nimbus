import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { MENU } from './mock-menu';

/*
  Generated class for the Menu provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class MenuService {

  constructor(private http: Http) {}

  getMenuForDispensary() {
    return MENU;
  }

}
