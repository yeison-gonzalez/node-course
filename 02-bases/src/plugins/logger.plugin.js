const { createLogger, transports, format } = require('winston')
const { combine, timestamp, json, simple } = format

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        json(),
    ),
    transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    // - Write all logs with importance level of `info` or less to `combined.log`
    //
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
    ],
});

logger.add(new transports.Console({
    format: simple(),
}));

module.exports = function buildLogger(service) {
    return {
        log: (message) => {
            logger.log('info', { message, service });
        },
        error: (message) => {
            logger.error('error', { message, service });
        },
    }
}