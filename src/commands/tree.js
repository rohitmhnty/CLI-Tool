const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function printTree(dir, prefix = '', level = 0, maxLevel = 3) {
  if (level > maxLevel) return;

  if (!fs.existsSync(dir)) {
    console.log(chalk.red(`Directory does not exist: ${dir}`));
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    const entryPath = path.join(dir, entry.name);

    // Check for special folders
    const isSpecialFolder = (
      entry.name === 'node_modules' ||
      entry.name === 'dist' ||
      entry.name.startsWith('.')
    );

    console.log(prefix + pointer + entry.name);

    if (
      entry.isDirectory() &&
      !isSpecialFolder &&
      level < maxLevel
    ) {
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(entryPath, newPrefix, level + 1, maxLevel);
    }
  });
}

module.exports = function tree({ projectName }) {
  if (!projectName) {
    console.log(chalk.red('Please provide a project name for --tree'));
    process.exit(1);
  }

  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  const projectPath = path.resolve(parentDir, projectName);

  console.log(chalk.green(`Directory tree for project: ${projectPath}`));
  printTree(projectPath);
};
