import { Injectable } from '@angular/core';
import { AuthenticationService } from '../authentication/authentication'

import { HomePage } from '../../pages/home/home';
import { SearchPage } from '../../pages/search/search';
import { OrdersPage } from '../../pages/orders/orders'
import { ProfilePage } from '../../pages/profile/profile';
import { ContactPage } from '../../pages/contact/contact';
import { AboutPage } from '../../pages/about/about';

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
            { title: 'Sign In', icon: 'cloud-circle', component: HomePage }
          ];
        }
      )
  }
}
