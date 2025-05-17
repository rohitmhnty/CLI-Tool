#!/usr/bin/env node
const arg = require('arg');
const chalk = require('chalk');
const path = require('path');
const debug = require('debug')('bin');

const getConfig = require(path.join(__dirname, '../src/config/config-mgr'));
const start = require(path.join(__dirname, '../src/commands/start'));
const tree = require(path.join(__dirname, '../src/commands/tree'));
const init = require(path.join(__dirname, '../src/commands/init'));

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    '--tree': String,
    '--help': Boolean,
    '--version': Boolean,
    '--init': String, // 👈 Accepts a string value for project name
  });

  debug('Received args', args);

  if (args['--start']) {
    const config = getConfig();
    start(config);
  } else if (args['--init']) {
    init(args['--init']); // 👈 Calls init with project name
  } else if (args['--tree']) {
    tree({ projectName: args['--tree'] });
  } else if (args['--help']) {
    usage();
  } else if (args['--version']) {
    const pkg = require(path.join(__dirname, '../package.json'));
    console.log(chalk.blueBright(pkg.version));
  } else {
    usage();
  }
} catch (e) {
  console.log(chalk.red('Error:'), chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--init')} <name>     Initialize React project
  ${chalk.greenBright('--start')}           Start the app
  ${chalk.greenBright('--build')}           Build the app
  ${chalk.greenBright('--tree')} <name>     Show directory tree
  ${chalk.greenBright('--help')}            Show help
  ${chalk.greenBright('--version')}         Show version`);
}
