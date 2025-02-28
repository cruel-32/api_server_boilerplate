import { Request, Response } from "express";
import { IHelloWorld } from "../interfaces/IHelloWorld";
import { HttpException } from "@/logger";

export class HelloWorldController {
  private helloWorldService: IHelloWorld;

  constructor(helloWorldService: IHelloWorld) {
    this.helloWorldService = helloWorldService;
  }

  sendHelloWorld(req: Request, res: Response): void {
    const message: string = this.helloWorldService.execute();
    res.json({ message });
  }

  postHelloWorld(req: Request, res: Response): void {
    const message: string = this.helloWorldService.create();

    if (req.body.error) {
      throw new HttpException(500, '테스트용 에러 코드');
    }

    res.json({ message });
  }
}
