export class HttpException extends Error {
  readonly response: Response;

  constructor(response: Response) {
    super();
    this.name = this.constructor.name;
    this.response = response;
  }
}
