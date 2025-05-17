#!/usr/bin/env node
const arg = require('arg');
const chalk = require('chalk');
const getConfig = require('../src/config/config-mgr');
const start = require('../src/commands/start');
const init = require('../src/commands/init');
const tree = require('../src/commands/tree');
const debug = require('debug')('bin');

try {
  const args = arg({
    '--start': Boolean,
    '--build': Boolean,
    '--init': String,
    '--tree': String,
    '--help': Boolean,
    '--version': Boolean,
  });

  debug('Received args', args);

  if (args['--start']) {
    const config = getConfig();
    start(config);
  } else if (args['--init']) {
    init({ projectName: args['--init'] });
  } else if (args['--tree']) {
    tree({ projectName: args['--tree'] });
  } else if (args['--help']) {
    usage();
  } else if (args['--version']) {
    const pjson = require('../package.json');
    console.log(chalk.green(`Version: ${pjson.version}`));
  } else {
    usage();
  }
} catch (e) {
  console.log(chalk.yellow(e.message));
  console.log();
  usage();
}

function usage() {
  console.log(`${chalk.whiteBright('tool [CMD]')}
  ${chalk.greenBright('--start')}\tStarts the app
  ${chalk.greenBright('--build')}\tBuilds the app
  ${chalk.greenBright('--init <project-name>')}\tInitialize React app in parent directory
  ${chalk.greenBright('--tree <project-name>')}\tShow directory tree of project in parent directory
  ${chalk.greenBright('--help')}\tShow help
  ${chalk.greenBright('--version')}\tShow version`);
}
