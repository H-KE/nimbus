import { Item } from './item';

export class Order {
  id: number;
  items: Item[];
  dispensary: string;
  address: string;
  user: string;
  total: number;
  status: string;
  show: boolean;
}
