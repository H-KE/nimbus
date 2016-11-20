import { Item } from './item';

export class Dispensary {
  id: number;
  avatar_url: string;
  name: string;
  address: string;
  bio: string;
  rating: number;
  description: string;
  shipping_fee: number;
  free_shipping_cap: number;
  medical: boolean;
  pickup: boolean;
  mail: boolean;
  delivery: boolean;
  phone_number: string;
  products: Item[];
}
