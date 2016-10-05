export class Item {
  id: number;
  retailer_id: number;
  name: string;
  images: string[];
  prices: number[];
  price_labels: string[];
  description: string;
  thc: number;
  cbd: number;
  subspecies: string;
  category: string;
  quantity: string;
  price: number;

  getAvatarUrl(url) {
    if (this.retailer_id == 2) {
      url = url.replace('.jpg', '_tn.jpg');
    }
    return url;
  }
}
