import { CustomError } from './CustomError.js';

export class NotFoundError extends CustomError {
  constructor(field?: string) {
    super('bad request error');
    this.field = field;

    Object.setPrototypeOf(this, new.target.prototype);
  }

  field?: string | undefined;
  statusCode: number = 404;

  serializeErrors(): { message: string; field?: string }[] {
    return [
      {
        message: this.message,
        field: this.field,
      },
    ];
  }
}
