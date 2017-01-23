export class Review {
  title: string;
  comment: string;
  product_id: number;
  retailer_id: number;
  rating :number;

  constructor(item: any, comment: string, rating: number, type: string) {
    type == 'RETAILER' ? this.retailer_id = item.id : this.product_id = item.id;
    this.comment = comment;
    this.rating = rating
  }
}
