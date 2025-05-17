const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

function printTree(dir, prefix = '', level = 0, maxLevel = 3) {
  if (level > maxLevel) return;

  if (!fs.existsSync(dir)) {
    console.log(chalk.red(`Directory does not exist: ${dir}`));
    process.exit(1);
  }

  const entries = fs.readdirSync(dir, { withFileTypes: true })
    .filter(entry => !entry.name.endsWith('.DS_Store')) // Optional: ignore macOS junk
    .sort((a, b) => a.name.localeCompare(b.name));

  entries.forEach((entry, index) => {
    const isLast = index === entries.length - 1;
    const pointer = isLast ? '└── ' : '├── ';
    const entryPath = path.join(dir, entry.name);
    const isSpecialFolder =
      entry.name === 'node_modules' ||
      entry.name === 'dist' ||
      entry.name.startsWith('.');

    // Print only name for special folders (no recursion)
    if (entry.isDirectory() && isSpecialFolder) {
      console.log(prefix + pointer + chalk.blue(entry.name));
      return;
    }

    // Print normal folders and files
    if (entry.isDirectory()) {
      console.log(prefix + pointer + chalk.blue(entry.name));
      const newPrefix = prefix + (isLast ? '    ' : '│   ');
      printTree(entryPath, newPrefix, level + 1, maxLevel);
    } else {
      console.log(prefix + pointer + chalk.gray(entry.name));
    }
  });
}

module.exports = function tree({ projectName }) {
  if (!projectName) {
    console.log(chalk.red('❌ Please provide a project name with --tree'));
    process.exit(1);
  }

  const projectPath = path.resolve(process.cwd(), '..', projectName);

  if (!fs.existsSync(projectPath)) {
    console.log(chalk.red(`❌ Project folder not found: ${projectPath}`));
    process.exit(1);
  }

  console.log(chalk.green(`\n🗂 Directory tree for project: ${projectName}\n`));
  printTree(projectPath);
};
