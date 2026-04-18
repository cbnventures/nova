import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir, platform, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { LIB_REGEX_PATTERN_ENV_LINE } from '../lib/regex.js';
import { Logger } from './index.js';

import type {
  ToolkitBootstrapGetCacheDirAppName,
  ToolkitBootstrapGetCacheDirCachePath,
  ToolkitBootstrapGetCacheDirHomeDirPath,
  ToolkitBootstrapGetCacheDirReturn,
  ToolkitBootstrapGetConfigDirAppName,
  ToolkitBootstrapGetConfigDirBasePath,
  ToolkitBootstrapGetConfigDirDefaultPath,
  ToolkitBootstrapGetConfigDirHomeDirPath,
  ToolkitBootstrapGetConfigDirReturn,
  ToolkitBootstrapGetDataDirAppName,
  ToolkitBootstrapGetDataDirDataPath,
  ToolkitBootstrapGetDataDirHomeDirPath,
  ToolkitBootstrapGetDataDirReturn,
  ToolkitBootstrapGetProjectRootContent,
  ToolkitBootstrapGetProjectRootDir,
  ToolkitBootstrapGetProjectRootFilePath,
  ToolkitBootstrapGetProjectRootFirstPackageDir,
  ToolkitBootstrapGetProjectRootParent,
  ToolkitBootstrapGetProjectRootParsed,
  ToolkitBootstrapGetProjectRootReturn,
  ToolkitBootstrapLoadEnvContent,
  ToolkitBootstrapLoadEnvDirectory,
  ToolkitBootstrapLoadEnvFilePath,
  ToolkitBootstrapLoadEnvKey,
  ToolkitBootstrapLoadEnvLine,
  ToolkitBootstrapLoadEnvLines,
  ToolkitBootstrapLoadEnvMatch,
  ToolkitBootstrapLoadEnvReturn,
  ToolkitBootstrapLoadEnvValue,
  ToolkitBootstrapResolveDirAppName,
  ToolkitBootstrapResolveDirKeyword,
  ToolkitBootstrapResolveDirReturn,
  ToolkitBootstrapResolveFileDirAppName,
  ToolkitBootstrapResolveFileDirDirectory,
  ToolkitBootstrapResolveFileDirFilename,
  ToolkitBootstrapResolveFileDirFilePath,
  ToolkitBootstrapResolveFileDirLocation,
  ToolkitBootstrapResolveFileDirReturn,
  ToolkitBootstrapResolveFileDirsAppName,
  ToolkitBootstrapResolveFileDirsDirectory,
  ToolkitBootstrapResolveFileDirSearchOrder,
  ToolkitBootstrapResolveFileDirsFilename,
  ToolkitBootstrapResolveFileDirsFilePath,
  ToolkitBootstrapResolveFileDirsLocation,
  ToolkitBootstrapResolveFileDirsResults,
  ToolkitBootstrapResolveFileDirsReturn,
  ToolkitBootstrapResolveFileDirsSearchOrder,
} from '../types/toolkit/bootstrap.d.ts';

/**
 * Toolkit - Bootstrap.
 *
 * Platform-aware utility for resolving application directories,
 * locating configuration files across a search path, and loading
 * environment variables from .env files.
 *
 * @since 0.14.0
 */
