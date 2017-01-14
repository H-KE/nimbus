import { Item } from './item';

export class Order {
  id: number;
  retailer_id: number;
  retailer_name: string;
  retailer_image: string;
  distribution_channel: string;
  order_details: Item[];
  address_id: number;
  total_price: number; //TODO: make this sub_total
  status: string;
  show: boolean;
  dispensary_name: string;
  dispensary_email: string;
  delivery_fee: number;
  tax_amount: number;
  carrier_code: string;
  tracking_number: string;
  medical: boolean;
  mail: boolean;
  pickup: boolean;
  delivery: boolean;
  created_at: any;
}
