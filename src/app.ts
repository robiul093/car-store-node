import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import carRouter from './module/car/car.router';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

app.use('/api', carRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('This is care store!');
});


export default app;
