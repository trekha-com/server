interface Logger {
  info(message: string): void;
  warn(message: string): void;
  error(message: string): void;
}

enum Level {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
}

const COLORS = {
  reset: '\x1b[0m',
  info: '\x1b[36m', // Cyan
  warn: '\x1b[33m', // Yellow
  error: '\x1b[31m', // Red
};

const log = (message: string, level: Level) => {
  const timestamp = new Date().toISOString();
  const color = COLORS[level.toLowerCase() as keyof typeof COLORS] || COLORS.reset;
  console.log(color + `[${timestamp}] ${level}: ${message}` + COLORS.reset);
};

const logger: Logger = {
  info: (message: string) => log(message, Level.INFO),
  warn: (message: string) => log(message, Level.WARN),
  error: (message: string) => log(message, Level.ERROR),
};

export default logger;
