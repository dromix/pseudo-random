import express from 'express';
import router from '../controller';

const app = express();

app.use(router);

module.exports = app;
