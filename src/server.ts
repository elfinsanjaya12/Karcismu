import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import { config as dotenv } from 'dotenv';
import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';

class App {
  public app: Application;

  constructor() {
    this.app = express();
    dotenv();
    this.plugins();
    this.routes();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(morgan('dev'));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use(cors());
  }

  protected routes(): void {
    // endpoint method get
    this.app.get('/', (req: Request, res: Response) => {
      return res.status(200).json({
        doscapi: '/dosc-api',
        message: 'Welcome Api Karcis Mu',
      });
    });
  }
}

const app = new App().app;
app.listen(process.env.PORT || 4000, () => {
  // tslint:disable-next-line: no-console
  console.log(`Server Running di port ${process.env.PORT || 4000}`);
});

export default new App().app;
