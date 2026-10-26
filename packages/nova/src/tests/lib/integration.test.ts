import {
  deepStrictEqual,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import {
  mkdir,
  mkdtemp,
  rm,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import {
  collectAssetTargets,
  collectMetadataTargets,
  confirmPlan,
  parseCommaSeparated,
  readDotenvValue,
} from '../../lib/integration.js';

import type {
  Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataDirectory,
  Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataFile,
  Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_Targets,
  Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_AssetDirectory,
  Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_TargetDirectory,
  Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_Targets,
  Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_DotenvFile,
  Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_Token,
  Tests_Lib_Integration_Integration_RejectsNonInteractiveMutationWithoutConfirmation_Confirmation,
  Tests_Lib_Integration_Integration_SandboxRoot,
  Tests_Lib_Integration_Integration_TemporaryBase,
  Tests_Lib_Integration_Integration_TemporaryDirectory,
  Tests_Lib_Integration_Integration_TrimsAndDeduplicatesCommaSeparatedValues_Result,
} from '../../types/tests/lib/integration.test.d.ts';

/**
 * Tests - Lib - Integration - Integration.
 *
 * Protects the shared local-file contract used by every vendor integration:
 * explicit metadata patches, deterministic asset order, and secret-safe dotenv
 * lookup without depending on live vendor services.
 *
 * @since 0.34.0
 */
describe.sequential('integration', async () => {
  const temporaryDirectory: Tests_Lib_Integration_Integration_TemporaryDirectory = tmpdir();
  const temporaryBase: Tests_Lib_Integration_Integration_TemporaryBase = join(temporaryDirectory, `nova-integration-${'test'}-`);
  const sandboxRoot: Tests_Lib_Integration_Integration_SandboxRoot = await mkdtemp(temporaryBase);

  afterAll(async () => {
    await rm(sandboxRoot, {
      recursive: true,
      force: true,
    });

    return;
  });

  it('trims and deduplicates comma-separated values', () => {
    const result: Tests_Lib_Integration_Integration_TrimsAndDeduplicatesCommaSeparatedValues_Result = parseCommaSeparated('ios, macos,ios,, visionos ');

    deepStrictEqual(result, [
      'ios',
      'macos',
      'visionos',
    ]);

    return;
  });

  it('collects only explicit metadata fields', async () => {
    const metadataDirectory: Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataDirectory = join(sandboxRoot, 'metadata');
    const metadataFile: Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_MetadataFile = join(metadataDirectory, 'ios', 'en-US.json');

    await mkdir(join(metadataDirectory, 'ios'), { recursive: true });
    await writeFile(metadataFile, `${JSON.stringify({
      description: 'A deliberate description.',
      ignoredField: 'not forwarded',
      keywords: null,
    }, null, 2)}\n`, 'utf-8');

    const targets: Tests_Lib_Integration_Integration_CollectsOnlyExplicitMetadataFields_Targets = await collectMetadataTargets(metadataDirectory, [
      'description',
      'keywords',
    ]);

    deepStrictEqual(targets, [{
      attributes: {
        description: 'A deliberate description.',
      },
      filePath: metadataFile,
      locale: 'en-US',
      platform: 'ios',
    }]);

    return;
  });

  it('orders positioned assets by filename prefix', async () => {
    const assetDirectory: Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_AssetDirectory = join(sandboxRoot, 'screenshots');
    const targetDirectory: Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_TargetDirectory = join(assetDirectory, 'ios', 'en-US', 'iphone');

    await mkdir(targetDirectory, { recursive: true });

    await Promise.all([
      writeFile(join(targetDirectory, '02-second.png'), 'second', 'utf-8'),
      writeFile(join(targetDirectory, '01-first.jpg'), 'first', 'utf-8'),
    ]);

    const targets: Tests_Lib_Integration_Integration_OrdersPositionedAssetsByFilenamePrefix_Targets = await collectAssetTargets(assetDirectory, {
      extensions: [
        '.jpg',
        '.png',
      ],
      positioned: true,
    });

    deepStrictEqual(targets.map((target) => target['files'].map((file) => file['fileName'])), [[
      '01-first.jpg',
      '02-second.png',
    ]]);

    return;
  });

  it('rejects non-interactive mutation without confirmation', async () => {
    const confirmation: Tests_Lib_Integration_Integration_RejectsNonInteractiveMutationWithoutConfirmation_Confirmation = confirmPlan(false, true, false);

    await rejects(confirmation, {
      message: 'Non-interactive mutations require -y or --yes.',
    });

    return;
  });

  it('reads one exact dotenv value', async () => {
    const dotenvFile: Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_DotenvFile = join(sandboxRoot, '.env');

    await writeFile(dotenvFile, [
      'OTHER_TOKEN=do-not-read',
      'export DISCORD_TOKEN="discord-secret"',
      '',
    ].join('\n'), 'utf-8');

    const token: Tests_Lib_Integration_Integration_ReadsOneExactDotenvValue_Token = await readDotenvValue(dotenvFile, 'DISCORD_TOKEN');

    strictEqual(token, 'discord-secret');

    return;
  });

  return;
});
