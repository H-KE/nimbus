import { Item } from './item';

export class Order {
  id: number;
  dispensary_id: number;
  items: Item[];
  address: string;
  total_price: number;
  status: string;
  show: boolean;
}
