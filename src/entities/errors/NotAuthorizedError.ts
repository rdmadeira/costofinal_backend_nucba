import { CustomError } from './CustomError.js';

export class NotAuthorizedError extends CustomError {
  constructor() {
    super('Not Authorized!');

    Object.setPrototypeOf(this, new.target.prototype);
  }

  field?: string | undefined;
  statusCode: number = 401;

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
        field: this.field,
      },
    ];
  }
}
