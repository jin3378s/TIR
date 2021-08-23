class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  public getTicketOffice(): TicketOffice {
    return this.ticketOffice;
  }
}

// ticket seller를 개선 한다.
// theater 에서 ticketOffice에 접근 하는 로직을 ticketSeller로 옮기면서, theater는 ticketOffice에 대한 의존도가 제거 되었다.

class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  public sellTo(audience: Audience): void {
    if (audience.hasInvitation()) {
      const ticket: Ticket = this.ticketSeller.getTicketOffice().getTicket();

      audience.getBag().setTicket(ticket);
    } else {
      const ticket: Ticket = this.ticketOffice.getTicket();

      audience.getBag().minusAmount(ticket.getFee());

      this.ticketOffice.plusAmount(ticket.getFee());

      audience.getBag().setTicket(ticket);
    }
  }
}

class TicketSeller {
  private ticketOffice: TicketOffice;

  constructor(ticketOffice: TicketOffice) {
    this.ticketOffice = ticketOffice;
  }

  // 이제 ticketSeller는 audience가 가방을 가졌는지, 지갑을 가졌는지, 주머니에 있는지 알지 못한다.
  public sellTo(audience: Audience): void {
    const ticket: Ticket = this.ticketOffice.getTicket();
    audience.buy(ticket);
    this.ticketOffice.plusAmount(ticket.getFee());
  }
}
