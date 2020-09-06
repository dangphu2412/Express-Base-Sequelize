export class Random {
  randomNumber(start, end) {
    return Math.floor(Math.random() * (end - start)) + start;
  }

  randomDate(start, end) {
    return new Date(start.getTime() + Math.random()
    * (end.getTime() - start.getTime()))
    .toISOString();
  }
}