class ToolkitBootstrap {
  /**
   * Toolkit - Bootstrap - Get Config Dir.
   *
   * Returns the platform-specific configuration directory for the given
   * application name. Uses XDG_CONFIG_HOME on macOS and Linux, APPDATA
   * on Windows. Creates the directory if it does not exist.
   *
   * @param {ToolkitBootstrapGetConfigDirAppName} appName - App name.
   *
   * @returns {ToolkitBootstrapGetConfigDirReturn}
   *
   * @since 0.14.0
   */
  public static getConfigDir(appName: ToolkitBootstrapGetConfigDirAppName): ToolkitBootstrapGetConfigDirReturn {
    const homeDirPath: ToolkitBootstrapGetConfigDirHomeDirPath = homedir();

    if (platform() === 'win32') {
      const defaultPath: ToolkitBootstrapGetConfigDirDefaultPath = process.env['APPDATA'] ?? join(homeDirPath, 'AppData', 'Roaming');
      const basePath: ToolkitBootstrapGetConfigDirBasePath = join(defaultPath, appName);

      if (existsSync(basePath) === false) {
        mkdirSync(basePath, { recursive: true });
      }

      return basePath;
    }

    const defaultPath: ToolkitBootstrapGetConfigDirDefaultPath = process.env['XDG_CONFIG_HOME'] ?? join(homeDirPath, '.config');
    const basePath: ToolkitBootstrapGetConfigDirBasePath = join(defaultPath, appName);

    if (existsSync(basePath) === false) {
      mkdirSync(basePath, { recursive: true });
    }

    return basePath;
  }

  /**
   * Toolkit - Bootstrap - Get Data Dir.
   *
   * Returns the platform-specific data directory for the given application
   * name. Uses ~/Library/Application Support on macOS, XDG_DATA_HOME on
   * Linux, and APPDATA on Windows. Creates the directory if it does not exist.
   *
   * @param {ToolkitBootstrapGetDataDirAppName} appName - App name.
   *
   * @returns {ToolkitBootstrapGetDataDirReturn}
   *
   * @since 0.14.0
   */
  public static getDataDir(appName: ToolkitBootstrapGetDataDirAppName): ToolkitBootstrapGetDataDirReturn {
    const homeDirPath: ToolkitBootstrapGetDataDirHomeDirPath = homedir();

    if (platform() === 'win32') {
      const dataPath: ToolkitBootstrapGetDataDirDataPath = process.env['APPDATA'] ?? join(homeDirPath, 'AppData', 'Roaming');
      const basePath: ToolkitBootstrapGetDataDirDataPath = join(dataPath, appName);

      if (existsSync(basePath) === false) {
        mkdirSync(basePath, { recursive: true });
      }

      return basePath;
    }

    if (platform() === 'darwin') {
      const dataPath: ToolkitBootstrapGetDataDirDataPath = join(homeDirPath, 'Library', 'Application Support');
      const basePath: ToolkitBootstrapGetDataDirDataPath = join(dataPath, appName);

      if (existsSync(basePath) === false) {
        mkdirSync(basePath, { recursive: true });
      }

      return basePath;
    }

    const dataPath: ToolkitBootstrapGetDataDirDataPath = process.env['XDG_DATA_HOME'] ?? join(homeDirPath, '.local', 'share');
    const basePath: ToolkitBootstrapGetDataDirDataPath = join(dataPath, appName);

    if (existsSync(basePath) === false) {
      mkdirSync(basePath, { recursive: true });
    }

    return basePath;
  }

  /**
   * Toolkit - Bootstrap - Get Cache Dir.
   *
   * Returns the platform-specific cache directory for the given application
   * name. Uses ~/Library/Caches on macOS, XDG_CACHE_HOME on Linux, and
   * LOCALAPPDATA\Temp on Windows. Creates the directory if it does not exist.
   *
   * @param {ToolkitBootstrapGetCacheDirAppName} appName - App name.
   *
   * @returns {ToolkitBootstrapGetCacheDirReturn}
   *
   * @since 0.14.0
   */
  public static getCacheDir(appName: ToolkitBootstrapGetCacheDirAppName): ToolkitBootstrapGetCacheDirReturn {
    const homeDirPath: ToolkitBootstrapGetCacheDirHomeDirPath = homedir();

    if (platform() === 'win32') {
      const cachePath: ToolkitBootstrapGetCacheDirCachePath = join(process.env['LOCALAPPDATA'] ?? join(homeDirPath, 'AppData', 'Local'), 'Temp');
      const basePath: ToolkitBootstrapGetCacheDirCachePath = join(cachePath, appName);

      if (existsSync(basePath) === false) {
        mkdirSync(basePath, { recursive: true });
      }

      return basePath;
    }

    if (platform() === 'darwin') {
      const cachePath: ToolkitBootstrapGetCacheDirCachePath = join(homeDirPath, 'Library', 'Caches');
      const basePath: ToolkitBootstrapGetCacheDirCachePath = join(cachePath, appName);

      if (existsSync(basePath) === false) {
        mkdirSync(basePath, { recursive: true });
      }

      return basePath;
    }

    const cachePath: ToolkitBootstrapGetCacheDirCachePath = process.env['XDG_CACHE_HOME'] ?? join(homeDirPath, '.cache');
    const basePath: ToolkitBootstrapGetCacheDirCachePath = join(cachePath, appName);

    if (existsSync(basePath) === false) {
      mkdirSync(basePath, { recursive: true });
    }

    return basePath;
  }

