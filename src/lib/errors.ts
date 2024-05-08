export class DbError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = 'DB_ERROR';
  }
}

export class ResponseError extends Error {
  public msg: string;
  constructor(message: string, public statusCode?:number, public errorType?: string) {
    super(message);
    this.name = 'RESPONSE_ERROR';
    this.statusCode = statusCode;
    this.errorType = errorType;
    this.msg = message;
  }
}