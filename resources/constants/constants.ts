import { Injectable } from '@angular/core';

@Injectable()
export class Constants{
  menuCategories: any;

  constructor(){
    this.menuCategories = ["Flowers", "Concentrates", "Edibles", "Pre-rolls", "Other"]
  }
}
