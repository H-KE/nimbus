import { Item } from './item';

export class Dispensary {
  id: number;
  avatar_url: string;
  name: string;
  address: string;
  rating: number;
  description: string;
  shipping_fee: number;
  products: Item[];
}
