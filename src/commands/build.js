const createLogger = require('../logger');
const logger = createLogger('build');

module.exports = function build(config) {
  logger.highlight('Building the app');
  logger.debug('Using config', config);
  setTimeout(() => {
    logger.log('Build successful!');
  }, 1000);
};