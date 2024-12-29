import express, { Application, Request, Response } from 'express';
import userRouter from './module/user/user.router';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import notFound from './app/middlewares/notFound';

const app: Application = express();

app.use(express.json());

app.use('/api', userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running 🚀🚀');
});

app.use(globalErrorHandler);

//Not found route
app.use(notFound);

export default app;
