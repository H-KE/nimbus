import { Item } from './item';

export class Cart {
  dispensary_name: string;
  content: Item[];
  count: number;
  total: number;

  constructor(dispensaryName: string, content: Item[], count: number, total: number) {
    this.dispensary_name = dispensaryName;
    this.content = content;
    this.count = count;
    this.total = total;
  }
}
