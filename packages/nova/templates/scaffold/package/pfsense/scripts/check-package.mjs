import { access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { semanticVersionPattern } from './regex.mjs';

/**
 * Check Package - Workspace Directory.
 *
 * Resolves the generated pfSense package workspace from this script file.
 * Every structural check uses this stable absolute directory as its base.
 *
 * @since 0.0.0
 */
const workspaceDirectory = resolve(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Check Package - Required Files.
 *
 * Lists every source artifact needed to stage and publish the pfSense package.
 * A missing entry fails validation before a release archive is attempted.
 *
 * @since 0.0.0
 */
const requiredFiles = [
  'package.json',
  'port/Makefile.template',
  'port/pkg-descr',
  'port/pkg-plist',
  'port/files/pkg-deinstall.in',
  'port/files/pkg-install.in',
  'port/files/usr/local/pkg/[__WORKSPACE_NAME__].inc',
  'port/files/usr/local/pkg/[__WORKSPACE_NAME__].xml',
  'port/files/usr/local/sbin/[__WORKSPACE_NAME__]',
  'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/info.xml',
];

await Promise.all(requiredFiles.map(async (requiredFile) => {
  await access(join(workspaceDirectory, requiredFile));

  return;
}));

/**
 * Check Package - package.json Raw.
 *
 * Reads the workspace manifest before its release version is validated.
 * The raw value remains separate from the parsed object for clear diagnostics.
 *
 * @since 0.0.0
 */
const packageJsonRaw = await readFile(join(workspaceDirectory, 'package.json'), 'utf-8');

/**
 * Check Package - package.json.
 *
 * Parses the workspace manifest used to stage the FreeBSD port version.
 * Validation below rejects missing and malformed release values.
 *
 * @since 0.0.0
 */
const packageJson = JSON.parse(packageJsonRaw);

/**
 * Check Package - Version.
 *
 * Selects the manifest version embedded into the staged FreeBSD port.
 * Semantic-version validation keeps generated release metadata predictable.
 *
 * @since 0.0.0
 */
const version = packageJson['version'];

if (typeof version !== 'string' || semanticVersionPattern.test(version) === false) {
  throw new Error('package.json must contain a semantic version that can be staged as a FreeBSD port version.');
}

/**
 * Check Package - Makefile Template.
 *
 * Reads the port Makefile template so its Nova version token can be checked.
 * The staging command replaces this token with the validated package version.
 *
 * @since 0.0.0
 */
const makefileTemplate = await readFile(join(workspaceDirectory, 'port', 'Makefile.template'), 'utf-8');

if (makefileTemplate.includes('%%NOVA_PORTVERSION%%') === false) {
  throw new Error('port/Makefile.template must retain the %%NOVA_PORTVERSION%% build placeholder.');
}

process.stdout.write('pfSense package sources are structurally valid.\n');
