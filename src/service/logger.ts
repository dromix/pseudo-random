import bunyan, { LogLevel } from 'bunyan';
import RotatingFileStream from 'bunyan-rotating-file-stream';
import fs from 'fs';

initializeLogFile();

const level = (process.env.NODE_LOGGING_LEVEL || 'info') as LogLevel;

const log = bunyan.createLogger({
  name: 'logger',
  streams: [
    {
      level,
      stream: process.stdout,
    },
    {
      stream: new RotatingFileStream({
        path: '/app/dist/logs/test.log',
        period: '1d',
        totalFiles: 10,
        rotateExisting: true,
        threshold: '10m',
        totalSize: '20m',
        gzip: true,
      }),
    },
  ],
});

function initializeLogFile() {
  // Heroku doesn't provide an opportunity to store logs in /var/log/, by this
  // reason was decided to put logs into dist/logs

  const dir = '/app/dist/logs/';

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  fs.appendFile('/app/dist/logs/test.log', '', (error) => {
    if (error) {
      throw error;
    }

    console.log('Log file is initialized');
  });
}

export { log };
