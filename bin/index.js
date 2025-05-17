#!/usr/bin/env node
const arg = require('arg');
const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');
const build = require('../src/commands/build');
const debug = require('debug')('bin');
const { version } = require('../package.json');

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    '--help': Boolean,
    '--version': Boolean,
    '--config': String,
  });

  debug('Received args', args);

  if (args['--help']) {
    usage();
    process.exit(0);
  }

  if (args['--version']) {
    console.log(`v${version}`);
    process.exit(0);
  }

  if (args['--start']) {
    const config = getConfig(args['--config']);
    start(config);
  }

  if (args['--build']) {
    const config = getConfig(args['--config']);
    build(config);
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('Usage: tool [OPTIONS]')}

  ${chalk.greenBright('--start')}         Start the app
  ${chalk.greenBright('--build')}         Build the app
  ${chalk.greenBright('--help')}          Show help
  ${chalk.greenBright('--version')}       Show version
  ${chalk.greenBright('--config <path>')} Use custom config file

  ${chalk.white('Example:')}
  tool --start
  tool --build --config ./tool.config.js
  `);
}