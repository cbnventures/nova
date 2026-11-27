import { ok, strictEqual } from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  readFile,
  rm,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { findEnvQuoteViolations, writeDotenvFiles } from '../../lib/dotenv.js';

import type {
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsBareEmptyValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsSingleQuotedValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnquotedValues_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnterminatedDoubleQuotes_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Result,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Subject,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_PassesCorrectlyDoubleQuotedValuesIncludingEmptyAndMultiLine_Content,
  Tests_Lib_Dotenv_FindEnvQuoteViolations_ReportsOneViolationPerOffendingKeyAndIgnoresCommentsBlanks_Content,
  Tests_Lib_Dotenv_WriteDotenvFiles_SandboxRoot,
  Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_EnvContents,
  Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_SampleContents,
  Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_TargetDirectory,
  Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_Variables,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_DevelopmentSample,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_EnvContents,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_ProductionSample,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_StagingSample,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_TargetDirectory,
  Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_Variables,
} from '../../types/tests/lib/dotenv.test.d.ts';

/**
 * Tests - Lib - Dotenv - Find Env Quote Violations.
 *
 * @since 0.20.0
 */
describe('findEnvQuoteViolations', () => {
  it('passes correctly double-quoted values, including empty and multi-line', () => {
    const content: Tests_Lib_Dotenv_FindEnvQuoteViolations_PassesCorrectlyDoubleQuotedValuesIncludingEmptyAndMultiLine_Content = [
      '# comment',
      '',
      'NODE_ENV="development"',
      'LOG_LEVEL=""',
      'PEM="-----BEGIN-----',
      'middle',
      '-----END-----"',
    ].join('\n');

    strictEqual(findEnvQuoteViolations(content).length, 0);

    return;
  });

  it('flags single-quoted values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsSingleQuotedValues_Result = findEnvQuoteViolations('KEY=\'value\'');

    strictEqual(result.length, 1);
    strictEqual((result[0] !== undefined) ? result[0]['key'] : undefined, 'KEY');
    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('single quotes') : false, true);

    return;
  });

  it('flags unquoted values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnquotedValues_Result = findEnvQuoteViolations('KEY=value');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('unquoted') : false, true);

    return;
  });

  it('flags bare empty values', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsBareEmptyValues_Result = findEnvQuoteViolations('KEY=');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('empty') : false, true);

    return;
  });

  it('flags unterminated double quotes', () => {
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_FlagsUnterminatedDoubleQuotes_Result = findEnvQuoteViolations('KEY="oops');

    strictEqual((result[0] !== undefined) ? result[0]['reason'].includes('unterminated') : false, true);

    return;
  });

  it('reports one violation per offending key and ignores comments/blanks', () => {
    const content: Tests_Lib_Dotenv_FindEnvQuoteViolations_ReportsOneViolationPerOffendingKeyAndIgnoresCommentsBlanks_Content = [
      '# c',
      '',
      'A=\'x\'',
      'B="ok"',
      'C=raw',
    ].join('\n');

    strictEqual(findEnvQuoteViolations(content).length, 2);

    return;
  });

  it('handles CRLF line endings', () => {
    const subject: Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Subject = [
      'A=\'x\'',
      'B="y"',
    ].join(String.fromCharCode(13, 10));
    const result: Tests_Lib_Dotenv_FindEnvQuoteViolations_HandlesCRLFLineEndings_Result = findEnvQuoteViolations(subject);

    strictEqual(result.length, 1);

    return;
  });

  return;
});

/**
 * Tests - Lib - Dotenv - Write Dotenv Files.
 *
 * @since 0.53.0
 */
describe('writeDotenvFiles', async () => {
  const sandboxRoot: Tests_Lib_Dotenv_WriteDotenvFiles_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-dotenv-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('writes per-profile sample values and leaves the real env files blank', async () => {
    const targetDirectory: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_TargetDirectory = join(sandboxRoot, 'profiles');
    const variables: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_Variables = [
      {
        key: 'TURNSTILE_SITE_KEY',
        reach: 'build',
        secret: false,
        defaultValue: 'site-key-default',
        sampleValues: {
          development: '1x00000000000000000000AA',
        },
      },
      {
        key: 'TURNSTILE_SECRET_KEY',
        reach: 'runtime',
        secret: true,
        sampleValues: {
          development: '1x0000000000000000000000000000000AA',
        },
      },
    ];

    await mkdir(targetDirectory, { recursive: true });

    await writeDotenvFiles({
      profilesEnabled: true,
      report: false,
      targetDirectory,
      variables,
    });

    const developmentSample: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_DevelopmentSample = await readFile(join(targetDirectory, '.env.development.sample'), 'utf-8');
    const stagingSample: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_StagingSample = await readFile(join(targetDirectory, '.env.staging.sample'), 'utf-8');
    const productionSample: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_ProductionSample = await readFile(join(targetDirectory, '.env.production.sample'), 'utf-8');

    ok(developmentSample.includes('TURNSTILE_SITE_KEY="1x00000000000000000000AA"'), 'Expected the development sample to use its sample value over the default');
    ok(developmentSample.includes('TURNSTILE_SECRET_KEY="1x0000000000000000000000000000000AA"'), 'Expected the development sample to carry the secret test value');
    ok(stagingSample.includes('TURNSTILE_SITE_KEY="site-key-default"'), 'Expected the staging sample to fall back to the default');
    ok(stagingSample.includes('TURNSTILE_SECRET_KEY=""'), 'Expected the staging sample to leave the secret blank');
    ok(productionSample.includes('TURNSTILE_SITE_KEY="site-key-default"'), 'Expected the production sample to fall back to the default');
    ok(productionSample.includes('TURNSTILE_SECRET_KEY=""'), 'Expected the production sample to leave the secret blank');

    const envContents: Tests_Lib_Dotenv_WriteDotenvFiles_WritesPerProfileSampleValuesAndLeavesTheRealEnvFilesBlank_EnvContents = await Promise.all([
      '.env.development',
      '.env.staging',
      '.env.production',
    ].map((envFileName) => readFile(join(targetDirectory, envFileName), 'utf-8')));

    for (const envContent of envContents) {
      ok(envContent.includes('TURNSTILE_SITE_KEY=""'), 'Expected every real env file to leave the site key blank');
      ok(envContent.includes('TURNSTILE_SECRET_KEY=""'), 'Expected every real env file to leave the secret key blank');
      ok(envContent.includes('1x0000') === false, 'Expected no sample value in a real env file');
    }

    return;
  });

  it('uses the development sample value for the plain sample file', async () => {
    const targetDirectory: Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_TargetDirectory = join(sandboxRoot, 'plain');
    const variables: Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_Variables = [{
      key: 'GREETING',
      reach: 'local',
      sampleValues: {
        development: 'say "hi"',
        production: 'unused',
      },
    }];

    await mkdir(targetDirectory, { recursive: true });

    await writeDotenvFiles({
      report: false,
      targetDirectory,
      variables,
    });

    const sampleContents: Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_SampleContents = await readFile(join(targetDirectory, '.env.sample'), 'utf-8');
    const envContents: Tests_Lib_Dotenv_WriteDotenvFiles_UsesTheDevelopmentSampleValueForThePlainSampleFile_EnvContents = await readFile(join(targetDirectory, '.env'), 'utf-8');

    ok(sampleContents.includes('GREETING="say \\"hi\\""'), 'Expected the plain sample to use the escaped development value');
    ok(envContents.includes('GREETING=""'), 'Expected the real env file to leave the value blank');

    return;
  });

  return;
});