  /**
   * Toolkit - Bootstrap - Get Project Root.
   *
   * Walks up from the current working directory looking for a
   * monorepo root (package.json with workspaces) or the nearest
   * package.json as a fallback.
   *
   * @returns {ToolkitBootstrapGetProjectRootReturn}
   *
   * @since 0.14.0
   */
  public static getProjectRoot(): ToolkitBootstrapGetProjectRootReturn {
    let dir: ToolkitBootstrapGetProjectRootDir = process.cwd();
    let firstPackageDir: ToolkitBootstrapGetProjectRootFirstPackageDir = undefined;

    while (dir !== dirname(dir)) {
      const filePath: ToolkitBootstrapGetProjectRootFilePath = join(dir, 'package.json');

      if (existsSync(filePath) === true) {
        if (firstPackageDir === undefined) {
          firstPackageDir = dir;
        }

        const content: ToolkitBootstrapGetProjectRootContent = readFileSync(filePath, 'utf-8');
        const parsed: ToolkitBootstrapGetProjectRootParsed = JSON.parse(content) as ToolkitBootstrapGetProjectRootParsed;

        if (parsed['workspaces'] !== undefined) {
          return dir;
        }
      }

      const parent: ToolkitBootstrapGetProjectRootParent = dirname(dir);

      dir = parent;
    }

    return firstPackageDir;
  }

  /**
   * Toolkit - Bootstrap - Load Env.
   *
   * Reads a .env file from the given directory and sets each KEY=value
   * pair in process.env. Does not override existing environment variables.
   * Supports optional quotes around values, ignoring comments and empty lines.
   *
   * @param {ToolkitBootstrapLoadEnvDirectory} directory - Directory.
   *
   * @returns {ToolkitBootstrapLoadEnvReturn}
   *
   * @since 0.14.0
   */
  public static loadEnv(directory: ToolkitBootstrapLoadEnvDirectory): ToolkitBootstrapLoadEnvReturn {
    const filePath: ToolkitBootstrapLoadEnvFilePath = join(directory, '.env');

    if (existsSync(filePath) === false) {
      return;
    }

    const content: ToolkitBootstrapLoadEnvContent = readFileSync(filePath, 'utf-8');
    const lines: ToolkitBootstrapLoadEnvLines = content.split('\n');

    for (const line of lines) {
      const trimmedLine: ToolkitBootstrapLoadEnvLine = line.trim();

      if (trimmedLine === '' || trimmedLine.startsWith('#') === true) {
        continue;
      }

      const match: ToolkitBootstrapLoadEnvMatch = trimmedLine.match(LIB_REGEX_PATTERN_ENV_LINE);

      if (match === null) {
        continue;
      }

      const key: ToolkitBootstrapLoadEnvKey = match[1] ?? '';
      const value: ToolkitBootstrapLoadEnvValue = match[2] ?? '';

      if (process.env[key] === undefined) {
        Reflect.set(process.env, key, value);
      }
    }

    Logger.customize({
      name: 'bootstrap',
      purpose: 'loadEnv',
    }).debug(`Loaded .env from ${filePath}`);

    return;
  }

