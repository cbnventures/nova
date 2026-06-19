import {
  arch,
  platform,
  release,
  version,
} from 'os';

import chalk from 'chalk';

import {
  libItemPrettyNamesBrand,
  libItemPrettyNamesCategory,
  libItemPrettyNamesColumnTitle,
  libItemPrettyNamesType,
} from '../../lib/item.js';
import {
  LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  LIB_REGEX_PATTERN_JAVA_VERSION_LINE,
  LIB_REGEX_PATTERN_LEADING_NON_DIGITS,
  LIB_REGEX_PATTERN_RUSTC_VERSION_LINE,
  LIB_REGEX_PATTERN_SEMVER,
} from '../../lib/regex.js';
import {
  executeShell,
  parseLinuxOsReleaseFile,
  parseWindowsRegistryQuery,
  pathExists,
} from '../../lib/utility.js';
import { MarkdownTable } from '../../toolkit/index.js';

import type {
  Cli_Utility_Version_Runner_GetBrowserVersion_AppPath,
  Cli_Utility_Version_Runner_GetBrowserVersion_Browsers,
  Cli_Utility_Version_Runner_GetBrowserVersion_CurrentPlatform,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinAppName,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinEntries,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasSystem,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasUser,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinKey,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinMacosAppVersion,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPairs,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPathResults,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSupportedBrowsers,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSystem,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinUser,
  Cli_Utility_Version_Runner_GetBrowserVersion_DarwinVersionResponse,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCliToolVersion,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandName,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandResponse,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxEntries,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxKey,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxPairs,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxSupportedBrowsers,
  Cli_Utility_Version_Runner_GetBrowserVersion_LinuxVersionResponse,
  Cli_Utility_Version_Runner_GetBrowserVersion_Returns,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsAppVersion,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsEntries,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExeName,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExePath,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsKey,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsPairs,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsQuery,
  Cli_Utility_Version_Runner_GetBrowserVersion_WindowsSupportedBrowsers,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_EnvResults,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Managers,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatch,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatchResult,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmVersion,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatch,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatchResult,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Returns,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatch,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatchResult,
  Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaVersion,
  Cli_Utility_Version_Runner_GetInterpreterVersion_InterpreterResults,
  Cli_Utility_Version_Runner_GetInterpreterVersion_Interpreters,
  Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatch,
  Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchBuild,
  Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchDistribution,
  Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchVersion,
  Cli_Utility_Version_Runner_GetInterpreterVersion_JavaVersion,
  Cli_Utility_Version_Runner_GetInterpreterVersion_Returns,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatch,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildDate,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildHash,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchSource,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchVersion,
  Cli_Utility_Version_Runner_GetInterpreterVersion_RustVersion,
  Cli_Utility_Version_Runner_GetNodeVersion_BunMatch,
  Cli_Utility_Version_Runner_GetNodeVersion_BunMatchResult,
  Cli_Utility_Version_Runner_GetNodeVersion_BunVersion,
  Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatch,
  Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatchResult,
  Cli_Utility_Version_Runner_GetNodeVersion_NodeJsVersion,
  Cli_Utility_Version_Runner_GetNodeVersion_NodeResults,
  Cli_Utility_Version_Runner_GetNodeVersion_NpmMatch,
  Cli_Utility_Version_Runner_GetNodeVersion_NpmMatchResult,
  Cli_Utility_Version_Runner_GetNodeVersion_NpmVersion,
  Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatch,
  Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatchResult,
  Cli_Utility_Version_Runner_GetNodeVersion_PnpmVersion,
  Cli_Utility_Version_Runner_GetNodeVersion_Returns,
  Cli_Utility_Version_Runner_GetNodeVersion_Tools,
  Cli_Utility_Version_Runner_GetNodeVersion_YarnMatch,
  Cli_Utility_Version_Runner_GetNodeVersion_YarnMatchResult,
  Cli_Utility_Version_Runner_GetNodeVersion_YarnVersion,
  Cli_Utility_Version_Runner_GetOsVersion_Architecture,
  Cli_Utility_Version_Runner_GetOsVersion_Build,
  Cli_Utility_Version_Runner_GetOsVersion_BuildVersion,
  Cli_Utility_Version_Runner_GetOsVersion_CurrentBuild,
  Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildEntry,
  Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildNumberEntry,
  Cli_Utility_Version_Runner_GetOsVersion_CurrentPlatform,
  Cli_Utility_Version_Runner_GetOsVersion_CurrentVersion,
  Cli_Utility_Version_Runner_GetOsVersion_DarwinResults,
  Cli_Utility_Version_Runner_GetOsVersion_DisplayVersionEntry,
  Cli_Utility_Version_Runner_GetOsVersion_Kernel,
  Cli_Utility_Version_Runner_GetOsVersion_Name,
  Cli_Utility_Version_Runner_GetOsVersion_OsRelease,
  Cli_Utility_Version_Runner_GetOsVersion_ProductName,
  Cli_Utility_Version_Runner_GetOsVersion_ProductNameEntry,
  Cli_Utility_Version_Runner_GetOsVersion_ProductVersion,
  Cli_Utility_Version_Runner_GetOsVersion_RegistryQuery,
  Cli_Utility_Version_Runner_GetOsVersion_ReleaseIdEntry,
  Cli_Utility_Version_Runner_GetOsVersion_Returns,
  Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevision,
  Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevisionEntry,
  Cli_Utility_Version_Runner_Print_Category,
  Cli_Utility_Version_Runner_Print_List,
  Cli_Utility_Version_Runner_Print_Returns,
  Cli_Utility_Version_Runner_Print_RowKey,
  Cli_Utility_Version_Runner_Print_RowsByKey,
  Cli_Utility_Version_Runner_Print_RowValue,
  Cli_Utility_Version_Runner_Print_Table,
  Cli_Utility_Version_Runner_Run_List,
  Cli_Utility_Version_Runner_Run_Options,
  Cli_Utility_Version_Runner_Run_Returns,
  Cli_Utility_Version_Runner_Run_Tasks,
} from '../../types/cli/utility/version.d.ts';

