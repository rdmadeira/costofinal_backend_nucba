import { CustomError } from './CustomError.js';

export class BadRequestError extends CustomError {
  constructor(message: string, field?: string) {
    super(message);
    this.field = field;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  field?: string | undefined;
  statusCode: number = 400;

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
        field: this.field,
      },
    ];
  }
}
