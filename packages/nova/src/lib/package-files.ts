import { readFileSync } from 'node:fs';

import type {
  Lib_PackageFiles_ReadPackageJsonFile_FileName,
  Lib_PackageFiles_ReadPackageJsonFile_FileUrl,
  Lib_PackageFiles_ReadPackageJsonFile_Returns,
} from '../types/lib/package-files.d.ts';

/**
 * Lib - Package Files - Read package.json File.
 *
 * Reads and parses a JSON file at the package root, such as "package.json". The source
 * and the build output both sit one folder below that root, so one relative path works.
 *
 * @param {Lib_PackageFiles_ReadPackageJsonFile_FileName} fileName - File name.
 *
 * @returns {Lib_PackageFiles_ReadPackageJsonFile_Returns}
 *
 * @since 0.49.0
 */
export function readPackageJsonFile(fileName: Lib_PackageFiles_ReadPackageJsonFile_FileName): Lib_PackageFiles_ReadPackageJsonFile_Returns {
  const fileUrl: Lib_PackageFiles_ReadPackageJsonFile_FileUrl = new URL(`../../${fileName}`, import.meta.url);

  return JSON.parse(readFileSync(fileUrl, 'utf-8'));
}
