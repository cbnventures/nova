import { readFileSync, readdirSync, writeFileSync } from 'fs';
import {
  dirname,
  join,
  relative,
  resolve,
} from 'path';

// Rewrite "@/" path aliases in build output to relative paths.
const buildDir = resolve('build/src');
const aliasPrefix = '@/';
const extensions = ['.js', '.mjs', '.d.ts', '.d.mts'];

// Collect all eligible files in the build output.
const queue = [buildDir];
const files = [];

while (queue.length > 0) {
  const current = queue.pop();

  for (const entry of readdirSync(current, { withFileTypes: true })) {
    const entryPath = join(current, entry.name);

    if (entry.isDirectory()) {
      queue.push(entryPath);
    }

    if (entry.isFile() && extensions.some((ext) => entry.name.endsWith(ext))) {
      files.push(entryPath);
    }
  }
}

// Replace "@/" aliases with relative paths in each file.
for (const file of files) {
  const fileDir = dirname(file);
  const original = readFileSync(file, 'utf-8');
  const aliasPattern = new RegExp('from \'(@/[^\']+)\'', 'g');

  const rewritten = original.replace(
    aliasPattern,
    (match, importPath) => {
      const absoluteTarget = resolve(buildDir, importPath.slice(aliasPrefix.length));
      const relativePath = relative(fileDir, absoluteTarget);
      const normalized = (relativePath.startsWith('.')) ? relativePath : `./${relativePath}`;

      return `from '${normalized}'`;
    },
  );

  if (rewritten !== original) {
    writeFileSync(file, rewritten, 'utf-8');
  }
}
