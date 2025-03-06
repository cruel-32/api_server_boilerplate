import { Response } from "express";
export class HttpException extends Error {
  public status: number
  public message: string
  constructor(status: number, message: string, res: Response) {
    super(message)
    this.status = status
    this.message = message
    res.status(status);
  }
}