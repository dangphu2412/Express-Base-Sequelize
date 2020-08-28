// eslint-disable-next-line import/prefer-default-export
export class HttpError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
}
