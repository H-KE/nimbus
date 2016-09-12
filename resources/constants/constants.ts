import { Injectable } from '@angular/core';

@Injectable()
export class Constants{
  menu_subcategories: any;

  constructor(){
    this.menu_subcategories = ["Flowers", "Concentrates", "Edibles", "Pre-rolls", "Other"]
  }
}
