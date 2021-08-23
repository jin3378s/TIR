class TicketOffice {
  private amount: number;
  private tickets: Ticket[] = [];

  constructor(amount: number, tickets: Ticket[]) {
    this.amount = amount;
    this.tickets = tickets;
  }

  public getTicket(): Ticket {
    return this.tickets.splice(0, 1);
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }
}

// ticket office의 자율권을 찾아 온다. 밖에서 돈을 막집어 넣게 하지 말자.
// 그러나, ticket office에 audience 라는 새로운 의존성이 추가 되었다.
// 트레이드 오프를 고민할 시점이 왔다.
class TicketOffice {
  private amount: number;
  private tickets: Ticket[] = [];

  public getTicket(): Ticket {
    return this.tickets.splice(0, 1);
  }

  constructor(amount: number, tickets: Ticket[]) {
    this.amount = amount;
    this.tickets = tickets;
  }

  public minusAmount(amount: number): void {
    this.amount -= amount;
  }

  public plusAmount(amount: number): void {
    this.amount += amount;
  }

  public sellTicketTo(audience: Audience): void {
    this.plusAmount(audience.buy(ticket));
  }
}
