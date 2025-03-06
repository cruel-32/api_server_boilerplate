import fs from 'fs';
import { ILog, sendToESBody } from "@/modules/Log/interfaces/Log";
import { logger } from '@/logger';

export class LogService implements ILog {
  async createJSON(date: string): Promise<any> {
    const file = await fs.readFileSync(`${process.cwd()}/logs/info/${date}.info.log`, 'utf8')

    const tempJSON = {
      title: 'test',
      contents: 'test text'
    }
    logger.info(`tempJSON ::: ${JSON.stringify(tempJSON)}`);

    const json = await fs.writeFileSync(`${process.cwd()}/logs/info/${date}.info.json`, JSON.stringify(tempJSON, null, 2))

    return tempJSON;
  }
  sendToES(params: sendToESBody): boolean {
    console.log('params ::::: ', params);
    return true;
  }
}