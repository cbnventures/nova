import { access, readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {
  releaseSigningKeyPattern,
  semanticVersionPattern,
} from './regex.mjs';

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
  'port/files/usr/local/pkg/[__WORKSPACE_NAME__]/FileLock.php',
  'port/files/usr/local/pkg/[__WORKSPACE_NAME__]/PackagePaths.php',
  'port/files/usr/local/pkg/[__WORKSPACE_NAME__]/UpdateManager.php',
  'port/files/usr/local/sbin/[__WORKSPACE_NAME__]',
  'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/info.xml',
  'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/logo.svg',
  'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/release-signing.pub',
  'port/files/usr/local/www/[__WORKSPACE_NAME__]-about.php',
  'tests/updates.php',
];

await Promise.all(requiredFiles.map(async (requiredFile) => {
  await access(join(workspaceDirectory, requiredFile));

  return;
}));

/**
 * Check Package - Release Signing Key File.
 *
 * Identifies the staged trust list that installed packages use for releases.
 * Diagnostics retain this relative name so malformed lines are easy to find.
 *
 * @since UNRELEASED
 */
const releaseSigningKeyFile = 'port/files/usr/local/share/pfSense-pkg-[__WORKSPACE_IDENTIFIER__]/release-signing.pub';

/**
 * Check Package - Release Signing Key Raw.
 *
 * Reads the public-key trust list before comments and blank lines are removed.
 * Keeping the raw text preserves exact source line numbers for diagnostics.
 *
 * @since UNRELEASED
 */
const releaseSigningKeyRaw = await readFile(join(workspaceDirectory, releaseSigningKeyFile), 'utf-8');

/**
 * Check Package - Release Signing Key Lines.
 *
 * Splits the trust list without discarding empty lines or carriage returns.
 * Validation normalizes each entry while retaining its one-based position.
 *
 * @since UNRELEASED
 */
const releaseSigningKeyLines = releaseSigningKeyRaw.split('\n');

for (let releaseSigningKeyIndex = 0; releaseSigningKeyIndex < releaseSigningKeyLines.length; releaseSigningKeyIndex += 1) {
  const releaseSigningKeyRawLine = releaseSigningKeyLines[releaseSigningKeyIndex];

  if (releaseSigningKeyRawLine === undefined) {
    continue;
  }

  const releaseSigningKeyLine = releaseSigningKeyRawLine.replaceAll('\r', '').trim();

  if (releaseSigningKeyLine === '' || releaseSigningKeyLine.startsWith('#') === true) {
    continue;
  }

  if (releaseSigningKeyPattern.test(releaseSigningKeyLine) === false) {
    throw new Error(`${releaseSigningKeyFile} has an invalid release signing key on line ${releaseSigningKeyIndex + 1}.`);
  }
}

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

/**
 * Check Package - Makefile Template Lines.
 *
 * Separates the port recipe so the signing-key install command can be found.
 * The check keeps comments elsewhere from satisfying the installation rule.
 *
 * @since UNRELEASED
 */
const makefileTemplateLines = makefileTemplate.split('\n');

/**
 * Check Package - Makefile Installs Release Signing Key.
 *
 * Confirms one data-install command copies the trust list into the package.
 * This prevents a valid source file from being omitted from installed copies.
 *
 * @since UNRELEASED
 */
const makefileInstallsReleaseSigningKey = makefileTemplateLines.some((makefileTemplateLine) => {
  return makefileTemplateLine.includes('INSTALL_DATA') === true
    && makefileTemplateLine.includes('/release-signing.pub') === true;
});

if (makefileTemplate.includes('%%NOVA_PORTVERSION%%') === false) {
  throw new Error('port/Makefile.template must retain the %%NOVA_PORTVERSION%% build placeholder.');
}

if (makefileTemplate.includes('WWW=\t[__PROJECT_HOMEPAGE__]') === false) {
  throw new Error('port/Makefile.template must publish the configured project homepage.');
}

if (makefileInstallsReleaseSigningKey === false) {
  throw new Error('port/Makefile.template must install release-signing.pub with INSTALL_DATA.');
}

/**
 * Check Package - Package Plist.
 *
 * Reads the installed-file inventory that FreeBSD uses to assemble the package.
 * The signing trust list must remain explicit so package checks can find it.
 *
 * @since UNRELEASED
 */
const packagePlist = await readFile(join(workspaceDirectory, 'port', 'pkg-plist'), 'utf-8');

/**
 * Check Package - Package Plist Lines.
 *
 * Normalizes the inventory for an exact release-signing.pub entry check.
 * Exact matching avoids accepting a comment or similarly named file.
 *
 * @since UNRELEASED
 */
const packagePlistLines = packagePlist.split('\n').map((packagePlistLine) => packagePlistLine.trim());

if (packagePlistLines.includes('%%DATADIR%%/release-signing.pub') === false) {
  throw new Error('port/pkg-plist must list %%DATADIR%%/release-signing.pub.');
}

process.stdout.write('pfSense package sources are structurally valid.\n');
