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
import { CartPage } from '../pages/cart/cart';
import { CheckoutPage } from '../pages/checkout/checkout';
import { DispensaryPage } from '../pages/dispensary/dispensary';
import { ItemDetailsPage } from '../pages/item-details/item-details';
import { AddressModalPage } from '../pages/address-modal/address-modal';
import { CardModalPage } from '../pages/card-modal/card-modal';
import { DocumentsPage } from '../pages/documents/documents';

import { CartService } from '../providers/cart/cart';
import { DispensaryService } from '../providers/dispensary/dispensary';
import { MenuService } from '../providers/menu/menu';
import { ProfileService } from '../providers/profile/profile';
import { OrderService } from '../providers/orders/orders';
import { AuthenticationService } from '../providers/authentication/authentication'
import { StripeService } from '../providers/stripe/stripe';
import { VerificationService } from '../providers/verification/verification';


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
    CartPage,
    CheckoutPage,
    DispensaryPage,
    ItemDetailsPage,
    AddressModalPage,
    CardModalPage,
    DocumentsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
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
    CartPage,
    CheckoutPage,
    DispensaryPage,
    ItemDetailsPage,
    AddressModalPage,
    CardModalPage,
    DocumentsPage
  ],
  providers: [
    CartService,
    DispensaryService,
    OrderService,
    MenuService,
    ProfileService,
    AuthenticationService,
    StripeService,
    VerificationService,
    Storage
  ]
})
export class AppModule {}
