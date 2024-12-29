import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';

const app: Application = express();

app.use(express.json());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 🚀🚀');
});

app.use(globalErrorHandler);

export default app;
