import { config } from 'dotenv';
import { resolve } from 'path';
import express from 'express';
import swaggerUi from 'swagger-ui-express';
import routes from './routes';
import swaggerDocument from './swagger-output.json';

// 설정파일 읽기
const root: string = `${process.cwd()}`;
switch (process.env.NODE_ENV) {
  case 'development':
    config({
      path: resolve(root + '.env.development'),
    });
    break;

  case 'production':
    config({
      path: resolve(root + '.env.production'),
    });
    break;

  default:
    throw new Error(`NODE_ENV: ${process.env.NODE_ENV}를 불러올 수 없습니다.`);
}

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(routes);

app.listen(PORT, () => console.log(`Running server: http://localhost:${PORT}. Swagger: http://localhost:${PORT}/docs`));
