export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract field?: string;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, new.target.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[]; // devuelve array de objetos con esta estructura.
}
