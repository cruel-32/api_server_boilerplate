
export interface IHelloWorld {
  execute(): string;
  getPost(num: number): string;
}

export type createPostQueries = {
  error: boolean;
  num: number;
}