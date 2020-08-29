// @ts-check
export class HttpError extends Error {
  /**
   * @param {string} message
   * @param {number} code
   */
  constructor(message, code) {
    super();
    this.message = message;
    this.code = code;
  }
}
