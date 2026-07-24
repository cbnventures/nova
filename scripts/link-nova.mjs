import { execSync } from 'node:child_process';
import { existsSync, lstatSync } from 'node:fs';
import { join } from 'node:path';

const PACKAGES = [
  '@cbnventures/nova',
  '@cbnventures/docusaurus-preset-nova',
];

/**
 * Scripts - Link Nova.
 *
 * @since 2.0.0
 */
function linkNova() {
  const globalPrefix = execSync('npm prefix -g', { encoding: 'utf-8' }).trim();
  const globalModules = join(globalPrefix, 'lib', 'node_modules');
  const missingLinks = [];

  for (const packageName of PACKAGES) {
    const globalPath = join(globalModules, packageName);
    const isLinked = existsSync(globalPath) && lstatSync(globalPath).isSymbolicLink();

    if (!isLinked) {
      missingLinks.push(packageName);
    }
  }

  if (missingLinks.length > 0) {
    console.log(`link-nova: Global links not found for ${missingLinks.join(', ')}. Skipping.`);

    return;
  }

  console.log(`link-nova: Linking ${PACKAGES.join(', ')} ...`);

  execSync(`npm link ${PACKAGES.join(' ')}`, { stdio: 'inherit' });

  for (const packageName of PACKAGES) {
    const localPath = join(process.cwd(), 'node_modules', packageName);
    const isLinked = existsSync(localPath) && lstatSync(localPath).isSymbolicLink();

    if (!isLinked) {
      throw new Error(`link-nova: ${packageName} is a package copy, not a symlink. Run "npm link ${PACKAGES.join(' ')}" manually.`);
    }
  }

  console.log('link-nova: Done.');
}

linkNova();
