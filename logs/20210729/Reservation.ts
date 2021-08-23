class Reservation {
  constructor(
    private customer: Customer,
    private screening: Screening,
    private fee: Money,
    private audienceCount: number
  ) {}
}
