import { dirname, resolve } from 'path';
import { parseArgs } from 'util';

import ts from 'typescript';

// Parse command-line arguments.
const { values } = parseArgs({
  options: {
    project: {
      type: 'string', short: 'p',
    },
  },
  strict: false,
});

const cwd = process.cwd();
const project = values.project;

// Resolve the tsconfig.json path.
let configPath;

if (project !== undefined) {
  const resolved = resolve(cwd, project);

  configPath = (ts.sys.fileExists(resolved) === true) ? resolved : undefined;
} else {
  configPath = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json');
}

if (configPath === undefined) {
  console.error('No tsconfig.json found. Use --project to specify a path.');
  process.exitCode = 1;
  process.exit();
}

// Parse the tsconfig.json and create a program.
const configResult = ts.readConfigFile(configPath, ts.sys.readFile);
const config = configResult.config;
const configDirectory = dirname(configPath);
const parsed = ts.parseJsonConfigFileContent(config, ts.sys, configDirectory);
const program = ts.createProgram(parsed.fileNames, parsed.options);

// Get all diagnostics and filter to project-owned files only.
const diagnostics = ts.getPreEmitDiagnostics(program);
const filtered = diagnostics.filter((diagnostic) => {
  const fileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : '';

  return fileName.startsWith(cwd) && !fileName.includes('node_modules');
});

// Print filtered diagnostics.
const fileSet = new Set();

for (const diagnostic of filtered) {
  const fileName = (diagnostic.file !== undefined) ? diagnostic.file.fileName : 'unknown';
  const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');

  fileSet.add(fileName);

  if (diagnostic.file !== undefined && diagnostic.start !== undefined) {
    const position = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const line = position.line;
    const character = position.character;

    console.error(`${fileName}:${line + 1}:${character + 1} - ${message}`);
  } else {
    console.error(message);
  }
}

if (filtered.length > 0) {
  console.log(`Found ${filtered.length} error(s) in ${fileSet.size} file(s).`);
  process.exitCode = 1;
} else {
  console.log('No type errors found.');
}
