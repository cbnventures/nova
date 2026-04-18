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
  CliUtilityVersionGetBrowserVersionAppPath,
  CliUtilityVersionGetBrowserVersionBrowsers,
  CliUtilityVersionGetBrowserVersionCurrentPlatform,
  CliUtilityVersionGetBrowserVersionDarwinAppName,
  CliUtilityVersionGetBrowserVersionDarwinEntries,
  CliUtilityVersionGetBrowserVersionDarwinHasSystem,
  CliUtilityVersionGetBrowserVersionDarwinHasUser,
  CliUtilityVersionGetBrowserVersionDarwinKey,
  CliUtilityVersionGetBrowserVersionDarwinMacosAppVersion,
  CliUtilityVersionGetBrowserVersionDarwinPairs,
  CliUtilityVersionGetBrowserVersionDarwinPathResults,
  CliUtilityVersionGetBrowserVersionDarwinSupportedBrowsers,
  CliUtilityVersionGetBrowserVersionDarwinSystem,
  CliUtilityVersionGetBrowserVersionDarwinUser,
  CliUtilityVersionGetBrowserVersionDarwinVersionResponse,
  CliUtilityVersionGetBrowserVersionLinuxCliToolVersion,
  CliUtilityVersionGetBrowserVersionLinuxCommandName,
  CliUtilityVersionGetBrowserVersionLinuxCommandResponse,
  CliUtilityVersionGetBrowserVersionLinuxEntries,
  CliUtilityVersionGetBrowserVersionLinuxKey,
  CliUtilityVersionGetBrowserVersionLinuxPairs,
  CliUtilityVersionGetBrowserVersionLinuxSupportedBrowsers,
  CliUtilityVersionGetBrowserVersionLinuxVersionResponse,
  CliUtilityVersionGetBrowserVersionReturns,
  CliUtilityVersionGetBrowserVersionWindowsEntries,
  CliUtilityVersionGetBrowserVersionWindowsExeName,
  CliUtilityVersionGetBrowserVersionWindowsExePath,
  CliUtilityVersionGetBrowserVersionWindowsKey,
  CliUtilityVersionGetBrowserVersionWindowsPairs,
  CliUtilityVersionGetBrowserVersionWindowsQuery,
  CliUtilityVersionGetBrowserVersionWindowsSupportedBrowsers,
  CliUtilityVersionGetBrowserVersionWindowsWindowsAppVersion,
  CliUtilityVersionGetEnvironmentManagerVersionEnvResults,
  CliUtilityVersionGetEnvironmentManagerVersionManagers,
  CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatch,
  CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatchResult,
  CliUtilityVersionGetEnvironmentManagerVersionNvmVersion,
  CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatch,
  CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatchResult,
  CliUtilityVersionGetEnvironmentManagerVersionReturns,
  CliUtilityVersionGetEnvironmentManagerVersionVoltaMatch,
  CliUtilityVersionGetEnvironmentManagerVersionVoltaMatchResult,
  CliUtilityVersionGetEnvironmentManagerVersionVoltaVersion,
  CliUtilityVersionGetInterpreterVersionInterpreterResults,
  CliUtilityVersionGetInterpreterVersionInterpreters,
  CliUtilityVersionGetInterpreterVersionJavaMatch,
  CliUtilityVersionGetInterpreterVersionJavaMatchBuild,
  CliUtilityVersionGetInterpreterVersionJavaMatchDistribution,
  CliUtilityVersionGetInterpreterVersionJavaMatchVersion,
  CliUtilityVersionGetInterpreterVersionJavaVersion,
  CliUtilityVersionGetInterpreterVersionReturns,
  CliUtilityVersionGetInterpreterVersionRustMatch,
  CliUtilityVersionGetInterpreterVersionRustMatchBuildDate,
  CliUtilityVersionGetInterpreterVersionRustMatchBuildHash,
  CliUtilityVersionGetInterpreterVersionRustMatchSource,
  CliUtilityVersionGetInterpreterVersionRustMatchVersion,
  CliUtilityVersionGetInterpreterVersionRustVersion,
  CliUtilityVersionGetNodeVersionBunMatch,
  CliUtilityVersionGetNodeVersionBunMatchResult,
  CliUtilityVersionGetNodeVersionBunVersion,
  CliUtilityVersionGetNodeVersionNodeJsMatch,
  CliUtilityVersionGetNodeVersionNodeJsMatchResult,
  CliUtilityVersionGetNodeVersionNodeJsVersion,
  CliUtilityVersionGetNodeVersionNodeResults,
  CliUtilityVersionGetNodeVersionNpmMatch,
  CliUtilityVersionGetNodeVersionNpmMatchResult,
  CliUtilityVersionGetNodeVersionNpmVersion,
  CliUtilityVersionGetNodeVersionPnpmMatch,
  CliUtilityVersionGetNodeVersionPnpmMatchResult,
  CliUtilityVersionGetNodeVersionPnpmVersion,
  CliUtilityVersionGetNodeVersionReturns,
  CliUtilityVersionGetNodeVersionTools,
  CliUtilityVersionGetNodeVersionYarnMatch,
  CliUtilityVersionGetNodeVersionYarnMatchResult,
  CliUtilityVersionGetNodeVersionYarnVersion,
  CliUtilityVersionGetOsVersionArchitecture,
  CliUtilityVersionGetOsVersionBuild,
  CliUtilityVersionGetOsVersionBuildVersion,
  CliUtilityVersionGetOsVersionCurrentBuild,
  CliUtilityVersionGetOsVersionCurrentBuildEntry,
  CliUtilityVersionGetOsVersionCurrentBuildNumberEntry,
  CliUtilityVersionGetOsVersionCurrentPlatform,
  CliUtilityVersionGetOsVersionCurrentVersion,
  CliUtilityVersionGetOsVersionDarwinResults,
  CliUtilityVersionGetOsVersionDisplayVersionEntry,
  CliUtilityVersionGetOsVersionKernel,
  CliUtilityVersionGetOsVersionName,
  CliUtilityVersionGetOsVersionOsRelease,
  CliUtilityVersionGetOsVersionProductName,
  CliUtilityVersionGetOsVersionProductNameEntry,
  CliUtilityVersionGetOsVersionProductVersion,
  CliUtilityVersionGetOsVersionRegistryQuery,
  CliUtilityVersionGetOsVersionReleaseIdEntry,
  CliUtilityVersionGetOsVersionReturns,
  CliUtilityVersionGetOsVersionUpdateBuildRevision,
  CliUtilityVersionGetOsVersionUpdateBuildRevisionEntry,
  CliUtilityVersionPrintCategory,
  CliUtilityVersionPrintList,
  CliUtilityVersionPrintReturns,
  CliUtilityVersionPrintRowKey,
  CliUtilityVersionPrintRowsByKey,
  CliUtilityVersionPrintRowValue,
  CliUtilityVersionPrintTable,
  CliUtilityVersionRunList,
  CliUtilityVersionRunOptions,
  CliUtilityVersionRunReturns,
  CliUtilityVersionRunTasks,
} from '../../types/cli/utility/version.d.ts';

