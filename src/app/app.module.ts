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
import { DispensaryPage } from '../pages/dispensary/dispensary';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { AddressModalPage } from '../pages/address-modal/address-modal';
import { ContactModalPage } from '../pages/contact-modal/contact-modal';
import { DocumentsModalPage } from '../pages/documents-modal/documents-modal';
import { TermsPage } from '../pages/terms/terms';
import { ShippoPage } from '../pages/shippo/shippo';
import { AboutPage } from '../pages/about/about';

import { CartService } from '../providers/cart/cart';
import { DispensaryService } from '../providers/dispensary/dispensary';
import { MenuService } from '../providers/menu/menu';
import { ProfileService } from '../providers/profile/profile';
import { OrderService } from '../providers/orders/orders';
import { AuthenticationService } from '../providers/authentication/authentication'
import { VerificationService } from '../providers/verification/verification';
import { TrackingService } from '../providers/tracking/tracking';
import { TicketService } from '../providers/ticket/ticket';

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
    DispensaryPage,
    ItemDetailsPage,
    AddressModalPage,
    DocumentsModalPage,
    TermsPage,
    ShippoPage,
    ContactModalPage,
    AboutPage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {}, {
      links: [
        { component: HomePage, name: 'Home', segment: 'home' },
        { component: SearchPage, name: 'Search', segment: 'dispensaries' },
        { component: OrdersPage, name: 'Orders', segment: 'orders' },
        { component: OrderDetailsPage, name: 'OrderDetails', segment: 'order-details' },
        { component: LoginPage, name: 'Login', segment: 'login' },
        { component: SignupPage, name: 'Signup', segment: 'signup' },
        { component: ProfilePage, name: 'Profile', segment: 'profile' },
        { component: ContactPage, name: 'Contact', segment: 'contact' },
        { component: CartPage, name: 'Cart', segment: 'cart', defaultHistory: [SearchPage]  },
        { component: CheckoutPage, name: 'Checkout', segment: 'checkout' },
        { component: DispensaryPage, name: 'dispensary', segment: 'dispensary/:dispensaryId', defaultHistory: [SearchPage] },
        { component: TermsPage, name: 'Terms', segment: 'terms', defaultHistory: [HomePage] },
        { component: AboutPage, name: 'About', segment: 'about' }
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
    DispensaryPage,
    ItemDetailsPage,
    AddressModalPage,
    DocumentsModalPage,
    TermsPage,
    ShippoPage,
    ContactModalPage,
    AboutPage
  ],
  providers: [
    CartService,
    DispensaryService,
    OrderService,
    MenuService,
    ProfileService,
    AuthenticationService,
    VerificationService,
    TrackingService,
    Storage,
    TicketService
  ]
})
export class AppModule {}
