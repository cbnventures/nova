import { spawnSync } from 'node:child_process';
import { join } from 'node:path';

/**
 * Lib - Verify Scaffold Install - Verify Bundler Load.
 *
 * Loads the Rollup copy used by a generated workspace's Vite or Vitest
 * installation so npm's non-fatal optional download failures surface early.
 *
 * @param {string} projectDirectory - Project directory.
 * @param {string} workspacePath    - Workspace path.
 * @param {string} toolName         - Tool name.
 *
 * @returns {void}
 *
 * @since 0.0.0
 */
export function verifyBundlerLoad(projectDirectory, workspacePath, toolName) {
  const workspaceManifestPath = join(projectDirectory, workspacePath, 'package.json');
  const probeLines = [
    'const { createRequire } = require(\'node:module\');',
    'const workspaceRequire = createRequire(process.argv[1]);',
    'const toolPath = workspaceRequire.resolve(process.argv[2]);',
    'let rollupRequire = createRequire(toolPath);',
    'if (process.argv[2] === \'vitest\') {',
    '  const vitePath = rollupRequire.resolve(\'vite\');',
    '  rollupRequire = createRequire(vitePath);',
    '}',
    'rollupRequire(\'rollup\');',
  ];
  const probeScript = probeLines.join('\n');
  const result = spawnSync(process.execPath, [
    '--eval',
    probeScript,
    workspaceManifestPath,
    toolName,
  ], {
    cwd: projectDirectory,
    encoding: 'utf-8',
  });

  if (result.status !== 0) {
    const stderr = result.stderr.trim();
    const diagnostic = (stderr.length > 0) ? stderr : String(result.error ?? `Exit code ${result.status}`);

    if (
      diagnostic.includes('Cannot find module') === true
      && diagnostic.includes('@rollup/rollup-') === true
    ) {
      throw new Error([
        `Generated workspace "${workspacePath}" has an incomplete npm install: Rollup's native package is missing.`,
        'npm may report success after an optional dependency download fails.',
        'Check npm registry access, then rerun "npm run check:scaffolds".',
        diagnostic,
      ].join('\n'));
    }

    throw new Error([
      `Generated workspace "${workspacePath}" could not load its "${toolName}" bundler after npm install.`,
      diagnostic,
    ].join('\n'));
  }

  return;
}
