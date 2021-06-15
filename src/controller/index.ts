import express from 'express';
import { statRouter } from './stat';

const router = express.Router();

router.use('/stat', statRouter);

export { router };
