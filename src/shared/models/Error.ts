export class AppError {
  constructor(public status: number = 500, public message: string = "") {}
}
