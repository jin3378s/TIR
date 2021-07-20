class Audience {
  private bag: Bag;

  public getBag(): Bag {
    return this.bag;
  }

  constructor(bag: Bag) {
    this.bag = bag;
  }
}

// audience 에게 자유도를 부여 한다.
class Audience {
  private bag: Bag;

  public getBag(): Bag {
    return this.bag;
  }

  constructor(bag: Bag) {
    this.bag = bag;
  }

  public buy(ticket: Ticket) {
    if (this.bag.hasInvitation()) {
      this.bag.setTicket(ticket);
    } else {
      this.bag.minusAmount(ticket.getFee());
      this.bag.setTicket(ticket);
    }
  }
}

// audience 는 이제 bag에 bag제어 역할을 위임 한다.
class Audience {
  private bag: Bag;

  public getBag(): Bag {
    return this.bag;
  }

  constructor(bag: Bag) {
    this.bag = bag;
  }

  public buy(ticket: Ticket): number {
    return this.bag.hold(ticket);
  }
}
