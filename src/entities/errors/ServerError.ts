import { CustomError } from './CustomError.js';

export class ServerError extends CustomError {
  constructor(field?: string) {
    super('Internal Service Server Error!');
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  field?: string | undefined;
  statusCode: number = 500;

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
        field: this.field,
      },
    ];
  }
}
