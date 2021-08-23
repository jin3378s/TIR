class Money {
  static ZERO = new Money.wons(0);
  private amount: number;

  static wons(amount: number) {
    return new Money(amount);
  }

  constructor(amount: number) {
    this.amount = amount;
  }

  public plus(money: Money) {
    return new Money(this.amount + money.amount);
  }

  public minus(money: Money) {
    return new Money(this.amount - money.amount);
  }

  public times(times: number) {
    return new Money(this.amount * times);
  }

  public isLessThan(money: Money): boolean {
    return this.amount < money.amount;
  }

  public isGreaterThanOrEqual(money: Moeny): boolean {
    return this.amount >= money.amount;
  }
}
