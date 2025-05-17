const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const readline = require('readline');
const { exec } = require('child_process');

function createReactApp(projectName) {
  const currentDir = process.cwd();
  const parentDir = path.resolve(currentDir, '..');
  const projectPath = path.resolve(parentDir, projectName);

  console.log(chalk.blue(`Creating project at: ${projectPath}`));

  if (fs.existsSync(projectPath)) {
    console.log(chalk.red(`Folder "${projectName}" already exists in ${parentDir}.`));
    process.exit(1);
  }

  fs.mkdirSync(projectPath);

  // package.json
  const packageJson = {
    name: projectName,
    version: "1.0.0",
    private: true,
    scripts: {
      start: "react-scripts start",
      build: "react-scripts build",
      test: "react-scripts test",
      eject: "react-scripts eject"
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
      "react-scripts": "5.0.1"
    }
  };

  fs.writeFileSync(
    path.join(projectPath, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );

  // src folder + files
  fs.mkdirSync(path.join(projectPath, 'src'));
  fs.writeFileSync(
    path.join(projectPath, 'src', 'index.js'),
    `import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
`
  );

  fs.writeFileSync(
    path.join(projectPath, 'src', 'App.js'),
    `import React from 'react';

export default function App() {
  return <div>Hello, React Scaffold!</div>;
}
`
  );

  // .gitignore
  fs.writeFileSync(
    path.join(projectPath, '.gitignore'),
    `node_modules
build
`
  );

  console.log(chalk.green(`React app scaffold created in ${projectPath}`));

  // Prompt for npm install
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.yellow('Do you want to install dependencies now? (y/n): '), (answer) => {
    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
      console.log(chalk.yellow('Installing dependencies... This may take a few minutes.'));
      exec('npm install', { cwd: projectPath }, (error, stdout, stderr) => {
        if (error) {
          console.log(chalk.red(`Error during npm install: ${error.message}`));
        } else {
          console.log(chalk.green('Dependencies installed successfully!'));
        }
        rl.close();
      });
    } else {
      console.log(chalk.blue('You can install dependencies later by running "npm install" inside the project folder.'));
      rl.close();
    }
  });
}

module.exports = function init({ projectName }) {
  if (!projectName) {
    console.log(chalk.red('Please provide a project folder name.'));
    process.exit(1);
  }
  createReactApp(projectName);
};
