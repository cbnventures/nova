import { existsSync, mkdirSync, readFileSync } from 'node:fs';
import { homedir, platform, tmpdir } from 'node:os';
import { dirname, join } from 'node:path';

import { LIB_REGEX_PATTERN_ENV_LINE } from '../lib/regex.js';
import { Logger } from './index.js';

import type {
  Toolkit_Bootstrap_Runner_GetCacheDir_AppName,
  Toolkit_Bootstrap_Runner_GetCacheDir_BasePath,
  Toolkit_Bootstrap_Runner_GetCacheDir_CachePath,
  Toolkit_Bootstrap_Runner_GetCacheDir_DarwinBasePath,
  Toolkit_Bootstrap_Runner_GetCacheDir_DarwinCachePath,
  Toolkit_Bootstrap_Runner_GetCacheDir_HomeDirPath,
  Toolkit_Bootstrap_Runner_GetCacheDir_Returns,
  Toolkit_Bootstrap_Runner_GetCacheDir_WindowsBasePath,
  Toolkit_Bootstrap_Runner_GetCacheDir_WindowsCachePath,
  Toolkit_Bootstrap_Runner_GetConfigDir_AppName,
  Toolkit_Bootstrap_Runner_GetConfigDir_BasePath,
  Toolkit_Bootstrap_Runner_GetConfigDir_DefaultPath,
  Toolkit_Bootstrap_Runner_GetConfigDir_HomeDirPath,
  Toolkit_Bootstrap_Runner_GetConfigDir_Returns,
  Toolkit_Bootstrap_Runner_GetConfigDir_WindowsBasePath,
  Toolkit_Bootstrap_Runner_GetConfigDir_WindowsDefaultPath,
  Toolkit_Bootstrap_Runner_GetDataDir_AppName,
  Toolkit_Bootstrap_Runner_GetDataDir_BasePath,
  Toolkit_Bootstrap_Runner_GetDataDir_DarwinBasePath,
  Toolkit_Bootstrap_Runner_GetDataDir_DarwinDataPath,
  Toolkit_Bootstrap_Runner_GetDataDir_DataPath,
  Toolkit_Bootstrap_Runner_GetDataDir_HomeDirPath,
  Toolkit_Bootstrap_Runner_GetDataDir_Returns,
  Toolkit_Bootstrap_Runner_GetDataDir_WindowsBasePath,
  Toolkit_Bootstrap_Runner_GetDataDir_WindowsDataPath,
  Toolkit_Bootstrap_Runner_GetProjectRoot_Content,
  Toolkit_Bootstrap_Runner_GetProjectRoot_Dir,
  Toolkit_Bootstrap_Runner_GetProjectRoot_FilePath,
  Toolkit_Bootstrap_Runner_GetProjectRoot_FirstPackageDir,
  Toolkit_Bootstrap_Runner_GetProjectRoot_Parent,
  Toolkit_Bootstrap_Runner_GetProjectRoot_Parsed,
  Toolkit_Bootstrap_Runner_GetProjectRoot_Returns,
  Toolkit_Bootstrap_Runner_LoadEnv_Content,
  Toolkit_Bootstrap_Runner_LoadEnv_Directory,
  Toolkit_Bootstrap_Runner_LoadEnv_FilePath,
  Toolkit_Bootstrap_Runner_LoadEnv_Key,
  Toolkit_Bootstrap_Runner_LoadEnv_Lines,
  Toolkit_Bootstrap_Runner_LoadEnv_Match,
  Toolkit_Bootstrap_Runner_LoadEnv_Returns,
  Toolkit_Bootstrap_Runner_LoadEnv_TrimmedLine,
  Toolkit_Bootstrap_Runner_LoadEnv_Value,
  Toolkit_Bootstrap_Runner_ResolveDir_AppName,
  Toolkit_Bootstrap_Runner_ResolveDir_Keyword,
  Toolkit_Bootstrap_Runner_ResolveDir_Returns,
  Toolkit_Bootstrap_Runner_ResolveFileDir_AppName,
  Toolkit_Bootstrap_Runner_ResolveFileDir_Directory,
  Toolkit_Bootstrap_Runner_ResolveFileDir_Filename,
  Toolkit_Bootstrap_Runner_ResolveFileDir_FilePath,
  Toolkit_Bootstrap_Runner_ResolveFileDir_Returns,
  Toolkit_Bootstrap_Runner_ResolveFileDir_SearchOrder,
  Toolkit_Bootstrap_Runner_ResolveFileDir_TypedLocation,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_AppName,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_Directory,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_Filename,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_FilePath,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_Results,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_Returns,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_SearchOrder,
  Toolkit_Bootstrap_Runner_ResolveFileDirs_TypedLocation,
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
class Runner {
  /**
   * Toolkit - Bootstrap - Get Config Dir.
   *
   * Returns the platform-specific configuration directory for the given
   * application name. Uses XDG_CONFIG_HOME on macOS and Linux, APPDATA
   * on Windows. Creates the directory if it does not exist.
   *
   * @param {Toolkit_Bootstrap_Runner_GetConfigDir_AppName} appName - App name.
   *
   * @returns {Toolkit_Bootstrap_Runner_GetConfigDir_Returns}
   *
   * @since 0.14.0
   */
  public static getConfigDir(appName: Toolkit_Bootstrap_Runner_GetConfigDir_AppName): Toolkit_Bootstrap_Runner_GetConfigDir_Returns {
    const homeDirPath: Toolkit_Bootstrap_Runner_GetConfigDir_HomeDirPath = homedir();

    if (platform() === 'win32') {
      const windowsDefaultPath: Toolkit_Bootstrap_Runner_GetConfigDir_WindowsDefaultPath = process.env['APPDATA'] ?? join(homeDirPath, 'AppData', 'Roaming');
      const windowsBasePath: Toolkit_Bootstrap_Runner_GetConfigDir_WindowsBasePath = join(windowsDefaultPath, appName);

      if (existsSync(windowsBasePath) === false) {
        mkdirSync(windowsBasePath, { recursive: true });
      }

      return windowsBasePath;
    }

    const defaultPath: Toolkit_Bootstrap_Runner_GetConfigDir_DefaultPath = process.env['XDG_CONFIG_HOME'] ?? join(homeDirPath, '.config');
    const basePath: Toolkit_Bootstrap_Runner_GetConfigDir_BasePath = join(defaultPath, appName);

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
   * @param {Toolkit_Bootstrap_Runner_GetDataDir_AppName} appName - App name.
   *
   * @returns {Toolkit_Bootstrap_Runner_GetDataDir_Returns}
   *
   * @since 0.14.0
   */
  public static getDataDir(appName: Toolkit_Bootstrap_Runner_GetDataDir_AppName): Toolkit_Bootstrap_Runner_GetDataDir_Returns {
    const homeDirPath: Toolkit_Bootstrap_Runner_GetDataDir_HomeDirPath = homedir();

    if (platform() === 'win32') {
      const windowsDataPath: Toolkit_Bootstrap_Runner_GetDataDir_WindowsDataPath = process.env['APPDATA'] ?? join(homeDirPath, 'AppData', 'Roaming');
      const windowsBasePath: Toolkit_Bootstrap_Runner_GetDataDir_WindowsBasePath = join(windowsDataPath, appName);

      if (existsSync(windowsBasePath) === false) {
        mkdirSync(windowsBasePath, { recursive: true });
      }

      return windowsBasePath;
    }

    if (platform() === 'darwin') {
      const darwinDataPath: Toolkit_Bootstrap_Runner_GetDataDir_DarwinDataPath = join(homeDirPath, 'Library', 'Application Support');
      const darwinBasePath: Toolkit_Bootstrap_Runner_GetDataDir_DarwinBasePath = join(darwinDataPath, appName);

      if (existsSync(darwinBasePath) === false) {
        mkdirSync(darwinBasePath, { recursive: true });
      }

      return darwinBasePath;
    }

    const dataPath: Toolkit_Bootstrap_Runner_GetDataDir_DataPath = process.env['XDG_DATA_HOME'] ?? join(homeDirPath, '.local', 'share');
    const basePath: Toolkit_Bootstrap_Runner_GetDataDir_BasePath = join(dataPath, appName);

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
   * @param {Toolkit_Bootstrap_Runner_GetCacheDir_AppName} appName - App name.
   *
   * @returns {Toolkit_Bootstrap_Runner_GetCacheDir_Returns}
   *
   * @since 0.14.0
   */
  public static getCacheDir(appName: Toolkit_Bootstrap_Runner_GetCacheDir_AppName): Toolkit_Bootstrap_Runner_GetCacheDir_Returns {
    const homeDirPath: Toolkit_Bootstrap_Runner_GetCacheDir_HomeDirPath = homedir();

    if (platform() === 'win32') {
      const windowsCachePath: Toolkit_Bootstrap_Runner_GetCacheDir_WindowsCachePath = join(process.env['LOCALAPPDATA'] ?? join(homeDirPath, 'AppData', 'Local'), 'Temp');
      const windowsBasePath: Toolkit_Bootstrap_Runner_GetCacheDir_WindowsBasePath = join(windowsCachePath, appName);

      if (existsSync(windowsBasePath) === false) {
        mkdirSync(windowsBasePath, { recursive: true });
      }

      return windowsBasePath;
    }

    if (platform() === 'darwin') {
      const darwinCachePath: Toolkit_Bootstrap_Runner_GetCacheDir_DarwinCachePath = join(homeDirPath, 'Library', 'Caches');
      const darwinBasePath: Toolkit_Bootstrap_Runner_GetCacheDir_DarwinBasePath = join(darwinCachePath, appName);

      if (existsSync(darwinBasePath) === false) {
        mkdirSync(darwinBasePath, { recursive: true });
      }

      return darwinBasePath;
    }

    const cachePath: Toolkit_Bootstrap_Runner_GetCacheDir_CachePath = process.env['XDG_CACHE_HOME'] ?? join(homeDirPath, '.cache');
    const basePath: Toolkit_Bootstrap_Runner_GetCacheDir_BasePath = join(cachePath, appName);

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
   * @returns {Toolkit_Bootstrap_Runner_GetProjectRoot_Returns}
   *
   * @since 0.14.0
   */
  public static getProjectRoot(): Toolkit_Bootstrap_Runner_GetProjectRoot_Returns {
    let dir: Toolkit_Bootstrap_Runner_GetProjectRoot_Dir = process.cwd();
    let firstPackageDir: Toolkit_Bootstrap_Runner_GetProjectRoot_FirstPackageDir = undefined;

    while (dir !== dirname(dir)) {
      const filePath: Toolkit_Bootstrap_Runner_GetProjectRoot_FilePath = join(dir, 'package.json');

      if (existsSync(filePath) === true) {
        if (firstPackageDir === undefined) {
          firstPackageDir = dir;
        }

        const content: Toolkit_Bootstrap_Runner_GetProjectRoot_Content = readFileSync(filePath, 'utf-8');
        const parsed: Toolkit_Bootstrap_Runner_GetProjectRoot_Parsed = JSON.parse(content) as Toolkit_Bootstrap_Runner_GetProjectRoot_Parsed;

        if (parsed['workspaces'] !== undefined) {
          return dir;
        }
      }

      const parent: Toolkit_Bootstrap_Runner_GetProjectRoot_Parent = dirname(dir);

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
   * @param {Toolkit_Bootstrap_Runner_LoadEnv_Directory} directory - Directory.
   *
   * @returns {Toolkit_Bootstrap_Runner_LoadEnv_Returns}
   *
   * @since 0.14.0
   */
  public static loadEnv(directory: Toolkit_Bootstrap_Runner_LoadEnv_Directory): Toolkit_Bootstrap_Runner_LoadEnv_Returns {
    const filePath: Toolkit_Bootstrap_Runner_LoadEnv_FilePath = join(directory, '.env');

    if (existsSync(filePath) === false) {
      return;
    }

    const content: Toolkit_Bootstrap_Runner_LoadEnv_Content = readFileSync(filePath, 'utf-8');
    const lines: Toolkit_Bootstrap_Runner_LoadEnv_Lines = content.split('\n');

    for (const line of lines) {
      const trimmedLine: Toolkit_Bootstrap_Runner_LoadEnv_TrimmedLine = line.trim();

      if (trimmedLine === '' || trimmedLine.startsWith('#') === true) {
        continue;
      }

      const match: Toolkit_Bootstrap_Runner_LoadEnv_Match = trimmedLine.match(LIB_REGEX_PATTERN_ENV_LINE);

      if (match === null) {
        continue;
      }

      const key: Toolkit_Bootstrap_Runner_LoadEnv_Key = match[1] ?? '';
      const value: Toolkit_Bootstrap_Runner_LoadEnv_Value = match[2] ?? '';

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
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDir_AppName}     appName     - App name.
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDir_Filename}    filename    - Filename.
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDir_SearchOrder} searchOrder - Search order.
   *
   * @returns {Toolkit_Bootstrap_Runner_ResolveFileDir_Returns}
   *
   * @since 0.14.0
   */
  public static resolveFileDir(appName: Toolkit_Bootstrap_Runner_ResolveFileDir_AppName, filename: Toolkit_Bootstrap_Runner_ResolveFileDir_Filename, searchOrder: Toolkit_Bootstrap_Runner_ResolveFileDir_SearchOrder): Toolkit_Bootstrap_Runner_ResolveFileDir_Returns {
    for (const location of searchOrder) {
      const typedLocation: Toolkit_Bootstrap_Runner_ResolveFileDir_TypedLocation = location;
      const directory: Toolkit_Bootstrap_Runner_ResolveFileDir_Directory = Runner.#resolveDir(appName, typedLocation);
      const filePath: Toolkit_Bootstrap_Runner_ResolveFileDir_FilePath = join(directory, filename);

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
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDirs_AppName}     appName     - App name.
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDirs_Filename}    filename    - Filename.
   * @param {Toolkit_Bootstrap_Runner_ResolveFileDirs_SearchOrder} searchOrder - Search order.
   *
   * @returns {Toolkit_Bootstrap_Runner_ResolveFileDirs_Returns}
   *
   * @since 0.14.0
   */
  public static resolveFileDirs(appName: Toolkit_Bootstrap_Runner_ResolveFileDirs_AppName, filename: Toolkit_Bootstrap_Runner_ResolveFileDirs_Filename, searchOrder: Toolkit_Bootstrap_Runner_ResolveFileDirs_SearchOrder): Toolkit_Bootstrap_Runner_ResolveFileDirs_Returns {
    const results: Toolkit_Bootstrap_Runner_ResolveFileDirs_Results = [];

    for (const location of searchOrder) {
      const typedLocation: Toolkit_Bootstrap_Runner_ResolveFileDirs_TypedLocation = location;
      const directory: Toolkit_Bootstrap_Runner_ResolveFileDirs_Directory = Runner.#resolveDir(appName, typedLocation);
      const filePath: Toolkit_Bootstrap_Runner_ResolveFileDirs_FilePath = join(directory, filename);

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
   * @param {Toolkit_Bootstrap_Runner_ResolveDir_AppName} appName - App name.
   * @param {Toolkit_Bootstrap_Runner_ResolveDir_Keyword} keyword - Keyword.
   *
   * @private
   *
   * @returns {Toolkit_Bootstrap_Runner_ResolveDir_Returns}
   *
   * @since 0.14.0
   */
  static #resolveDir(appName: Toolkit_Bootstrap_Runner_ResolveDir_AppName, keyword: Toolkit_Bootstrap_Runner_ResolveDir_Keyword): Toolkit_Bootstrap_Runner_ResolveDir_Returns {
    switch (keyword) {
      case 'cwd': {
        return process.cwd();
      }

      case 'config-dir': {
        return Runner.getConfigDir(appName);
      }

      case 'data-dir': {
        return Runner.getDataDir(appName);
      }

      case 'cache-dir': {
        return Runner.getCacheDir(appName);
      }

      case 'home': {
        return homedir();
      }

      case 'project-root': {
        return Runner.getProjectRoot() ?? process.cwd();
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

export default Runner;
