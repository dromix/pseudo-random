import { default as bunyan, default as Logger, LogLevel } from 'bunyan';
import RotatingFileStream from 'bunyan-rotating-file-stream';
import fs from 'fs';
import path from 'path';

class LoggerService {
  private logDirectory: string;
  private logFile: string;

  constructor(logFileName = 'logs.log') {
    this.logDirectory = path.join(process.env.LOG_DIR || 'logs');
    this.logFile = `${this.logDirectory}${logFileName}`;
  }

  initializeLogger(): Logger {
    this.initializeLogFile();

    const level = (process.env.NODE_LOGGING_LEVEL || 'info') as LogLevel;

    return bunyan.createLogger({
      name: 'logger',
      streams: [
        {
          level,
          stream: process.stdout,
        },
        {
          stream: new RotatingFileStream({
            path: this.logFile,
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
  }

  private initializeLogFile(): void {
    console.log(this.logDirectory, this.logFile);
    if (!fs.existsSync(this.logDirectory)) {
      fs.mkdirSync(this.logDirectory, { recursive: true });
    }

    fs.appendFile(this.logFile, '', (error) => {
      if (error) {
        throw error;
      }

      console.log(`File ${this.logFile} is initialized`);
    });
  }
}

export const logger = new LoggerService().initializeLogger();
