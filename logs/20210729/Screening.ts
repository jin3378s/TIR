class Screening {
  public reserve(customer: Customer, audienceCount: number): Reservation {
    return new Reservation(
      customer,
      this,
      this.calculateFee(audienceCount),
      audienceCount
    );
  }

  private calculateFee(audienceCount: number) {
    return movie.calculateMovieFee(this).times(audienceCount);
  }
}
