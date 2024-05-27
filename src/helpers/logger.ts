interface Logger {
  log(...message: any[]): void;
  info(...message: any[]): void;
  warn(...message: any[]): void;
  error(...message: any[]): void;
}

enum Level {
  LOG = 'LOG',
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const COLORS = {
  reset: '\x1b[0m',
  log: '\x1b[35m', // Purple
  info: '\x1b[36m', // Cyan
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
};

const log = (level: Level, ...message: any[]) => {
  const timestamp = new Date().toISOString();
  const color = COLORS[level.toLowerCase() as keyof typeof COLORS] || COLORS.reset;
  console.log(color + `[${timestamp}] ${level}: ${message.join(', ')}` + COLORS.reset);
};

const logger: Logger = {
  log: (...message: any[]) => log(Level.LOG, ...message),
  info: (...message: any[]) => log(Level.INFO, ...message),
  warn: (...message: any[]) => log(Level.WARN, ...message),
  error: (...message: any[]) => log(Level.ERROR, ...message),
};

export default logger;
