import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import {
  applyScaffoldVersionAudit,
  auditScaffoldVersionCatalog,
  readScaffoldVersionCatalog,
  relativeCatalogPath,
  writeScaffoldVersionCatalog,
} from './lib/scaffold-versions.mjs';

/**
 * Scaffold Versions - Print Help.
 *
 * Documents the repository-only audit and update modes without requiring a
 * network request.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
function printHelp() {
  process.stdout.write([
    'Usage: npm run scaffold-versions -- [options]',
    '',
    'Audit Nova\'s bundled scaffold dependency and platform snapshot.',
    '',
    'Options:',
    '  -c, --check          Exit with an error when updates are available',
    '  -w, --write          Write stable update candidates to the catalog',
    '  -g, --group <group>  Limit the audit to one catalog group',
    '  -v, --verbose        List manual policy entries in the report',
    '  -h, --help           Show this help text',
    '',
  ].join('\n'));

  return;
}

/**
 * Scaffold Versions - Run.
 *
 * Audits authoritative upstream sources, reports stable candidates, and only
 * mutates the checked-in snapshot when the maintainer explicitly selects
 * write mode.
 *
 * @returns {Promise<void>}
 *
 * @since 0.0.0
 */
async function run() {
  const parsedArguments = parseArgs({
    allowPositionals: false,
    options: {
      check: {
        short: 'c',
        type: 'boolean',
      },
      group: {
        short: 'g',
        type: 'string',
      },
      help: {
        short: 'h',
        type: 'boolean',
      },
      verbose: {
        short: 'v',
        type: 'boolean',
      },
      write: {
        short: 'w',
        type: 'boolean',
      },
    },
    strict: true,
  });

  if (parsedArguments.values['help'] === true) {
    printHelp();

    return;
  }

  if (parsedArguments.values['check'] === true && parsedArguments.values['write'] === true) {
    throw new Error('Choose either --check or --write, not both.');
  }

  const repositoryRoot = resolve(fileURLToPath(import.meta.url), '..', '..');
  const catalogPath = resolve(repositoryRoot, 'packages/nova/scaffold-versions.json');
  const androidTemplateDirectory = resolve(repositoryRoot, 'packages/nova/templates/scaffold-options/app/android-native');
  const catalog = await readScaffoldVersionCatalog(catalogPath);
  const audit = await auditScaffoldVersionCatalog(catalog, {
    group: parsedArguments.values['group'],
  });

  if (audit['results'].length === 0) {
    throw new Error(`The scaffold version catalog does not contain group "${parsedArguments.values['group']}".`);
  }

  process.stdout.write(`Scaffold version catalog: ${relativeCatalogPath(repositoryRoot, catalogPath)}\n`);
  process.stdout.write(`Unchanged: ${audit['results'].length - audit['updates'].length - audit['manual'].length} · Updates: ${audit['updates'].length} · Manual policies: ${audit['manual'].length}\n`);

  for (const update of audit['updates']) {
    process.stdout.write(`UPDATE ${update['key']} (${update['group']}): ${update['current']} -> ${update['candidate']}\n`);
  }

  if (parsedArguments.values['verbose'] === true) {
    for (const manual of audit['manual']) {
      process.stdout.write(`MANUAL ${manual['key']} (${manual['group']}): ${manual['current']}\n`);
    }
  }

  if (audit['updates'].length === 0) {
    process.stdout.write('Scaffold version snapshot is current.\n');

    return;
  }

  if (parsedArguments.values['write'] === true) {
    const updatedCatalog = applyScaffoldVersionAudit(catalog, audit);

    await writeScaffoldVersionCatalog({
      androidTemplateDirectory,
      audit,
      catalog: updatedCatalog,
      catalogPath,
    });

    process.stdout.write(`Updated ${audit['updates'].length} catalog value(s). Run the full scaffold check before merging.\n`);

    return;
  }

  if (parsedArguments.values['check'] === true) {
    process.exitCode = 1;
  }

  return;
}

try {
  await run();
} catch (error) {
  const errorMessage = (error instanceof Error) ? error.message : String(error);

  process.stderr.write(`${errorMessage}\n`);
  process.exitCode = 1;
}
