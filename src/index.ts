import { Request, Response, NextFunction } from 'express';
import express from 'express';

import mongoose from 'mongoose';

import router from './routes/';

const { PORT, MONGO_URI } = process.env;

const app = express();
app.use(express.urlencoded());

app.use(express.json());

app.use('/api', router);

app.use('/', (req, res) => {
  res.send('hello world');
});

app.use('*', (_req: Request, res: Response) => {
  return res.status(404).json({
    message: 'Not found',
  });
});

async function main() {
  try {
    await mongoose.connect(MONGO_URI as string);
    console.log('conected to mongoDB');

    app.listen(PORT, () => {
      console.log('server started on port ', PORT);
    });
  } catch (error) {
    console.error(error);
  }
}
main();
