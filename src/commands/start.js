const createLogger = require('../logger');
const logger = createLogger('start');

module.exports = function start(config) {
  logger.highlight('Starting the app');
  logger.debug('Using config', config);
};
