import express from 'express';
import { IProbabilityRequest } from '../interface';
import { log } from '../service/logger';
import { StatisticGenerator } from '../service/statistic-generator';

const statRouter = express.Router();
statRouter.get('/', (req: IProbabilityRequest, res) => {
  const { probability, value, iterations } = req.query;
  log.info('query', { ...req.query });

  // TODO Extract logic to reposity if DB appears
  const statGenerator = new StatisticGenerator(probability, value, iterations);
  const statistics = statGenerator.generateProbabilityStat();

  log.info('response', statistics);
  res.send(statistics);
});

export { statRouter };
