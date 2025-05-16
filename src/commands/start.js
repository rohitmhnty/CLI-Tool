const chalk = require('chalk');
const debug = require('debug')('commands:start');

module.exports = function start(config) {
  console.log(chalk.bgCyanBright('  Starting the app  '));
  debug('received configuration', config);
};
