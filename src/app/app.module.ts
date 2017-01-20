import { NgModule } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { SearchPage } from '../pages/search/search';
import { OrdersPage } from '../pages/orders/orders'
import { OrderDetailsPage } from '../pages/order-details/order-details'
import { LoginPage } from '../pages/login/login';
import { SignupPage }  from '../pages/signup/signup';
import { ProfilePage } from '../pages/profile/profile';
import { ContactPage } from '../pages/contact/contact';
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DispensaryMenuPage } from '../pages/dispensary-menu/dispensary-menu';
import { DispensaryInfoPage } from '../pages/dispensary-info/dispensary-info';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { AddressModalPage } from '../pages/address-modal/address-modal';
import { ContactModalPage } from '../pages/contact-modal/contact-modal';
import { DocumentsModalPage } from '../pages/documents-modal/documents-modal';
import { TermsPage } from '../pages/terms/terms';
import { ShippoPage } from '../pages/shippo/shippo';
import { DispensaryTabsPage} from '../pages/dispensary-tabs/dispensary-tabs'

import { CartService } from '../providers/cart/cart';
import { DispensaryService } from '../providers/dispensary/dispensary';
import { ProfileService } from '../providers/profile/profile';
import { OrderService } from '../providers/orders/orders';
import { AuthenticationService } from '../providers/authentication/authentication'
import { VerificationService } from '../providers/verification/verification';
import { TrackingService } from '../providers/tracking/tracking';
import { TicketService } from '../providers/ticket/ticket';
import { SideMenuService } from '../providers/side-menu/side-menu';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SearchPage,
    OrdersPage,
    OrderDetailsPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ContactPage,
    CartPage,
    CheckoutPage,
    DispensaryMenuPage,
    DispensaryInfoPage,
    ItemDetailsPage,
    AddressModalPage,
    DocumentsModalPage,
    TermsPage,
    ShippoPage,
    ContactModalPage,
    DispensaryTabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: [
        // { component: DispensaryPage, name: 'dispensary', segment: 'dispensary/:dispensaryId', defaultHistory: [SearchPage] }
      ]
    })
  ],
  bootstrap: [
    IonicApp
  ],
  entryComponents: [
    MyApp,
    HomePage,
    SearchPage,
    OrdersPage,
    OrderDetailsPage,
    LoginPage,
    SignupPage,
    ProfilePage,
    ContactPage,
    CartPage,
    CheckoutPage,
    DispensaryMenuPage,
    DispensaryInfoPage,
    ItemDetailsPage,
    AddressModalPage,
    DocumentsModalPage,
    TermsPage,
    ShippoPage,
    ContactModalPage,
    DispensaryTabsPage
  ],
  providers: [
    CartService,
    DispensaryService,
    OrderService,
    ProfileService,
    AuthenticationService,
    VerificationService,
    TrackingService,
    Storage,
    TicketService,
    SideMenuService
  ]
})
export class AppModule {}
