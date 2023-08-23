export class AppError extends Error {
  timestamp: number;

  constructor(public status: number, public message: string) {
    super(message);
    this.status = status;
    this.message = message;
  }
}