  /**
   * Toolkit - Bootstrap - Resolve File Dir.
   *
   * Searches through the given search order and returns the first directory
   * that contains the specified file. Returns undefined if the file is not
   * found in any directory.
   *
   * @param {ToolkitBootstrapResolveFileDirAppName}     appName     - App name.
   * @param {ToolkitBootstrapResolveFileDirFilename}    filename    - Filename.
   * @param {ToolkitBootstrapResolveFileDirSearchOrder} searchOrder - Search order.
   *
   * @returns {ToolkitBootstrapResolveFileDirReturn}
   *
   * @since 0.14.0
   */
  public static resolveFileDir(appName: ToolkitBootstrapResolveFileDirAppName, filename: ToolkitBootstrapResolveFileDirFilename, searchOrder: ToolkitBootstrapResolveFileDirSearchOrder): ToolkitBootstrapResolveFileDirReturn {
    for (const location of searchOrder) {
      const typedLocation: ToolkitBootstrapResolveFileDirLocation = location;
      const directory: ToolkitBootstrapResolveFileDirDirectory = ToolkitBootstrap.#resolveDir(appName, typedLocation);
      const filePath: ToolkitBootstrapResolveFileDirFilePath = join(directory, filename);

      if (existsSync(filePath) === true) {
        return directory;
      }
    }

    return undefined;
  }

  /**
   * Toolkit - Bootstrap - Resolve File Dirs.
   *
   * Searches through the given search order and returns all directories
   * that contain the specified file. Returns an empty array if the file
   * is not found in any directory.
   *
   * @param {ToolkitBootstrapResolveFileDirsAppName}     appName     - App name.
   * @param {ToolkitBootstrapResolveFileDirsFilename}    filename    - Filename.
   * @param {ToolkitBootstrapResolveFileDirsSearchOrder} searchOrder - Search order.
   *
   * @returns {ToolkitBootstrapResolveFileDirsReturn}
   *
   * @since 0.14.0
   */
  public static resolveFileDirs(appName: ToolkitBootstrapResolveFileDirsAppName, filename: ToolkitBootstrapResolveFileDirsFilename, searchOrder: ToolkitBootstrapResolveFileDirsSearchOrder): ToolkitBootstrapResolveFileDirsReturn {
    const results: ToolkitBootstrapResolveFileDirsResults = [];

    for (const location of searchOrder) {
      const typedLocation: ToolkitBootstrapResolveFileDirsLocation = location;
      const directory: ToolkitBootstrapResolveFileDirsDirectory = ToolkitBootstrap.#resolveDir(appName, typedLocation);
      const filePath: ToolkitBootstrapResolveFileDirsFilePath = join(directory, filename);

      if (existsSync(filePath) === true && results.includes(directory) === false) {
        results.push(directory);
      }
    }

    return results;
  }

  /**
   * Toolkit - Bootstrap - Resolve Dir.
   *
   * Maps a keyword to a platform-specific directory path. Recognized
   * keywords are cwd, config-dir, data-dir, cache-dir, home, and temp.
   * Absolute paths are returned as-is.
   *
   * @param {ToolkitBootstrapResolveDirAppName} appName - App name.
   * @param {ToolkitBootstrapResolveDirKeyword} keyword - Keyword.
   *
   * @private
   *
   * @returns {ToolkitBootstrapResolveDirReturn}
   *
   * @since 0.14.0
   */
  static #resolveDir(appName: ToolkitBootstrapResolveDirAppName, keyword: ToolkitBootstrapResolveDirKeyword): ToolkitBootstrapResolveDirReturn {
    switch (keyword) {
      case 'cwd': {
        return process.cwd();
      }

      case 'config-dir': {
        return ToolkitBootstrap.getConfigDir(appName);
      }

      case 'data-dir': {
        return ToolkitBootstrap.getDataDir(appName);
      }

      case 'cache-dir': {
        return ToolkitBootstrap.getCacheDir(appName);
      }

      case 'home': {
        return homedir();
      }

      case 'project-root': {
        return ToolkitBootstrap.getProjectRoot() ?? process.cwd();
      }

      case 'temp': {
        return tmpdir();
      }

      default: {
        return keyword;
      }
    }
  }
}

export default ToolkitBootstrap;
