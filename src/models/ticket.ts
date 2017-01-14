export class Ticket {
  ticket_type: string;
  message: string;

  constructor(ticket_type: string, message: string) {
    this.ticket_type = ticket_type;
    this.message= message;
  }
}
