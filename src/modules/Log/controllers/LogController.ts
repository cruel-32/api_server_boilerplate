import { Request, Response } from "express";
import { ILog, sendToESBody } from "@/modules/Log/interfaces/Log";
import dayjs from 'dayjs';
import { HttpException } from '@/modules/HttpException';

export class LogController {
  private logService: ILog;

  constructor(logService: ILog) {
    this.logService = logService;
  }

  async sendToES(req: Request, res: Response): Promise<any> {
    try {
      const { date } = req.body;
      const dateStrFormat = dayjs(date).format('YYYY-MM-DD');
      const file: File = await this.logService.createJSON(dateStrFormat);
      const result = await this.logService.sendToES({
        date: dateStrFormat,
        file,
      });
      res.json(result);
    } catch(err) {
      throw new HttpException(500, `${err}`, res);
    }
  }

}
