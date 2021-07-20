class Bag {
  private amount: number;
  private invitiation: Invitation;
  private ticket: Ticket;

  public hasInvitation(): boolean {
    return !!this.invitiation;
  }

  public hasTicket(): boolean {
    return !!this.ticket;
  }

  public setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }

  static withInvitation(invitiation: Invitation, amount: number) {
    const bag = new Bag();

    bag.invitiation = invitiation;
    bag.amount = amount;

    return bag;
  }

  constructor(amount: number) {
    this.amount = amount;
  }
}

// audience로 부터 제어권을 위임 받는다.
class Bag {
  private amount: number;
  private invitiation: Invitation;
  private ticket: Ticket;

  private hasInvitation(): boolean {
    return !!this.invitiation;
  }

  private hasTicket(): boolean {
    return !!this.ticket;
  }

  private setTicket(ticket: Ticket): void {
    this.ticket = ticket;
  }

  private minusAmount(amount: number): void {
    this.amount -= amount;
  }

  private plusAmount(amount: number): void {
    this.amount += amount;
  }

  static withInvitation(invitiation: Invitation, amount: number) {
    const bag = new Bag();

    bag.invitiation = invitiation;
    bag.amount = amount;

    return bag;
  }

  constructor(amount: number) {
    this.amount = amount;
  }

  hold(ticket: Ticket): number {
    if (this.hasInvitation()) {
      this.setTicket(ticket);
      return 0;
    } else {
      this.setTicket(ticket);
      this.minusAmount(ticket.getFee());
      return ticket.getFee();
    }
  }
}
