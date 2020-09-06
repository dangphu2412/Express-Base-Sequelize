import winston from 'winston';
import path from 'path';

const options = {
  file: {
    level: 'info',
    format: winston.format.simple(),
    filename: path.join(__dirname, './mylogs/app.log'),
    json: true,
    colorize: false,
  },
  console: {
    level: 'verbose',
    format: winston.format.combine(
      winston.format.simple(),
      winston.format.splat(),
      // Time format
      winston.format.timestamp({
        format: 'DD-MM-YYYY HH:mm:ss',
      }),
      // Color format
      winston.format.colorize(),
      // Setting log format
      winston.format.printf((log) => {
        if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
        return `[${log.timestamp}] [${log.level}] ${log.message}`;
      }),
    ),
    json: false,
    colorize: true,
  },
};

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
});
