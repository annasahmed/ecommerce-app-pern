const morgan = require('morgan');
const config = require('./config');
const logger = require('./logger');

morgan.token('message', (_req, res) => {
	// console.log('res.locals==>', res.locals);
	// console.log('res.locals==>', JSON.stringify(res.locals));
	// console.log('res.method==>', res.method);
	// console.log('res.url==>', res.url);
	// console.log('res.status==>', res.status);
	// console.log('res.response-time==>', res['response-time)']);
	// console.log('res.error==>', res.error);
	// console.log('res.error==>', res.body);
	// console.log('res.error==>', res.statusMessage);
	// console.log('res==>', res);
	return res.locals.errorMessage || '';
});

const getIpFormat = () =>
	config.env === 'production' ? ':remote-addr - ' : '';
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;

const successHandler = morgan(successResponseFormat, {
	skip: (req, res) => res.statusCode >= 400,
	stream: { write: (message) => logger.info('success==>' + message.trim()) },
});

const errorHandler = morgan(errorResponseFormat, {
	skip: (req, res) => res.statusCode < 400,
	stream: { write: (message) => logger.error('error==>' + message.trim()) },
});

module.exports = {
	successHandler,
	errorHandler,
};
