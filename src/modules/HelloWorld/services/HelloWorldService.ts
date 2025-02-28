import { IHelloWorld } from "../interfaces/IHelloWorld";

export class HelloWorldService implements IHelloWorld {
  execute(): string {
    return "Hello World";
  }
  create(): string {
    return 'Hello World Created';
  }

}
