import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Order } from '../../models/order';
import { CartService } from '../../providers/cart/cart';
import { OrderService } from '../../providers/orders/orders';
import { TrackingService } from '../../providers/tracking/tracking';

import { ShippoPage } from '../shippo/shippo'
import _ from 'lodash'

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
  bankLinks = [
    {
      name: 'RBC',
      link: 'https://www1.royalbank.com/cgi-bin/rbaccess/rbunxcgi?F6=1&F7=IB&F21=IB&F22=IB&REQUEST=ClientSignin&LANGUAGE=ENGLISH&_ga=1.168909345.1897265541.1485218757'
    },
    {
      name: 'TD Canada Trust',
      link: 'https://easyweb.td.com/waw/idp/login.htm?execution=e1s1'
    },
    {
      name: 'Scotiabank',
      link: 'https://www1.scotiaonline.scotiabank.com/online/authentication/authentication.bns'
    },
    {
      name: 'BMO',
      link: 'https://www1.bmo.com/onlinebanking/cgi-bin/netbnx/NBmain?product=5'
    },
    {
      name: 'PC Financial',
      link: 'https://www.txn.banking.pcfinancial.ca/ebm-resources/public/client/web/index.html#/signon'
    },
    {
      name: 'CIBC',
      link: 'https://www.cibc.com/en/personal-banking.html'
    }
  ]

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public cartService: CartService,
              public orderService: OrderService,
              public alertCtrl: AlertController,
              public trackingService: TrackingService,
              public loadingCtrl: LoadingController) {
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

  public ionViewDidLoad(): void {}

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
              title: 'Woops',
              subTitle: "No tracking info found for carrier: " + this.order.carrier_code + ", and tracking number: " + this.order.tracking_number,
              buttons: ['OK']
            });
            alert.present();
          }
        },
        error => {
          loader.dismiss();
          let alert = this.alertCtrl.create({
            title: 'Woops',
            subTitle: "Failed to fetch tracking details! Please try again.",
            buttons: ['OK']
          });
          alert.present();
        }
      )
  };

  initiateEtransferAlert() {
    let alert = this.alertCtrl.create();
    alert.setTitle('E-Transfer Quick Links');
    _.map(this.bankLinks, bank => {
      alert.addInput({type: 'radio', label: bank.name, value: bank.link});
    })
    alert.addButton('Cancel');
    alert.addButton({
      text   : 'Go',
      handler: data => {
        window.open(data)
      }
    });
    alert.present();
  }

  goToShippo() {
    this.navCtrl.push(ShippoPage);
  };

  getShippoLink() {
    return "http://tracking.goshippo.com/" + this.order.carrier_code + "/" + this.order.tracking_number;
  }
}
