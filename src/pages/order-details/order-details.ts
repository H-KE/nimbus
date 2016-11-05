import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Order } from '../../models/order';
import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { TrackingService } from '../../providers/tracking/tracking';


@Component({
  selector: 'order-details',
  templateUrl: 'order-details.html'
})
export class OrderDetailsPage {
  order: Order;
  address: any;
  securityAnswer: string;
  trackingInfo: any;
  errorMessage: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public orderService: OrderService,
              public alertCtrl: AlertController,
              public trackingService: TrackingService,
              public loadingCtrl: LoadingController) {

  };

  public ionViewDidLoad(): void {
    this.order = this.navParams.get('order');
    this.orderService.loadOrderAddress(this.order.address_id)
      .map(res => res.json())
      .subscribe(
        data => this.address = data
      )

    if(this.order.status == 'in_transit') {
      this.loadTrackingInfo();
    }

    this.securityAnswer = this.order.dispensary_name.toLowerCase().replace(/ /g, '');
  };

  doRefresh(refresher) {
    this.orderService.loadOrder(this.order.id)
      .map(response => response.json())
      .subscribe(
          data => {
            console.log(data);
            this.order = data;
            if(this.order.status == 'in_transit') {
              //TODO: duplicating load tracking info here because cannot figureout how to
              //complete refresher otherwise
              this.trackingService.getTrackingInfo(this.order.carrier_code, this.order.tracking_number)
                .map(response => response.json())
                .subscribe(
                  data => {
                    this.trackingInfo = data;
                    console.log(data);
                    refresher.complete();
                    if(this.trackingInfo && !this.trackingInfo.tracking_status) {
                      let alert = this.alertCtrl.create({
                        title: 'Oh No!',
                        subTitle: "No tracking info found for carrier: " + this.order.carrier_code + ", and tracking number: " + this.order.tracking_number,
                        buttons: ['OK']
                      });
                      alert.present();
                    }
                  },
                  error => {
                    refresher.complete();
                    let alert = this.alertCtrl.create({
                      title: 'Oh No!',
                      subTitle: "Failed to fetch tracking details! Please try again.",
                      buttons: ['OK']
                    });
                    alert.present();
                  }
                )
            } else {
              refresher.complete();
            }
          },
          error => refresher.complete()
      )
  };

  loadTrackingInfo() {
    var loader = this.loadingCtrl.create({});
    loader.present();
    this.trackingService.getTrackingInfo(this.order.carrier_code, this.order.tracking_number)
      .map(response => response.json())
      .subscribe(
        data => {
          this.trackingInfo = data;
          loader.dismiss();
          if(this.trackingInfo && !this.trackingInfo.tracking_status) {
            let alert = this.alertCtrl.create({
              title: 'Oh No!',
              subTitle: "No tracking info found for carrier: " + this.order.carrier_code + ", and tracking number: " + this.order.tracking_number,
              buttons: ['OK']
            });
            alert.present();
          }
        },
        error => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Oh No!',
            subTitle: "Failed to fetch tracking details! Please try again.",
            buttons: ['OK']
          });
          alert.present();
        }
      )
  };
}
