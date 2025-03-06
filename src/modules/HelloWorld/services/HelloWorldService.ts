import { IHelloWorld } from "@/modules/HelloWorld/interfaces/HelloWorld";

export class HelloWorldService implements IHelloWorld {
  execute(): string {
    return "Hello World";
  }
  getPost(num: number) {
    return 'get post'
  }
}
