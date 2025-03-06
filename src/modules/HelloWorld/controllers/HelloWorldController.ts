import { Request, Response } from "express";
import { IHelloWorld, createPostQueries } from "@/modules/HelloWorld/interfaces/HelloWorld";
import { HttpException } from '@/modules/HttpException';

export class HelloWorldController {
  private helloWorldService: IHelloWorld;

  constructor(helloWorldService: IHelloWorld) {
    this.helloWorldService = helloWorldService;
  }

  sendHelloWorld(req: Request, res: Response): void {
    const message: string = this.helloWorldService.execute();
    res.json({ message });
  }

  async postHelloWorld(req: Request, res: Response) {
    if (req.body.error) {
      throw new HttpException(500, '테스트용 에러 코드', res);
    } else {
      const { num } = req.body;
      const post = await this.helloWorldService.getPost(num);
      
      console.log('post :::::: ', post);

    }
  }
}
