
export interface ILog {
  createJSON(date: string): any;
  sendToES(params: sendToESBody): boolean;
}

export type sendToESBody = {
  date: string;
  file: File
}