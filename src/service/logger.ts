import bunyan, { LogLevel } from 'bunyan';
import path from 'path';

const level = (process.env.NODE_LOGGING_LEVEL || 'info') as LogLevel;

const log = bunyan.createLogger({
  name: 'logger',
  streams: [
    {
      level,
      stream: process.stdout,
    },
    {
      level,
      path: path.resolve(__dirname, '../logs/logs.log'),
    },
  ],
});

export { log };
