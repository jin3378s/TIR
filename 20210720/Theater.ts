class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    if (audience.hasInvitation()) {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();

      audience.getBag().setTicket(ticket);
    } else {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();

      audience.getBag().minusAmount(ticket.getFee());

      this.ticketSeller.getTicketOffice().plusAmount(ticket.getFee());

      audience.getBag().setTicket(ticket);
    }
  }
}

// ticket seller 를 캡슐화 한다.
// ticket seller가 ticket office객체를 가졌는지 말았는지는 알바 아니다.
class Theater {
  private ticketSeller: TicketSeller;

  constructor(ticketSeller: TicketSeller) {
    this.ticketSeller = ticketSeller;
  }

  public enter(audience: Audience): void {
    this.ticketSeller.sellTo(audience);
  }
}
