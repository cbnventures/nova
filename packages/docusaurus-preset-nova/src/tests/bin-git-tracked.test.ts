import { ok } from 'node:assert/strict';
import { execSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import { describe, it } from 'vitest';

import type {
  Tests_BinGitTracked_BinGitTracked_Bin,
  Tests_BinGitTracked_BinGitTracked_BinEntries,
  Tests_BinGitTracked_BinGitTracked_BinName,
  Tests_BinGitTracked_BinGitTracked_BinPath,
  Tests_BinGitTracked_BinGitTracked_Message,
  Tests_BinGitTracked_BinGitTracked_PackageJson,
  Tests_BinGitTracked_BinGitTracked_PackageJsonPath,
  Tests_BinGitTracked_BinGitTracked_PackageJsonText,
  Tests_BinGitTracked_BinGitTracked_PackageRoot,
  Tests_BinGitTracked_BinGitTracked_Tracked,
  Tests_BinGitTracked_GetPackageRoot_CurrentFileDirectory,
  Tests_BinGitTracked_GetPackageRoot_CurrentFilePath,
  Tests_BinGitTracked_GetPackageRoot_Returns,
  Tests_BinGitTracked_IsTrackedByGit_BinPath,
  Tests_BinGitTracked_IsTrackedByGit_PackageRoot,
  Tests_BinGitTracked_IsTrackedByGit_Returns,
} from '../types/tests/bin-git-tracked.test.d.ts';

/**
 * Tests - Bin Git Tracked - Get Package Root.
 *
 * Resolves the docusaurus-preset-nova package root from the current test
 * file location.
 *
 * @returns {Tests_BinGitTracked_GetPackageRoot_Returns}
 *
 * @since 0.22.0
 */
function getPackageRoot(): Tests_BinGitTracked_GetPackageRoot_Returns {
  const currentFilePath: Tests_BinGitTracked_GetPackageRoot_CurrentFilePath = fileURLToPath(import.meta.url);
  const currentFileDirectory: Tests_BinGitTracked_GetPackageRoot_CurrentFileDirectory = dirname(currentFilePath);

  return resolve(currentFileDirectory, '..', '..');
}

/**
 * Tests - Bin Git Tracked - Is Tracked By Git.
 *
 * Runs `git ls-files --error-unmatch` for a single bin target from the given
 * package root and reports whether git tracks it. A bin file that builds and
 * runs locally but is not tracked by git is silently missing from the
 * published npm tarball, leaving the installed CLI command broken.
 *
 * @param {Tests_BinGitTracked_IsTrackedByGit_PackageRoot} packageRoot - Package root.
 * @param {Tests_BinGitTracked_IsTrackedByGit_BinPath}     binPath     - Bin path.
 *
 * @returns {Tests_BinGitTracked_IsTrackedByGit_Returns}
 *
 * @since 0.22.0
 */
function isTrackedByGit(packageRoot: Tests_BinGitTracked_IsTrackedByGit_PackageRoot, binPath: Tests_BinGitTracked_IsTrackedByGit_BinPath): Tests_BinGitTracked_IsTrackedByGit_Returns {
  try {
    execSync(`git ls-files --error-unmatch -- "${binPath}"`, {
      cwd: packageRoot,
      stdio: 'ignore',
    });

    return true;
  } catch {
    return false;
  }
}

/**
 * Tests - Bin Git Tracked - Bin Git Tracked.
 *
 * Guards every `package.json` `bin` entry against pointing at a file git
 * does not track. `npm publish` packs only tracked (and explicitly
 * `files`-listed) paths, so an untracked bin target ships a broken CLI
 * command to every consumer while still working in the local checkout.
 *
 * @since 0.22.0
 */
describe('bin git tracked', () => {
  const packageRoot: Tests_BinGitTracked_BinGitTracked_PackageRoot = getPackageRoot();
  const packageJsonPath: Tests_BinGitTracked_BinGitTracked_PackageJsonPath = resolve(packageRoot, 'package.json');
  const packageJsonText: Tests_BinGitTracked_BinGitTracked_PackageJsonText = readFileSync(packageJsonPath, 'utf-8');
  const packageJson: Tests_BinGitTracked_BinGitTracked_PackageJson = JSON.parse(packageJsonText);
  const bin: Tests_BinGitTracked_BinGitTracked_Bin = packageJson['bin'] ?? {};
  const binEntries: Tests_BinGitTracked_BinGitTracked_BinEntries = Object.entries(bin);

  for (const binEntry of binEntries) {
    const binName: Tests_BinGitTracked_BinGitTracked_BinName = binEntry[0];
    const binPath: Tests_BinGitTracked_BinGitTracked_BinPath = binEntry[1];

    it(`'${binName}' bin entry (${binPath}) is tracked by git`, () => {
      const tracked: Tests_BinGitTracked_BinGitTracked_Tracked = isTrackedByGit(packageRoot, binPath);
      const message: Tests_BinGitTracked_BinGitTracked_Message = `"${binPath}" is referenced by the "${binName}" bin entry in package.json but is not tracked by git. Run "git add ${binPath}" or remove the bin entry.`;

      ok(tracked, message);

      return;
    });
  }

  return;
});
