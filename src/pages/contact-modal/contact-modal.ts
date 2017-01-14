import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'contact-modal',
  templateUrl: 'contact-modal.html'
})
export class ContactModalPage {
  ticketDisplay: any;
  ticketType: string;
  ticketMessage: string;

  constructor(public viewCtrl: ViewController,
              public navParams: NavParams) {
    this.ticketDisplay = {
      'order': {
        'title': 'Order Ticket',
        'message': 'Tell us about how we can help with your recent orders.'
      },
      'account': {
        'title': 'Account Ticket',
        'message': 'Tell us about how we can help with your account.'
      },
      'feedback': {
        'title': 'Feedback Ticket',
        'message': 'Yay! We love your feedback! Let us know what you like and did not like about the app :D'
      }
    };
    this.ticketType = navParams.get('ticketType');
  }

  ionViewDidLoad() {
    //Do not use this for modals
  };

  getTicketTitle() {
    return this.ticketDisplay[this.ticketType]['title'];
  }

  getTicketMessage() {
    return this.ticketDisplay[this.ticketType]['message'];
  }

  cancel() {
    this.viewCtrl.dismiss();
  }

  send() {
    this.viewCtrl.dismiss(this.ticketMessage);
  }
}
