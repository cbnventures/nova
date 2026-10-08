import { deepStrictEqual } from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { existsSync } from 'node:fs';
import { extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { globSync } from 'glob';
import { describe, it } from 'vitest';

import type {
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_EmittedExtension,
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_EmittedFile,
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_Returns,
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_ScaffoldDirectory,
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_SourceExtensions,
  Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_SourceStem,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_EmittedFiles,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_EmittedSourcePairs,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_FailureMessage,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_CheckIgnoreResult,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_FailureMessage,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_IgnoredTemplateFiles,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_TemplateFiles,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_TemplatePaths,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_PackageDirectory,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ScaffoldDirectory,
  Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_TemplatesDirectory,
} from '../types/tests/scaffold-template-source.test.d.ts';

/**
 * Tests - Scaffold Template Source - Has Type Script Source Counterpart.
 *
 * Detects emitted JavaScript whose matching TypeScript source remains beside it,
 * distinguishing compiler output from intentionally authored templates.
 *
 * @param {Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_EmittedFile}       emittedFile       - Emitted file.
 * @param {Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_ScaffoldDirectory} scaffoldDirectory - Scaffold directory.
 *
 * @returns {Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_Returns}
 *
 * @since 0.26.0
 */
function hasTypeScriptSourceCounterpart(emittedFile: Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_EmittedFile, scaffoldDirectory: Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_ScaffoldDirectory): Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_Returns {
  const emittedExtension: Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_EmittedExtension = extname(emittedFile);
  const sourceStem: Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_SourceStem = emittedFile.slice(0, -emittedExtension.length);
  let sourceExtensions: Tests_ScaffoldTemplateSource_HasTypeScriptSourceCounterpart_SourceExtensions = [];

  switch (emittedExtension) {
    case '.cjs': {
      sourceExtensions = ['.cts'];
      break;
    }

    case '.js': {
      sourceExtensions = [
        '.ts',
        '.tsx',
      ];
      break;
    }

    case '.jsx': {
      sourceExtensions = ['.tsx'];
      break;
    }

    case '.mjs': {
      sourceExtensions = ['.mts'];
      break;
    }

    default: {
      return false;
    }
  }

  return sourceExtensions.some((sourceExtension) => existsSync(join(scaffoldDirectory, `${sourceStem}${sourceExtension}`)));
}

/**
 * Tests - Scaffold Template Source - Scaffold Template Source.
 *
 * Protects scaffold directories from in-place TypeScript compiler artifacts
 * that would otherwise be copied into newly generated projects.
 *
 * @since 0.26.0
 */
describe('scaffold template source', () => {
  const packageDirectory: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_PackageDirectory = join(fileURLToPath(import.meta.url), '..', '..', '..');
  const templatesDirectory: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_TemplatesDirectory = join(packageDirectory, 'templates');
  const scaffoldDirectory: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ScaffoldDirectory = join(packageDirectory, 'templates', 'scaffold');

  it('contains no Git-ignored template files', () => {
    const templateFiles: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_TemplateFiles = globSync('**/*', {
      cwd: templatesDirectory,
      dot: true,
      nodir: true,
    });
    const templatePaths: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_TemplatePaths = templateFiles.map((templateFile) => `templates/${templateFile}`);
    const checkIgnoreResult: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_CheckIgnoreResult = spawnSync('git', [
      'check-ignore',
      '--stdin',
      '-z',
    ], {
      cwd: packageDirectory,
      encoding: 'utf-8',
      input: `${templatePaths.join('\0')}\0`,
    });
    const ignoredTemplateFiles: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_IgnoredTemplateFiles = checkIgnoreResult.stdout.split('\0').filter((ignoredTemplateFile) => ignoredTemplateFile !== '');
    const failureMessage: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoGitIgnoredTemplateFiles_FailureMessage = [
      'Template source files are hidden from Git and will be absent from clean CI checkouts and published packages.',
      'Rename the files or add intentional negated ignore rules:',
      ...ignoredTemplateFiles,
    ].join('\n');

    if (checkIgnoreResult.status !== 0 && checkIgnoreResult.status !== 1) {
      throw new Error(`Unable to inspect template ignore status with Git: ${checkIgnoreResult.stderr}`);
    }

    deepStrictEqual(ignoredTemplateFiles, [], failureMessage);

    return;
  });

  it('contains no emitted JavaScript beside TypeScript source', () => {
    const emittedFiles: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_EmittedFiles = globSync([
      '**/*.cjs',
      '**/*.js',
      '**/*.jsx',
      '**/*.mjs',
    ], {
      cwd: scaffoldDirectory,
      nodir: true,
    });
    const emittedSourcePairs: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_EmittedSourcePairs = emittedFiles.filter((emittedFile) => hasTypeScriptSourceCounterpart(emittedFile, scaffoldDirectory));
    const failureMessage: Tests_ScaffoldTemplateSource_ScaffoldTemplateSource_ContainsNoEmittedJavaScriptBesideTypeScriptSource_FailureMessage = [
      'Scaffold templates contain emitted JavaScript beside TypeScript source.',
      'Remove these compiler outputs:',
      ...emittedSourcePairs,
    ].join('\n');

    deepStrictEqual(emittedSourcePairs, [], failureMessage);

    return;
  });

  return;
});