/**
 * CLI - Utility - Version.
 *
 * Detects and prints installed tool versions across five categories: Node.js, environment
 * managers, OS, browsers, and interpreters.
 *
 * @since 0.11.0
 */
export class Runner {
  /**
   * CLI - Utility - Version - Run.
   *
   * Dispatches version-detection tasks in parallel based on the
   * selected flags (--node, --os, etc.) and prints results as formatted tables.
   *
   * @param {Cli_Utility_Version_Runner_Run_Options} options - Options.
   *
   * @returns {Cli_Utility_Version_Runner_Run_Returns}
   *
   * @since 0.11.0
   */
  public static async run(options: Cli_Utility_Version_Runner_Run_Options): Cli_Utility_Version_Runner_Run_Returns {
    const tasks: Cli_Utility_Version_Runner_Run_Tasks = [];

    // Node.js + Tools.
    if (
      options['node'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(Runner.getNodeVersion().then((response) => [
        'node',
        response,
      ]));
    }

    // Environment Managers.
    if (
      options['env'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(Runner.getEnvironmentManagerVersion().then((response) => [
        'env',
        response,
      ]));
    }

    // Operating System.
    if (
      options['os'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(Runner.getOsVersion().then((response) => [
        'os',
        response,
      ]));
    }

    // Web Browsers.
    if (
      options['browser'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(Runner.getBrowserVersion().then((response) => [
        'browsers',
        response,
      ]));
    }

    // Interpreters / Runtimes.
    if (
      options['interpreter'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(Runner.getInterpreterVersion().then((response) => [
        'interpreters',
        response,
      ]));
    }

    // Run all async calls in parallel and convert the results back to the list.
    const list: Cli_Utility_Version_Runner_Run_List = Object.fromEntries(await Promise.all(tasks));

    // Print out the versions to the console.
    Runner.print(list);

    return;
  }

  /**
   * CLI - Utility - Version - Get Node Version.
   *
   * Shells out to node, npm, yarn, pnpm, and bun to capture their
   * semver strings. Returns only the tools that are actually installed.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_GetNodeVersion_Returns}
   *
   * @since 0.11.0
   */
  private static async getNodeVersion(): Cli_Utility_Version_Runner_GetNodeVersion_Returns {
    const nodeResults: Cli_Utility_Version_Runner_GetNodeVersion_NodeResults = await Promise.all([
      executeShell('node --version'),
      executeShell('npm --version'),
      executeShell('yarn --version'),
      executeShell('pnpm --version'),
      executeShell('bun --version'),
    ]);

    const nodeJsVersion: Cli_Utility_Version_Runner_GetNodeVersion_NodeJsVersion = nodeResults[0];
    const npmVersion: Cli_Utility_Version_Runner_GetNodeVersion_NpmVersion = nodeResults[1];
    const yarnVersion: Cli_Utility_Version_Runner_GetNodeVersion_YarnVersion = nodeResults[2];
    const pnpmVersion: Cli_Utility_Version_Runner_GetNodeVersion_PnpmVersion = nodeResults[3];
    const bunVersion: Cli_Utility_Version_Runner_GetNodeVersion_BunVersion = nodeResults[4];

    let tools: Cli_Utility_Version_Runner_GetNodeVersion_Tools = {};

    // Attempt to retrieve the Node.js version.
    if (nodeJsVersion['code'] === 0) {
      const nodeJsMatchResult: Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatchResult = nodeJsVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const nodeJsMatch: Cli_Utility_Version_Runner_GetNodeVersion_NodeJsMatch = (nodeJsMatchResult !== null) ? nodeJsMatchResult[1] : undefined;

      if (nodeJsMatch !== undefined) {
        tools = {
          ...tools,
          nodeJs: nodeJsMatch,
        };
      }
    }

    // Attempt to retrieve the Node Package Manager (npm) version.
    if (npmVersion['code'] === 0) {
      const npmMatchResult: Cli_Utility_Version_Runner_GetNodeVersion_NpmMatchResult = npmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const npmMatch: Cli_Utility_Version_Runner_GetNodeVersion_NpmMatch = (npmMatchResult !== null) ? npmMatchResult[1] : undefined;

      if (npmMatch !== undefined) {
        tools = {
          ...tools,
          npm: npmMatch,
        };
      }
    }

    // Attempt to retrieve the Yarn version.
    if (yarnVersion['code'] === 0) {
      const yarnMatchResult: Cli_Utility_Version_Runner_GetNodeVersion_YarnMatchResult = yarnVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const yarnMatch: Cli_Utility_Version_Runner_GetNodeVersion_YarnMatch = (yarnMatchResult !== null) ? yarnMatchResult[1] : undefined;

      if (yarnMatch !== undefined) {
        tools = {
          ...tools,
          yarn: yarnMatch,
        };
      }
    }

    // Attempt to retrieve the Performant Node Package Manager (pnpm) version.
    if (pnpmVersion['code'] === 0) {
      const pnpmMatchResult: Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatchResult = pnpmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const pnpmMatch: Cli_Utility_Version_Runner_GetNodeVersion_PnpmMatch = (pnpmMatchResult !== null) ? pnpmMatchResult[1] : undefined;

      if (pnpmMatch !== undefined) {
        tools = {
          ...tools,
          pnpm: pnpmMatch,
        };
      }
    }

    // Attempt to retrieve the Bun version.
    if (bunVersion['code'] === 0) {
      const bunMatchResult: Cli_Utility_Version_Runner_GetNodeVersion_BunMatchResult = bunVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const bunMatch: Cli_Utility_Version_Runner_GetNodeVersion_BunMatch = (bunMatchResult !== null) ? bunMatchResult[1] : undefined;

      if (bunMatch !== undefined) {
        tools = {
          ...tools,
          bun: bunMatch,
        };
      }
    }

    return tools;
  }

  /**
   * CLI - Utility - Version - Get Environment Manager Version.
   *
   * Detects nvm (POSIX or Windows variant) and Volta by shelling
   * out to each tool. Platform is checked to distinguish nvm-posix from nvm-windows.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Returns}
   *
   * @since 0.11.0
   */
  private static async getEnvironmentManagerVersion(): Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Returns {
    const envResults: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_EnvResults = await Promise.all([
      executeShell('nvm --version'),
      executeShell('volta --version'),
    ]);

    const nvmVersion: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmVersion = envResults[0];
    const voltaVersion: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaVersion = envResults[1];

    let managers: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_Managers = {};

    // Attempt to retrieve the Node Version Manager (nvm-posix) version.
    if (platform() !== 'win32' && nvmVersion['code'] === 0) {
      const nvmPosixMatchResult: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatchResult = nvmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const nvmPosixMatch: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmPosixMatch = (nvmPosixMatchResult !== null) ? nvmPosixMatchResult[1] : undefined;

      if (nvmPosixMatch !== undefined) {
        managers = {
          ...managers,
          nvmPosix: nvmPosixMatch,
        };
      }
    }

    // Attempt to retrieve the Node Version Manager for Windows (nvm-windows) version.
    if (platform() === 'win32' && nvmVersion['code'] === 0) {
      const nvmWindowsMatchResult: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatchResult = nvmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const nvmWindowsMatch: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_NvmWindowsMatch = (nvmWindowsMatchResult !== null) ? nvmWindowsMatchResult[1] : undefined;

      if (nvmWindowsMatch !== undefined) {
        managers = {
          ...managers,
          nvmWindows: nvmWindowsMatch,
        };
      }
    }

    // Attempt to retrieve the Volta version.
    if (voltaVersion['code'] === 0) {
      const voltaMatchResult: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatchResult = voltaVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const voltaMatch: Cli_Utility_Version_Runner_GetEnvironmentManagerVersion_VoltaMatch = (voltaMatchResult !== null) ? voltaMatchResult[1] : undefined;

      if (voltaMatch !== undefined) {
        managers = {
          ...managers,
          volta: voltaMatch,
        };
      }
    }

    return managers;
  }

  /**
   * CLI - Utility - Version - Get OS Version.
   *
   * Reads OS name, version, architecture, build, and kernel across
   * macOS, Windows, and Linux. Uses platform-specific commands and registry.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_GetOsVersion_Returns}
   *
   * @since 0.11.0
   */
  private static async getOsVersion(): Cli_Utility_Version_Runner_GetOsVersion_Returns {
    const currentPlatform: Cli_Utility_Version_Runner_GetOsVersion_CurrentPlatform = platform();
    const architecture: Cli_Utility_Version_Runner_GetOsVersion_Architecture = arch();
    const kernel: Cli_Utility_Version_Runner_GetOsVersion_Kernel = release();

    let name: Cli_Utility_Version_Runner_GetOsVersion_Name = currentPlatform;
    let currentVersion: Cli_Utility_Version_Runner_GetOsVersion_CurrentVersion = version();
    let build: Cli_Utility_Version_Runner_GetOsVersion_Build = '—';

    // macOS.
    if (currentPlatform === 'darwin') {
      const darwinResults: Cli_Utility_Version_Runner_GetOsVersion_DarwinResults = await Promise.all([
        executeShell('sw_vers -productName'),
        executeShell('sw_vers -productVersion'),
        executeShell('sw_vers -buildVersion'),
      ]);

      const productName: Cli_Utility_Version_Runner_GetOsVersion_ProductName = darwinResults[0];
      const productVersion: Cli_Utility_Version_Runner_GetOsVersion_ProductVersion = darwinResults[1];
      const buildVersion: Cli_Utility_Version_Runner_GetOsVersion_BuildVersion = darwinResults[2];

      name = productName['textOut'] ?? 'macOS';
      currentVersion = productVersion['textOut'] ?? currentVersion;
      build = buildVersion['textOut'] ?? '—';
    }

    // Windows.
    if (currentPlatform === 'win32') {
      const registryQuery: Cli_Utility_Version_Runner_GetOsVersion_RegistryQuery = await parseWindowsRegistryQuery('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion');
      const currentBuildEntry: Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildEntry = registryQuery['CurrentBuild'];
      const currentBuildNumberEntry: Cli_Utility_Version_Runner_GetOsVersion_CurrentBuildNumberEntry = registryQuery['CurrentBuildNumber'];
      const updateBuildRevisionEntry: Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevisionEntry = registryQuery['UBR'];
      const productNameEntry: Cli_Utility_Version_Runner_GetOsVersion_ProductNameEntry = registryQuery['ProductName'];
      const displayVersionEntry: Cli_Utility_Version_Runner_GetOsVersion_DisplayVersionEntry = registryQuery['DisplayVersion'];
      const releaseIdEntry: Cli_Utility_Version_Runner_GetOsVersion_ReleaseIdEntry = registryQuery['ReleaseId'];

      let currentBuild: Cli_Utility_Version_Runner_GetOsVersion_CurrentBuild = undefined;

      if (currentBuildEntry !== undefined) {
        currentBuild = currentBuildEntry['data'];
      } else if (currentBuildNumberEntry !== undefined) {
        currentBuild = currentBuildNumberEntry['data'];
      }

      const updateBuildRevision: Cli_Utility_Version_Runner_GetOsVersion_UpdateBuildRevision = (updateBuildRevisionEntry !== undefined) ? updateBuildRevisionEntry['data'] : undefined;

      name = (productNameEntry !== undefined) ? productNameEntry['data'] : 'Windows';

      if (displayVersionEntry !== undefined) {
        currentVersion = displayVersionEntry['data'];
      } else if (releaseIdEntry !== undefined) {
        currentVersion = releaseIdEntry['data'];
      }

      if (currentBuild !== undefined && updateBuildRevision !== undefined) {
        build = `${currentBuild}.${updateBuildRevision}`;
      } else if (currentBuild !== undefined) {
        build = currentBuild;
      } else {
        build = '—';
      }
    }

    // Linux.
    if (currentPlatform === 'linux') {
      const osRelease: Cli_Utility_Version_Runner_GetOsVersion_OsRelease = await parseLinuxOsReleaseFile();

      name = osRelease['NAME'] ?? 'Linux';
      currentVersion = osRelease['VERSION'] ?? '—';
      build = osRelease['BUILD_ID'] ?? '—';
    }

    return {
      name,
      version: currentVersion,
      architecture,
      build,
      kernel,
    };
  }

  /**
   * CLI - Utility - Version - Get Browser Version.
   *
   * Detects installed browsers and their versions using platform-specific
   * strategies: Info.plist on macOS, App Paths on Windows, and PATH on Linux.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_GetBrowserVersion_Returns}
   *
   * @since 0.11.0
   */
  private static async getBrowserVersion(): Cli_Utility_Version_Runner_GetBrowserVersion_Returns {
    const currentPlatform: Cli_Utility_Version_Runner_GetBrowserVersion_CurrentPlatform = platform();

    let browsers: Cli_Utility_Version_Runner_GetBrowserVersion_Browsers = {};

    // macOS (must have "./Contents/Info" file and "CFBundleShortVersionString" key).
    if (currentPlatform === 'darwin') {
      const darwinSupportedBrowsers: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSupportedBrowsers = {
        chrome: 'Google Chrome.app',
        safari: 'Safari.app',
        edge: 'Microsoft Edge.app',
        firefox: 'Firefox.app',
        opera: 'Opera.app',
        brave: 'Brave Browser.app',
        vivaldi: 'Vivaldi.app',
        libreWolf: 'LibreWolf.app',
      };
      const darwinPairs: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPairs = await Promise.allSettled(
        Object.entries(darwinSupportedBrowsers).map(async (supportedBrowser) => {
          const darwinKey: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinKey = supportedBrowser[0];
          const darwinAppName: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinAppName = supportedBrowser[1];
          const darwinSystem: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinSystem = `/Applications/${darwinAppName}`;
          const darwinUser: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinUser = `${process.env['HOME'] ?? ''}/Applications/${darwinAppName}`;

          const darwinPathResults: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinPathResults = await Promise.all([
            pathExists(darwinSystem),
            pathExists(darwinUser),
          ]);

          const darwinHasSystem: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasSystem = darwinPathResults[0];
          const darwinHasUser: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinHasUser = darwinPathResults[1];

          let appPath: Cli_Utility_Version_Runner_GetBrowserVersion_AppPath = null;

          if (darwinHasSystem === true) {
            appPath = darwinSystem;
          } else if (darwinHasUser === true) {
            appPath = darwinUser;
          }

          if (appPath === null) {
            return null;
          }

          const darwinVersionResponse: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinVersionResponse = await executeShell(`defaults read "${appPath}/Contents/Info" CFBundleShortVersionString`);

          if (darwinVersionResponse['code'] !== 0) {
            return null;
          }

          const darwinMacosAppVersion: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinMacosAppVersion = darwinVersionResponse['textOut'].trim();

          return [
            darwinKey,
            darwinMacosAppVersion,
          ] as const;
        }),
      );
      const darwinEntries: Cli_Utility_Version_Runner_GetBrowserVersion_DarwinEntries = darwinPairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(darwinEntries),
      };
    }

    // Windows (must be registered into "App Paths" and have "VersionInfo.ProductVersion" key).
    if (currentPlatform === 'win32') {
      const windowsSupportedBrowsers: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsSupportedBrowsers = {
        chrome: 'chrome.exe',
        edge: 'msedge.exe',
        firefox: 'firefox.exe',
        opera: 'opera.exe',
        brave: 'brave.exe',
        vivaldi: 'vivaldi.exe',
      };
      const windowsPairs: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsPairs = await Promise.allSettled(
        Object.entries(windowsSupportedBrowsers).map(async (supportedBrowser) => {
          const windowsKey: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsKey = supportedBrowser[0];
          const windowsExeName: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExeName = supportedBrowser[1];
          const windowsQuery: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsQuery = await parseWindowsRegistryQuery([
            `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${windowsExeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${windowsExeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${windowsExeName}`,
          ]);

          // Skip if the "(Default)" key does not exist.
          if (windowsQuery['(Default)'] === undefined) {
            return null;
          }

          // Access the "(Default)" key's data.
          let windowsExePath: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsExePath = windowsQuery['(Default)']['data'];

          // Remove double quotes from the ends of the string.
          windowsExePath = windowsExePath.replace(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

          // Get the product version through the PowerShell command via Command Prompt.
          const windowsAppVersion: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsAppVersion = (await executeShell(`powershell -Command "(Get-Item '${windowsExePath}').VersionInfo.ProductVersion"`))['textOut'].trim();

          return [
            windowsKey,
            windowsAppVersion,
          ] as const;
        }),
      );
      const windowsEntries: Cli_Utility_Version_Runner_GetBrowserVersion_WindowsEntries = windowsPairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(windowsEntries),
      };
    }

    // Linux (must have a command that exists in PATH and supports the "--version" argument).
    if (currentPlatform === 'linux') {
      const linuxSupportedBrowsers: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxSupportedBrowsers = {
        'chrome': 'google-chrome',
        'firefox': 'firefox',
        'brave': 'brave-browser',
        'vivaldi': 'vivaldi',
        'opera': 'opera',
        'edge': 'microsoft-edge',
        'libreWolf': 'librewolf',
      };
      const linuxPairs: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxPairs = await Promise.allSettled(
        Object.entries(linuxSupportedBrowsers).map(async (supportedBrowser) => {
          const linuxKey: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxKey = supportedBrowser[0];
          const linuxCommandName: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandName = supportedBrowser[1];
          const linuxCommandResponse: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCommandResponse = await executeShell(`command -v ${linuxCommandName}`);

          // The browser isn't installed.
          if (linuxCommandResponse['code'] !== 0) {
            return null;
          }

          const linuxVersionResponse: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxVersionResponse = await executeShell(`${linuxCommandName} --version`);

          if (linuxVersionResponse['code'] !== 0) {
            return null;
          }

          const linuxCliToolVersion: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxCliToolVersion = linuxVersionResponse['textOut'].trim().replace(LIB_REGEX_PATTERN_LEADING_NON_DIGITS, '');

          return [
            linuxKey,
            linuxCliToolVersion,
          ] as const;
        }),
      );
      const linuxEntries: Cli_Utility_Version_Runner_GetBrowserVersion_LinuxEntries = linuxPairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(linuxEntries),
      };
    }

    return browsers;
  }

  /**
   * CLI - Utility - Version - Get Interpreter Version.
   *
   * Shells out to java and rustc to parse their version output.
   * Captures distribution, build hash, and date metadata when available.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_GetInterpreterVersion_Returns}
   *
   * @since 0.11.0
   */
  private static async getInterpreterVersion(): Cli_Utility_Version_Runner_GetInterpreterVersion_Returns {
    const interpreterResults: Cli_Utility_Version_Runner_GetInterpreterVersion_InterpreterResults = await Promise.all([
      executeShell('java --version'),
      executeShell('rustc --version'),
    ]);

    const javaVersion: Cli_Utility_Version_Runner_GetInterpreterVersion_JavaVersion = interpreterResults[0];
    const rustVersion: Cli_Utility_Version_Runner_GetInterpreterVersion_RustVersion = interpreterResults[1];

    let interpreters: Cli_Utility_Version_Runner_GetInterpreterVersion_Interpreters = {};

    // Attempt to retrieve the Java version.
    if (javaVersion['code'] === 0) {
      const javaMatch: Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatch = javaVersion['textOut'].match(new RegExp(LIB_REGEX_PATTERN_JAVA_VERSION_LINE, 'mi'));

      if (javaMatch !== null) {
        const javaMatchVersion: Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchVersion = javaMatch[1] ?? 'N/A';
        const javaMatchDistribution: Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchDistribution = javaMatch[2] ?? 'N/A';
        const javaMatchBuild: Cli_Utility_Version_Runner_GetInterpreterVersion_JavaMatchBuild = javaMatch[4] ?? 'N/A';

        interpreters = {
          ...interpreters,
          java: `${javaMatchVersion} (distro: ${javaMatchDistribution}, build: ${javaMatchBuild})`,
        };
      }
    }

    // Attempt to retrieve the Rust version.
    if (rustVersion['code'] === 0) {
      const rustMatch: Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatch = rustVersion['textOut'].match(LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

      if (rustMatch !== null) {
        const rustMatchVersion: Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchVersion = rustMatch[1] ?? 'N/A';
        const rustMatchBuildHash: Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildHash = rustMatch[2] ?? 'N/A';
        const rustMatchBuildDate: Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchBuildDate = rustMatch[3] ?? 'N/A';
        const rustMatchSource: Cli_Utility_Version_Runner_GetInterpreterVersion_RustMatchSource = rustMatch[4] ?? 'rustup';

        interpreters = {
          ...interpreters,
          rust: `${rustMatchVersion} (build hash: ${rustMatchBuildHash}, build date: ${rustMatchBuildDate}, source: ${rustMatchSource})`,
        };
      }
    }

    return interpreters;
  }

  /**
   * CLI - Utility - Version - Print.
   *
   * Renders each version category as a labeled MarkdownTable with
   * pretty-printed brand names. Skips categories that have no detected tools.
   *
   * @param {Cli_Utility_Version_Runner_Print_List} list - List.
   *
   * @private
   *
   * @returns {Cli_Utility_Version_Runner_Print_Returns}
   *
   * @since 0.11.0
   */
  private static print(list: Cli_Utility_Version_Runner_Print_List): Cli_Utility_Version_Runner_Print_Returns {
    // Each category maps to a rows-by-key object used to render a single two-column table.
    for (const listEntry of Object.entries(list)) {
      const category: Cli_Utility_Version_Runner_Print_Category = listEntry[0];
      const rowsByKey: Cli_Utility_Version_Runner_Print_RowsByKey = listEntry[1];

      // Skip empty objects.
      if (Object.keys(rowsByKey).length === 0) {
        continue;
      }

      // Build the table.
      const table: Cli_Utility_Version_Runner_Print_Table = new MarkdownTable([
        chalk.bold.yellow(libItemPrettyNamesColumnTitle[`key-${category}`] ?? 'Key'),
        chalk.bold.yellow(libItemPrettyNamesColumnTitle[`value-${category}`] ?? 'Value'),
      ], {
        padDelimiterRow: false,
        minimumColumnWidth: 10,
      });

      // Push data into the table.
      for (const rowsByKeyEntry of Object.entries(rowsByKey)) {
        const rowKey: Cli_Utility_Version_Runner_Print_RowKey = rowsByKeyEntry[0];
        const rowValue: Cli_Utility_Version_Runner_Print_RowValue = rowsByKeyEntry[1];

        table.addRow([
          (
            libItemPrettyNamesBrand[rowKey]
            ?? libItemPrettyNamesType[rowKey]
            ?? chalk.grey(rowKey)
          ),
          rowValue,
        ]);
      }

      // Print the table.
      process.stdout.write(`${libItemPrettyNamesCategory[category] ?? chalk.grey(category)}\n`);
      process.stdout.write(`${table.render()}\n\n`);
    }

    return;
  }
}
