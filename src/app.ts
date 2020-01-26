import express from 'express';

import { appConfig } from './config';

const { PORT } = appConfig;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

export default app;
