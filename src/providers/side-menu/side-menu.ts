import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication'

import { HomePage } from '../../pages/home/home';
import { SignupPage } from '../../pages/signup/signup';
import { LoginPage } from '../../pages/login/login';
import { SearchPage } from '../../pages/search/search';
import { OrdersPage } from '../../pages/orders/orders'
import { ProfilePage } from '../../pages/profile/profile';
import { ContactPage } from '../../pages/contact/contact';

@Injectable()
export class SideMenuService {
  pages: any

  constructor(public auth: AuthenticationService) {}

  loadSideMenu() {
    this.auth.validateToken()
      .map(res => res.json())
      .subscribe(
        res => {
          this.pages = [
            { title: 'Explore', icon: 'search', component: SearchPage },
            { title: 'My Orders', icon: 'cloud-circle', component: OrdersPage},
            { title: 'Contact us', icon: 'chatbubbles', component: ContactPage},
            { title: 'My Profile', icon: 'contact', component: ProfilePage}
          ];
        },
        error => {
          this.pages = [
            { title: 'Explore', icon: 'search', component: SearchPage },
            { title: 'Sign Up', icon: 'cloud-circle', component: SignupPage },
            { title: 'Sign In', icon: 'cloud-circle', component: LoginPage }
          ];
        }
      )
  }
}
