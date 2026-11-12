import type {
  Lib_PosixPath_ToPosixPath_FilePath,
  Lib_PosixPath_ToPosixPath_Returns,
} from '../types/lib/posix-path.d.ts';

/**
 * Lib - Posix Path - To Posix Path.
 *
 * Rewrites every backslash separator to a forward slash so relative paths
 * read from disk on Windows filter, sort, and compare the same way they
 * do on macOS and Linux.
 *
 * @param {Lib_PosixPath_ToPosixPath_FilePath} filePath - File path.
 *
 * @returns {Lib_PosixPath_ToPosixPath_Returns}
 *
 * @since 0.41.2
 */
export function toPosixPath(filePath: Lib_PosixPath_ToPosixPath_FilePath): Lib_PosixPath_ToPosixPath_Returns {
  return filePath.replaceAll('\\', '/');
}
