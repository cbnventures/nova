import {
  deepStrictEqual,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import {
  chmod,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  stat,
  writeFile,
} from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

import {
  afterAll,
  describe,
  it,
} from 'vitest';

import { Runner as LibArtifactAssembly } from '../../lib/artifact-assembly.js';

import type {
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ApiDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_Artifacts,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ExecutableMode,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_OutputPaths,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ProjectDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_SiteDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_Artifacts,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_ProjectDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_ReleaseDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsDestinationsOutsideTheNamedArtifactDirectory_Artifacts,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsDestinationsOutsideTheNamedArtifactDirectory_ProjectDirectory,
  Tests_Lib_ArtifactAssembly_LibArtifactAssembly_SandboxRoot,
} from '../../types/tests/lib/artifact-assembly.test.d.ts';

/**
 * Tests - Lib - Artifact Assembly - Lib Artifact Assembly.
 *
 * @since 0.38.0
 */
describe('LibArtifactAssembly', async () => {
  const sandboxRoot: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_SandboxRoot = await mkdtemp(join(tmpdir(), 'nova-artifact-assembly-test-'));

  afterAll(async () => {
    await rm(sandboxRoot, {
      force: true,
      recursive: true,
    });

    return;
  });

  it('assembles independent outputs with hidden files and executable modes', async () => {
    const projectDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ProjectDirectory = join(sandboxRoot, 'complete');
    const siteDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_SiteDirectory = join(projectDirectory, 'apps', 'site', 'build');
    const apiDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ApiDirectory = join(projectDirectory, 'apps', 'api', 'build');

    await mkdir(join(siteDirectory, '.well-known'), { recursive: true });
    await mkdir(apiDirectory, { recursive: true });
    await writeFile(join(siteDirectory, 'index.html'), '<h1>Nova</h1>\n', 'utf-8');
    await writeFile(join(siteDirectory, '.well-known', 'security.txt'), 'Contact: security@example.com\n', 'utf-8');
    await writeFile(join(apiDirectory, 'start'), [
      '#!/bin/sh',
      'exit 0',
      '',
    ].join('\n'), 'utf-8');
    await chmod(join(apiDirectory, 'start'), parseInt('755', 8));

    const artifacts: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_Artifacts = {
      release: {
        build: [
          'apps/site',
          'apps/api',
        ],
        sources: [
          {
            from: 'apps/site/build',
            to: 'site',
          },
          {
            from: 'apps/api/build',
            to: 'api',
          },
        ],
      },
    };
    const outputPaths: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_OutputPaths = await LibArtifactAssembly.assemble(projectDirectory, artifacts);
    const executableMode: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_AssemblesIndependentOutputsWithHiddenFilesAndExecutableModes_ExecutableMode = (await stat(join(projectDirectory, 'build', 'release', 'api', 'start'))).mode % 512;

    deepStrictEqual(outputPaths, [join(projectDirectory, 'build', 'release')]);
    strictEqual(await readFile(join(projectDirectory, 'build', 'release', 'site', 'index.html'), 'utf-8'), '<h1>Nova</h1>\n');
    strictEqual(await readFile(join(projectDirectory, 'build', 'release', 'site', '.well-known', 'security.txt'), 'utf-8'), 'Contact: security@example.com\n');
    strictEqual(executableMode, parseInt('755', 8));

    return;
  });

  it('rejects collisions before replacing an existing artifact', async () => {
    const projectDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_ProjectDirectory = join(sandboxRoot, 'collision');
    const releaseDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_ReleaseDirectory = join(projectDirectory, 'build', 'release');

    await mkdir(join(projectDirectory, 'sources'), { recursive: true });
    await mkdir(releaseDirectory, { recursive: true });
    await writeFile(join(projectDirectory, 'sources', 'first.txt'), 'first\n', 'utf-8');
    await writeFile(join(projectDirectory, 'sources', 'second.txt'), 'second\n', 'utf-8');
    await writeFile(join(releaseDirectory, 'sentinel.txt'), 'preserved\n', 'utf-8');

    const artifacts: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsCollisionsBeforeReplacingAnExistingArtifact_Artifacts = {
      release: {
        build: [],
        sources: [
          {
            from: 'sources/first.txt',
            to: 'same.txt',
          },
          {
            from: 'sources/second.txt',
            to: 'same.txt',
          },
        ],
      },
    };

    await rejects(LibArtifactAssembly.assemble(projectDirectory, artifacts), {
      message: 'Artifact sources collide at "same.txt".',
      name: 'Error',
    });
    strictEqual(await readFile(join(releaseDirectory, 'sentinel.txt'), 'utf-8'), 'preserved\n');

    return;
  });

  it('rejects destinations outside the named artifact directory', async () => {
    const projectDirectory: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsDestinationsOutsideTheNamedArtifactDirectory_ProjectDirectory = join(sandboxRoot, 'escape');

    await mkdir(join(projectDirectory, 'sources'), { recursive: true });
    await writeFile(join(projectDirectory, 'sources', 'payload.txt'), 'payload\n', 'utf-8');

    const artifacts: Tests_Lib_ArtifactAssembly_LibArtifactAssembly_RejectsDestinationsOutsideTheNamedArtifactDirectory_Artifacts = {
      release: {
        build: [],
        sources: [{
          from: 'sources/payload.txt',
          to: '../payload.txt',
        }],
      },
    };

    await rejects(LibArtifactAssembly.assemble(projectDirectory, artifacts), {
      message: 'Artifact "release" destination "../payload.txt" escapes its output folder.',
      name: 'Error',
    });
    await rejects(readFile(join(projectDirectory, 'build', 'payload.txt'), 'utf-8'));

    return;
  });

  return;
});
