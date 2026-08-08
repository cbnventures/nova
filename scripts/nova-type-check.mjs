import { dirname, resolve } from 'node:path';
import { parseArgs } from 'node:util';

import ts from 'typescript';

/**
 * Nova Type Check - Nova Type Check.
 *
 * Replicates the `nova utility type-check` command because nova's own bin may
 * not be built when nova builds or checks itself, resolving the tsconfig and
 * printing project-owned diagnostics through process.stderr and process.stdout.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function novaTypeCheck() {
  // Parse command-line arguments.
  const parsedArgs = parseArgs({
    options: {
      project: {
        type: 'string',
        short: 'p',
      },
    },
    strict: false,
  });
  const values = parsedArgs.values;
  const cwd = process.cwd();
  const project = values['project'];

  // Resolve the tsconfig.json path.
  let configPath = undefined;

  if (typeof project === 'string') {
    const resolved = resolve(cwd, project);

    configPath = (ts.sys.fileExists(resolved) === true) ? resolved : undefined;
  } else if (project === undefined) {
    configPath = ts.findConfigFile(cwd, ts.sys.fileExists, 'tsconfig.json');
  }

  if (configPath === undefined) {
    process.stderr.write('No tsconfig.json found. Use --project to specify a path.\n');
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

    return fileName.startsWith(cwd) === true && fileName.includes('node_modules') === false;
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

      process.stderr.write(`${fileName}:${line + 1}:${character + 1} - ${message}\n`);
    } else {
      process.stderr.write(`${message}\n`);
    }
  }

  if (filtered.length > 0) {
    process.stdout.write(`Found ${filtered.length} error(s) in ${fileSet.size} file(s).\n`);
    process.exitCode = 1;
  } else {
    process.stdout.write('No type errors found.\n');
  }

  return;
}

novaTypeCheck();
