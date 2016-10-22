import { Item } from './item';
import { Dispensary } from './dispensary';

export class Cart {
  dispensary_name: string;
  dispensary: Dispensary;
  content: Item[];
  count: number;
  total: number;

  constructor(dispensaryName: string, dispensary: Dispensary, content: Item[], count: number, total: number) {
    this.dispensary_name = dispensaryName;
    this.dispensary= dispensary;
    this.content = content;
    this.count = count;
    this.total = total;
  }
}
