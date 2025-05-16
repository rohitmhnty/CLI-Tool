const chalk = require('chalk');
const { cosmiconfigSync } = require('cosmiconfig');
const schema = require('./schema.json');
const betterAjvErrors = require('better-ajv-errors').default;
const Ajv = require('ajv');
const debug = require('debug')('config:mgr');

const ajv = new Ajv({ allErrors: true, strict: true });
const configLoader = cosmiconfigSync('tool');

module.exports = function getConfig() {
  const result = configLoader.search(process.cwd());

  if (!result) {
    console.log(chalk.yellow('Could not find configuration, using default'));
    return { port: 1234 };
  }

  const validate = ajv.compile(schema);
  const isValid = validate(result.config);

  if (!isValid) {
    console.log(chalk.red('Invalid configuration was supplied\n'));
    const output = betterAjvErrors(schema, result.config, validate.errors, {
      format: 'cli',
    });
    console.log(output);
    process.exit(1);
  }

  debug('Found configuration', result.config);
  return result.config;
};
