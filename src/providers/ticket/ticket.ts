import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthenticationService } from '../authentication/authentication'

import { Ticket } from '../../models/ticket';
import _ from 'underscore';

@Injectable()
export class TicketService {

  constructor(public http: Http,
              public auth: AuthenticationService) {
  }

  sendTicket(ticket: Ticket): any {
    let body = JSON.stringify(ticket);
    return this.auth.post('tickets', body);
  }
}
