import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import {
  replaceGithubActionScalar,
  resolveGithubActionAuthor,
  resolveGithubActionWorkspacePath,
} from '../../lib/github-action-identity.js';

import type {
  Tests_Lib_GithubActionIdentity_ReplaceGithubActionScalar_KeepsTheQuoteStyleOfEachValue_Manifest,
  Tests_Lib_GithubActionIdentity_ReplaceGithubActionScalar_LeavesNestedKeysAndBlockScalarsAlone_Manifest,
  Tests_Lib_GithubActionIdentity_ResolveGithubActionAuthor_ReturnsTheFirstNamedAuthorEntity_Author,
  Tests_Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchesTheWorkspaceThatHoldsRunsMain_Manifest,
} from '../../types/tests/lib/github-action-identity.test.d.ts';

/**
 * Tests - Lib - GitHub Action Identity - Replace GitHub Action Scalar.
 *
 * @since 0.49.0
 */
describe('replaceGithubActionScalar', () => {
  it('keeps the quote style of each value', () => {
    const manifest: Tests_Lib_GithubActionIdentity_ReplaceGithubActionScalar_KeepsTheQuoteStyleOfEachValue_Manifest = [
      'name: Plain Name # trailing comment',
      'description: \'Single quoted\'',
      'author: "Double quoted"',
      '',
    ].join('\n');

    strictEqual(replaceGithubActionScalar(manifest, 'name', 'New Name', undefined), manifest.replace('Plain Name', 'New Name'));
    strictEqual(replaceGithubActionScalar(manifest, 'name', 'Needs: quoting', undefined), manifest.replace('Plain Name', '"Needs: quoting"'));
    strictEqual(replaceGithubActionScalar(manifest, 'description', 'It\'s new', 'name'), manifest.replace('\'Single quoted\'', '\'It\'\'s new\''));
    strictEqual(replaceGithubActionScalar(manifest, 'author', 'Say "hi"', 'description'), manifest.replace('"Double quoted"', '"Say \\"hi\\""'));

    return;
  });

  it('leaves nested keys and block scalars alone', () => {
    const manifest: Tests_Lib_GithubActionIdentity_ReplaceGithubActionScalar_LeavesNestedKeysAndBlockScalarsAlone_Manifest = [
      'name: "Action"',
      'description: |',
      '  Multi-line text',
      'inputs:',
      '  token:',
      '    description: "Nested"',
      '',
    ].join('\n');

    strictEqual(replaceGithubActionScalar(manifest, 'description', 'New', 'name'), undefined);
    strictEqual(replaceGithubActionScalar('- not a map', 'name', 'New', undefined), undefined);
    strictEqual(replaceGithubActionScalar(manifest, 'author', 'Jane Doe', 'description'), [
      'name: "Action"',
      'description: |',
      '  Multi-line text',
      'author: "Jane Doe"',
      'inputs:',
      '  token:',
      '    description: "Nested"',
      '',
    ].join('\n'));

    return;
  });

  return;
});

/**
 * Tests - Lib - GitHub Action Identity - Resolve GitHub Action Author.
 *
 * @since 0.49.0
 */
describe('resolveGithubActionAuthor', () => {
  it('returns the first named author entity', () => {
    const author: Tests_Lib_GithubActionIdentity_ResolveGithubActionAuthor_ReturnsTheFirstNamedAuthorEntity_Author = resolveGithubActionAuthor([
      {
        name: 'Helper',
        roles: ['contributor'],
      },
      {
        name: ' Jane Doe ',
        roles: ['author'],
      },
    ]);

    strictEqual(author, 'Jane Doe');
    strictEqual(resolveGithubActionAuthor(undefined), undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - GitHub Action Identity - Resolve GitHub Action Workspace Path.
 *
 * @since 0.49.0
 */
describe('resolveGithubActionWorkspacePath', () => {
  it('matches the workspace that holds runs main', () => {
    const manifest: Tests_Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchesTheWorkspaceThatHoldsRunsMain_Manifest = [
      'runs:',
      '  main: "./packages/action/build/index.js"',
      '',
    ].join('\n');

    strictEqual(resolveGithubActionWorkspacePath(manifest, [
      './',
      './packages/action',
      './packages',
    ]), './packages/action');
    strictEqual(resolveGithubActionWorkspacePath(manifest, ['./packages/other']), undefined);

    return;
  });

  return;
});