/**
 * CLI - Utility - Version.
 *
 * Detects and prints installed tool versions across five categories: Node.js, environment
 * managers, OS, browsers, and interpreters.
 *
 * @since 0.11.0
 */
export class CliUtilityVersion {
  /**
   * CLI - Utility - Version - Run.
   *
   * Dispatches version-detection tasks in parallel based on the
   * selected flags (--node, --os, etc.) and prints results as formatted tables.
   *
   * @param {CliUtilityVersionRunOptions} options - Options.
   *
   * @returns {CliUtilityVersionRunReturns}
   *
   * @since 0.11.0
   */
  public static async run(options: CliUtilityVersionRunOptions): CliUtilityVersionRunReturns {
    const tasks: CliUtilityVersionRunTasks = [];

    // Node.js + Tools.
    if (
      options['node'] === true
      || options['all'] === true
      || Object.keys(options).length === 0
    ) {
      tasks.push(CliUtilityVersion.getNodeVersion().then((response) => [
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
      tasks.push(CliUtilityVersion.getEnvironmentManagerVersion().then((response) => [
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
      tasks.push(CliUtilityVersion.getOsVersion().then((response) => [
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
      tasks.push(CliUtilityVersion.getBrowserVersion().then((response) => [
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
      tasks.push(CliUtilityVersion.getInterpreterVersion().then((response) => [
        'interpreters',
        response,
      ]));
    }

    // Run all async calls in parallel and convert the results back to the list.
    const list: CliUtilityVersionRunList = Object.fromEntries(await Promise.all(tasks));

    // Print out the versions to the console.
    CliUtilityVersion.print(list);

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
   * @returns {CliUtilityVersionGetNodeVersionReturns}
   *
   * @since 0.11.0
   */
  private static async getNodeVersion(): CliUtilityVersionGetNodeVersionReturns {
    const nodeResults: CliUtilityVersionGetNodeVersionNodeResults = await Promise.all([
      executeShell('node --version'),
      executeShell('npm --version'),
      executeShell('yarn --version'),
      executeShell('pnpm --version'),
      executeShell('bun --version'),
    ]);

    const nodeJsVersion: CliUtilityVersionGetNodeVersionNodeJsVersion = nodeResults[0];
    const npmVersion: CliUtilityVersionGetNodeVersionNpmVersion = nodeResults[1];
    const yarnVersion: CliUtilityVersionGetNodeVersionYarnVersion = nodeResults[2];
    const pnpmVersion: CliUtilityVersionGetNodeVersionPnpmVersion = nodeResults[3];
    const bunVersion: CliUtilityVersionGetNodeVersionBunVersion = nodeResults[4];

    let tools: CliUtilityVersionGetNodeVersionTools = {};

    // Attempt to retrieve the Node.js version.
    if (nodeJsVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetNodeVersionNodeJsMatchResult = nodeJsVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetNodeVersionNodeJsMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          nodeJs: match,
        };
      }
    }

    // Attempt to retrieve the Node Package Manager (npm) version.
    if (npmVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetNodeVersionNpmMatchResult = npmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetNodeVersionNpmMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          npm: match,
        };
      }
    }

    // Attempt to retrieve the Yarn version.
    if (yarnVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetNodeVersionYarnMatchResult = yarnVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetNodeVersionYarnMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          yarn: match,
        };
      }
    }

    // Attempt to retrieve the Performant Node Package Manager (pnpm) version.
    if (pnpmVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetNodeVersionPnpmMatchResult = pnpmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetNodeVersionPnpmMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          pnpm: match,
        };
      }
    }

    // Attempt to retrieve the Bun version.
    if (bunVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetNodeVersionBunMatchResult = bunVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetNodeVersionBunMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          bun: match,
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
   * @returns {CliUtilityVersionGetEnvironmentManagerVersionReturns}
   *
   * @since 0.11.0
   */
  private static async getEnvironmentManagerVersion(): CliUtilityVersionGetEnvironmentManagerVersionReturns {
    const envResults: CliUtilityVersionGetEnvironmentManagerVersionEnvResults = await Promise.all([
      executeShell('nvm --version'),
      executeShell('volta --version'),
    ]);

    const nvmVersion: CliUtilityVersionGetEnvironmentManagerVersionNvmVersion = envResults[0];
    const voltaVersion: CliUtilityVersionGetEnvironmentManagerVersionVoltaVersion = envResults[1];

    let managers: CliUtilityVersionGetEnvironmentManagerVersionManagers = {};

    // Attempt to retrieve the Node Version Manager (nvm-posix) version.
    if (platform() !== 'win32' && nvmVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatchResult = nvmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetEnvironmentManagerVersionNvmPosixMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        managers = {
          ...managers,
          nvmPosix: match,
        };
      }
    }

    // Attempt to retrieve the Node Version Manager for Windows (nvm-windows) version.
    if (platform() === 'win32' && nvmVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatchResult = nvmVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetEnvironmentManagerVersionNvmWindowsMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        managers = {
          ...managers,
          nvmWindows: match,
        };
      }
    }

    // Attempt to retrieve the Volta version.
    if (voltaVersion['code'] === 0) {
      const matchResult: CliUtilityVersionGetEnvironmentManagerVersionVoltaMatchResult = voltaVersion['textOut'].match(LIB_REGEX_PATTERN_SEMVER);
      const match: CliUtilityVersionGetEnvironmentManagerVersionVoltaMatch = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        managers = {
          ...managers,
          volta: match,
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
   * @returns {CliUtilityVersionGetOsVersionReturns}
   *
   * @since 0.11.0
   */
  private static async getOsVersion(): CliUtilityVersionGetOsVersionReturns {
    const currentPlatform: CliUtilityVersionGetOsVersionCurrentPlatform = platform();
    const architecture: CliUtilityVersionGetOsVersionArchitecture = arch();
    const kernel: CliUtilityVersionGetOsVersionKernel = release();

    let name: CliUtilityVersionGetOsVersionName = currentPlatform;
    let currentVersion: CliUtilityVersionGetOsVersionCurrentVersion = version();
    let build: CliUtilityVersionGetOsVersionBuild = '—';

    // macOS.
    if (currentPlatform === 'darwin') {
      const darwinResults: CliUtilityVersionGetOsVersionDarwinResults = await Promise.all([
        executeShell('sw_vers -productName'),
        executeShell('sw_vers -productVersion'),
        executeShell('sw_vers -buildVersion'),
      ]);

      const productName: CliUtilityVersionGetOsVersionProductName = darwinResults[0];
      const productVersion: CliUtilityVersionGetOsVersionProductVersion = darwinResults[1];
      const buildVersion: CliUtilityVersionGetOsVersionBuildVersion = darwinResults[2];

      name = productName['textOut'] ?? 'macOS';
      currentVersion = productVersion['textOut'] ?? currentVersion;
      build = buildVersion['textOut'] ?? '—';
    }

    // Windows.
    if (currentPlatform === 'win32') {
      const registryQuery: CliUtilityVersionGetOsVersionRegistryQuery = await parseWindowsRegistryQuery('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion');
      const currentBuildEntry: CliUtilityVersionGetOsVersionCurrentBuildEntry = registryQuery['CurrentBuild'];
      const currentBuildNumberEntry: CliUtilityVersionGetOsVersionCurrentBuildNumberEntry = registryQuery['CurrentBuildNumber'];
      const updateBuildRevisionEntry: CliUtilityVersionGetOsVersionUpdateBuildRevisionEntry = registryQuery['UBR'];
      const productNameEntry: CliUtilityVersionGetOsVersionProductNameEntry = registryQuery['ProductName'];
      const displayVersionEntry: CliUtilityVersionGetOsVersionDisplayVersionEntry = registryQuery['DisplayVersion'];
      const releaseIdEntry: CliUtilityVersionGetOsVersionReleaseIdEntry = registryQuery['ReleaseId'];

      let currentBuild: CliUtilityVersionGetOsVersionCurrentBuild = undefined;

      if (currentBuildEntry !== undefined) {
        currentBuild = currentBuildEntry['data'];
      } else if (currentBuildNumberEntry !== undefined) {
        currentBuild = currentBuildNumberEntry['data'];
      }

      const updateBuildRevision: CliUtilityVersionGetOsVersionUpdateBuildRevision = (updateBuildRevisionEntry !== undefined) ? updateBuildRevisionEntry['data'] : undefined;

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
      const osRelease: CliUtilityVersionGetOsVersionOsRelease = await parseLinuxOsReleaseFile();

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
   * @returns {CliUtilityVersionGetBrowserVersionReturns}
   *
   * @since 0.11.0
   */
  private static async getBrowserVersion(): CliUtilityVersionGetBrowserVersionReturns {
    const currentPlatform: CliUtilityVersionGetBrowserVersionCurrentPlatform = platform();

    let browsers: CliUtilityVersionGetBrowserVersionBrowsers = {};

    // macOS (must have "./Contents/Info" file and "CFBundleShortVersionString" key).
    if (currentPlatform === 'darwin') {
      const supportedBrowsers: CliUtilityVersionGetBrowserVersionDarwinSupportedBrowsers = {
        chrome: 'Google Chrome.app',
        safari: 'Safari.app',
        edge: 'Microsoft Edge.app',
        firefox: 'Firefox.app',
        opera: 'Opera.app',
        brave: 'Brave Browser.app',
        vivaldi: 'Vivaldi.app',
        libreWolf: 'LibreWolf.app',
      };
      const pairs: CliUtilityVersionGetBrowserVersionDarwinPairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key: CliUtilityVersionGetBrowserVersionDarwinKey = supportedBrowser[0];
          const appName: CliUtilityVersionGetBrowserVersionDarwinAppName = supportedBrowser[1];
          const system: CliUtilityVersionGetBrowserVersionDarwinSystem = `/Applications/${appName}`;
          const user: CliUtilityVersionGetBrowserVersionDarwinUser = `${process.env['HOME'] ?? ''}/Applications/${appName}`;

          const pathResults: CliUtilityVersionGetBrowserVersionDarwinPathResults = await Promise.all([
            pathExists(system),
            pathExists(user),
          ]);

          const hasSystem: CliUtilityVersionGetBrowserVersionDarwinHasSystem = pathResults[0];
          const hasUser: CliUtilityVersionGetBrowserVersionDarwinHasUser = pathResults[1];

          let appPath: CliUtilityVersionGetBrowserVersionAppPath = null;

          if (hasSystem === true) {
            appPath = system;
          } else if (hasUser === true) {
            appPath = user;
          }

          if (appPath === null) {
            return null;
          }

          const versionResponse: CliUtilityVersionGetBrowserVersionDarwinVersionResponse = await executeShell(`defaults read "${appPath}/Contents/Info" CFBundleShortVersionString`);

          if (versionResponse['code'] !== 0) {
            return null;
          }

          const macosAppVersion: CliUtilityVersionGetBrowserVersionDarwinMacosAppVersion = versionResponse['textOut'].trim();

          return [
            key,
            macosAppVersion,
          ] as const;
        }),
      );
      const entries: CliUtilityVersionGetBrowserVersionDarwinEntries = pairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(entries),
      };
    }

    // Windows (must be registered into "App Paths" and have "VersionInfo.ProductVersion" key).
    if (currentPlatform === 'win32') {
      const supportedBrowsers: CliUtilityVersionGetBrowserVersionWindowsSupportedBrowsers = {
        chrome: 'chrome.exe',
        edge: 'msedge.exe',
        firefox: 'firefox.exe',
        opera: 'opera.exe',
        brave: 'brave.exe',
        vivaldi: 'vivaldi.exe',
      };
      const pairs: CliUtilityVersionGetBrowserVersionWindowsPairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key: CliUtilityVersionGetBrowserVersionWindowsKey = supportedBrowser[0];
          const exeName: CliUtilityVersionGetBrowserVersionWindowsExeName = supportedBrowser[1];
          const query: CliUtilityVersionGetBrowserVersionWindowsQuery = await parseWindowsRegistryQuery([
            `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
          ]);

          // Skip if the "(Default)" key does not exist.
          if (query['(Default)'] === undefined) {
            return null;
          }

          // Access the "(Default)" key's data.
          let exePath: CliUtilityVersionGetBrowserVersionWindowsExePath = query['(Default)']['data'];

          // Remove double quotes from the ends of the string.
          exePath = exePath.replace(LIB_REGEX_PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

          // Get the product version through the PowerShell command via Command Prompt.
          const windowsAppVersion: CliUtilityVersionGetBrowserVersionWindowsWindowsAppVersion = (await executeShell(`powershell -Command "(Get-Item '${exePath}').VersionInfo.ProductVersion"`))['textOut'].trim();

          return [
            key,
            windowsAppVersion,
          ] as const;
        }),
      );
      const entries: CliUtilityVersionGetBrowserVersionWindowsEntries = pairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(entries),
      };
    }

    // Linux (must have a command that exists in PATH and supports the "--version" argument).
    if (currentPlatform === 'linux') {
      const supportedBrowsers: CliUtilityVersionGetBrowserVersionLinuxSupportedBrowsers = {
        'chrome': 'google-chrome',
        'firefox': 'firefox',
        'brave': 'brave-browser',
        'vivaldi': 'vivaldi',
        'opera': 'opera',
        'edge': 'microsoft-edge',
        'libreWolf': 'librewolf',
      };
      const pairs: CliUtilityVersionGetBrowserVersionLinuxPairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key: CliUtilityVersionGetBrowserVersionLinuxKey = supportedBrowser[0];
          const commandName: CliUtilityVersionGetBrowserVersionLinuxCommandName = supportedBrowser[1];
          const commandResponse: CliUtilityVersionGetBrowserVersionLinuxCommandResponse = await executeShell(`command -v ${commandName}`);

          // The browser isn't installed.
          if (commandResponse['code'] !== 0) {
            return null;
          }

          const versionResponse: CliUtilityVersionGetBrowserVersionLinuxVersionResponse = await executeShell(`${commandName} --version`);

          if (versionResponse['code'] !== 0) {
            return null;
          }

          const cliToolVersion: CliUtilityVersionGetBrowserVersionLinuxCliToolVersion = versionResponse['textOut'].trim().replace(LIB_REGEX_PATTERN_LEADING_NON_DIGITS, '');

          return [
            key,
            cliToolVersion,
          ] as const;
        }),
      );
      const entries: CliUtilityVersionGetBrowserVersionLinuxEntries = pairs
        .filter((result) => result.status === 'fulfilled')
        .map((result) => result.value)
        .filter((value) => value !== null);

      browsers = {
        ...browsers,
        ...Object.fromEntries(entries),
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
   * @returns {CliUtilityVersionGetInterpreterVersionReturns}
   *
   * @since 0.11.0
   */
  private static async getInterpreterVersion(): CliUtilityVersionGetInterpreterVersionReturns {
    const interpreterResults: CliUtilityVersionGetInterpreterVersionInterpreterResults = await Promise.all([
      executeShell('java --version'),
      executeShell('rustc --version'),
    ]);

    const javaVersion: CliUtilityVersionGetInterpreterVersionJavaVersion = interpreterResults[0];
    const rustVersion: CliUtilityVersionGetInterpreterVersionRustVersion = interpreterResults[1];

    let interpreters: CliUtilityVersionGetInterpreterVersionInterpreters = {};

    // Attempt to retrieve the Java version.
    if (javaVersion['code'] === 0) {
      const match: CliUtilityVersionGetInterpreterVersionJavaMatch = javaVersion['textOut'].match(new RegExp(LIB_REGEX_PATTERN_JAVA_VERSION_LINE, 'mi'));

      if (match !== null) {
        const matchVersion: CliUtilityVersionGetInterpreterVersionJavaMatchVersion = match[1] ?? 'N/A';
        const matchDistribution: CliUtilityVersionGetInterpreterVersionJavaMatchDistribution = match[2] ?? 'N/A';
        const matchBuild: CliUtilityVersionGetInterpreterVersionJavaMatchBuild = match[4] ?? 'N/A';

        interpreters = {
          ...interpreters,
          java: `${matchVersion} (distro: ${matchDistribution}, build: ${matchBuild})`,
        };
      }
    }

    // Attempt to retrieve the Rust version.
    if (rustVersion['code'] === 0) {
      const match: CliUtilityVersionGetInterpreterVersionRustMatch = rustVersion['textOut'].match(LIB_REGEX_PATTERN_RUSTC_VERSION_LINE);

      if (match !== null) {
        const matchVersion: CliUtilityVersionGetInterpreterVersionRustMatchVersion = match[1] ?? 'N/A';
        const matchBuildHash: CliUtilityVersionGetInterpreterVersionRustMatchBuildHash = match[2] ?? 'N/A';
        const matchBuildDate: CliUtilityVersionGetInterpreterVersionRustMatchBuildDate = match[3] ?? 'N/A';
        const matchSource: CliUtilityVersionGetInterpreterVersionRustMatchSource = match[4] ?? 'rustup';

        interpreters = {
          ...interpreters,
          rust: `${matchVersion} (build hash: ${matchBuildHash}, build date: ${matchBuildDate}, source: ${matchSource})`,
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
   * @param {CliUtilityVersionPrintList} list - List.
   *
   * @private
   *
   * @returns {CliUtilityVersionPrintReturns}
   *
   * @since 0.11.0
   */
  private static print(list: CliUtilityVersionPrintList): CliUtilityVersionPrintReturns {
    // Each category maps to a rows-by-key object used to render a single two-column table.
    for (const listEntry of Object.entries(list)) {
      const category: CliUtilityVersionPrintCategory = listEntry[0];
      const rowsByKey: CliUtilityVersionPrintRowsByKey = listEntry[1];

      // Skip empty objects.
      if (Object.keys(rowsByKey).length === 0) {
        continue;
      }

      // Build the table.
      const table: CliUtilityVersionPrintTable = new MarkdownTable([
        chalk.bold.yellow(libItemPrettyNamesColumnTitle[`key-${category}`] ?? 'Key'),
        chalk.bold.yellow(libItemPrettyNamesColumnTitle[`value-${category}`] ?? 'Value'),
      ], {
        padDelimiterRow: false,
        minimumColumnWidth: 10,
      });

      // Push data into the table.
      for (const rowsByKeyEntry of Object.entries(rowsByKey)) {
        const rowKey: CliUtilityVersionPrintRowKey = rowsByKeyEntry[0];
        const rowValue: CliUtilityVersionPrintRowValue = rowsByKeyEntry[1];

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
