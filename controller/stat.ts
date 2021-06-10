import express from 'express';
import { StatisticGenerator } from '../service/stat-generator-helper';
import { IProbabilityRequest } from '../src/interface';

const statRouter = express.Router();
statRouter.get('/', (req: IProbabilityRequest, res) => {
  const { probability, value, iterations } = req.query;

  // TODO Extract logic to reposity if DB appears
  const statGenerator = new StatisticGenerator(probability, value, iterations);
  const statistics = statGenerator.generateProbabilityStat();

  res.send(statistics);
});

export { statRouter };
