export class AppError extends Error {
  status: number;
  message: string;
  timestamp: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
    this.message = message;
    this.timestamp = new Date().getTime();
  }
}
