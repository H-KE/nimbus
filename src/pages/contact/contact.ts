import { Component } from '@angular/core';
import { NavController,
         ToastController,
         ModalController,
         LoadingController,
         AlertController } from 'ionic-angular';

import { ContactModalPage } from '../../pages/contact-modal/contact-modal';

import { Ticket } from '../../models/ticket';

import { TicketService } from '../../providers/ticket/ticket';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  constructor(public modalCtrl: ModalController,
              public loadingCtrl: LoadingController,
              public toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public ticketService: TicketService) {}

  ionViewDidLoad() {

  }

  sendTicket(ticketType: string) {
    let contactModal = this.modalCtrl.create(ContactModalPage, {"ticketType": ticketType});
    contactModal.present(contactModal);
    contactModal.onDidDismiss(message => {
      if (message) {
        // console.log(message);
        let ticket = new Ticket(ticketType, message);
        var loader = this.loadingCtrl.create({});
        loader.present();
        this.ticketService.sendTicket(ticket)
          .map(response => response.json())
          .subscribe(
            data => {
              loader.dismiss();
              let toast = this.toastCtrl.create({
                message: "Thank you " + data.first_name + ", we have received your ticket!",
                duration: 3000
              })
              toast.present();
            },
            error => {
              // console.log(error);
              loader.dismiss();
              let alert = this.alertCtrl.create({
                title: 'Woops',
                subTitle: error == undefined? error.json().errors.full_messages[0] : 'Could not send ticket, please try again.',
                buttons: ['OK']
              });
              alert.present();
            }
          )
      }
    });
  }
}
