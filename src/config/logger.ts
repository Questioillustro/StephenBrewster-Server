import winston, {createLogger, format} from 'winston';
const { combine, label, timestamp } = format;

const myFormat = winston.format.printf(({ level, message, label, timestamp }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
    format: combine(label({ label: 'cyoa' }), timestamp(), myFormat),
    transports: [new winston.transports.Console()],
});

export default logger;

