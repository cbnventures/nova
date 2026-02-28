import {
  arch,
  platform,
  release,
  version,
} from 'os';

import chalk from 'chalk';

import {
  itemPrettyNamesBrand,
  itemPrettyNamesCategory,
  itemPrettyNamesColumnTitle,
  itemPrettyNamesType,
} from '@/lib/item.js';
import {
  PATTERN_DOUBLE_QUOTED_STRING_CAPTURE,
  PATTERN_JAVA_VERSION_LINE,
  PATTERN_LEADING_NON_DIGITS,
  PATTERN_RUSTC_VERSION_LINE,
  PATTERN_SEMVER,
} from '@/lib/regex.js';
import {
  executeShell,
  parseLinuxOsReleaseFile,
  parseWindowsRegistryQuery,
  pathExists,
} from '@/lib/utility.js';
import { MarkdownTable } from '@/toolkit/index.js';

import type {
  CLIUtilityVersionGetBrowserVersionAppPath,
  CLIUtilityVersionGetBrowserVersionBrowsers,
  CLIUtilityVersionGetBrowserVersionReturns,
  CLIUtilityVersionGetEnvironmentManagerVersionManagers,
  CLIUtilityVersionGetEnvironmentManagerVersionReturns,
  CLIUtilityVersionGetInterpreterVersionInterpreters,
  CLIUtilityVersionGetInterpreterVersionReturns,
  CLIUtilityVersionGetNodeVersionReturns,
  CLIUtilityVersionGetNodeVersionTools,
  CLIUtilityVersionGetOsVersionArchitecture,
  CLIUtilityVersionGetOsVersionBuild,
  CLIUtilityVersionGetOsVersionCurrentBuild,
  CLIUtilityVersionGetOsVersionKernel,
  CLIUtilityVersionGetOsVersionName,
  CLIUtilityVersionGetOsVersionReturns,
  CLIUtilityVersionGetOsVersionVersion,
  CLIUtilityVersionPrintList,
  CLIUtilityVersionPrintReturns,
  CLIUtilityVersionRunList,
  CLIUtilityVersionRunOptions,
  CLIUtilityVersionRunReturns,
  CLIUtilityVersionRunTasks,
} from '@/types/cli/utility/version.d.ts';

/**
 * CLI Utility - Version.
 *
 * @since 1.0.0
 */
export class CLIUtilityVersion {
  /**
   * CLI Utility - Version - Run.
   *
   * @param {CLIUtilityVersionRunOptions} options - Options.
   *
   * @returns {CLIUtilityVersionRunReturns}
   *
   * @since 1.0.0
   */
  public static async run(options: CLIUtilityVersionRunOptions): CLIUtilityVersionRunReturns {
    const tasks: CLIUtilityVersionRunTasks = [];

    // Node.js + Tools.
    if (options.node === true || options.all === true || Object.keys(options).length === 0) {
      tasks.push(CLIUtilityVersion.getNodeVersion().then((response) => ['node', response]));
    }

    // Environment Managers.
    if (options.env === true || options.all === true || Object.keys(options).length === 0) {
      tasks.push(CLIUtilityVersion.getEnvironmentManagerVersion().then((response) => ['env', response]));
    }

    // Operating System.
    if (options.os === true || options.all === true || Object.keys(options).length === 0) {
      tasks.push(CLIUtilityVersion.getOsVersion().then((response) => ['os', response]));
    }

    // Web Browsers.
    if (options.browser === true || options.all === true || Object.keys(options).length === 0) {
      tasks.push(CLIUtilityVersion.getBrowserVersion().then((response) => ['browsers', response]));
    }

    // Interpreters / Runtimes.
    if (options.interpreter === true || options.all === true || Object.keys(options).length === 0) {
      tasks.push(CLIUtilityVersion.getInterpreterVersion().then((response) => ['interpreters', response]));
    }

    // Run all async calls in parallel and convert the results back to the list.
    const results = await Promise.all(tasks);
    const list = Object.fromEntries(results) as CLIUtilityVersionRunList;

    // Print out the versions to the console.
    CLIUtilityVersion.print(list);
  }

  /**
   * CLI Utility - Version - Get node version.
   *
   * @private
   *
   * @returns {CLIUtilityVersionGetNodeVersionReturns}
   *
   * @since 1.0.0
   */
  private static async getNodeVersion(): CLIUtilityVersionGetNodeVersionReturns {
    const [
      nodeJsVersion,
      npmVersion,
      yarnVersion,
      pnpmVersion,
      bunVersion,
    ] = await Promise.all([
      executeShell('node --version'),
      executeShell('npm --version'),
      executeShell('yarn --version'),
      executeShell('pnpm --version'),
      executeShell('bun --version'),
    ]);

    let tools: CLIUtilityVersionGetNodeVersionTools = {};

    // Attempt to retrieve the Node.js version.
    if (nodeJsVersion.code === 0) {
      const matchResult = nodeJsVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          nodeJs: match,
        };
      }
    }

    // Attempt to retrieve the Node Package Manager (npm) version.
    if (npmVersion.code === 0) {
      const matchResult = npmVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          npm: match,
        };
      }
    }

    // Attempt to retrieve the Yarn version.
    if (yarnVersion.code === 0) {
      const matchResult = yarnVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          yarn: match,
        };
      }
    }

    // Attempt to retrieve the Performant Node Package Manager (pnpm) version.
    if (pnpmVersion.code === 0) {
      const matchResult = pnpmVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        tools = {
          ...tools,
          pnpm: match,
        };
      }
    }

    // Attempt to retrieve the Bun version.
    if (bunVersion.code === 0) {
      const matchResult = bunVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

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
   * CLI Utility - Version - Get environment manager version.
   *
   * @private
   *
   * @returns {CLIUtilityVersionGetEnvironmentManagerVersionReturns}
   *
   * @since 1.0.0
   */
  private static async getEnvironmentManagerVersion(): CLIUtilityVersionGetEnvironmentManagerVersionReturns {
    const [nvmVersion, voltaVersion] = await Promise.all([
      executeShell('nvm --version'),
      executeShell('volta --version'),
    ]);

    let managers: CLIUtilityVersionGetEnvironmentManagerVersionManagers = {};

    // Attempt to retrieve the Node Version Manager (nvm-posix) version.
    if (platform() !== 'win32' && nvmVersion.code === 0) {
      const matchResult = nvmVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        managers = {
          ...managers,
          nvmPosix: match,
        };
      }
    }

    // Attempt to retrieve the Node Version Manager for Windows (nvm-windows) version.
    if (platform() === 'win32' && nvmVersion.code === 0) {
      const matchResult = nvmVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

      if (match !== undefined) {
        managers = {
          ...managers,
          nvmWindows: match,
        };
      }
    }

    // Attempt to retrieve the Volta version.
    if (voltaVersion.code === 0) {
      const matchResult = voltaVersion.textOut.match(PATTERN_SEMVER);
      const match = (matchResult !== null) ? matchResult[1] : undefined;

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
   * CLI Utility - Version - Get os version.
   *
   * @private
   *
   * @returns {CLIUtilityVersionGetOsVersionReturns}
   *
   * @since 1.0.0
   */
  private static async getOsVersion(): CLIUtilityVersionGetOsVersionReturns {
    const currentPlatform = platform();
    const architecture: CLIUtilityVersionGetOsVersionArchitecture = arch();
    const kernel: CLIUtilityVersionGetOsVersionKernel = release();

    let name: CLIUtilityVersionGetOsVersionName = currentPlatform;
    let currentVersion: CLIUtilityVersionGetOsVersionVersion = version();
    let build: CLIUtilityVersionGetOsVersionBuild = '—';

    // macOS.
    if (currentPlatform === 'darwin') {
      const [productName, productVersion, buildVersion] = await Promise.all([
        executeShell('sw_vers -productName'),
        executeShell('sw_vers -productVersion'),
        executeShell('sw_vers -buildVersion'),
      ]);

      name = productName.textOut ?? 'macOS';
      currentVersion = productVersion.textOut ?? currentVersion;
      build = buildVersion.textOut ?? '—';
    }

    // Windows.
    if (currentPlatform === 'win32') {
      const registryQuery = await parseWindowsRegistryQuery('HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion');
      const currentBuildEntry = registryQuery['CurrentBuild'];
      const currentBuildNumberEntry = registryQuery['CurrentBuildNumber'];
      const updateBuildRevisionEntry = registryQuery['UBR'];
      const productNameEntry = registryQuery['ProductName'];
      const displayVersionEntry = registryQuery['DisplayVersion'];
      const releaseIdEntry = registryQuery['ReleaseId'];

      let currentBuild: CLIUtilityVersionGetOsVersionCurrentBuild;

      if (currentBuildEntry !== undefined) {
        currentBuild = currentBuildEntry.data;
      } else if (currentBuildNumberEntry !== undefined) {
        currentBuild = currentBuildNumberEntry.data;
      }
      const updateBuildRevision = (updateBuildRevisionEntry !== undefined) ? updateBuildRevisionEntry.data : undefined;

      name = (productNameEntry !== undefined) ? productNameEntry.data : 'Windows';

      if (displayVersionEntry !== undefined) {
        currentVersion = displayVersionEntry.data;
      } else if (releaseIdEntry !== undefined) {
        currentVersion = releaseIdEntry.data;
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
      const osRelease = await parseLinuxOsReleaseFile();

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
   * CLI Utility - Version - Get browser version.
   *
   * @private
   *
   * @returns {CLIUtilityVersionGetBrowserVersionReturns}
   *
   * @since 1.0.0
   */
  private static async getBrowserVersion(): CLIUtilityVersionGetBrowserVersionReturns {
    const currentPlatform = platform();

    let browsers: CLIUtilityVersionGetBrowserVersionBrowsers = {};

    // macOS (must have "./Contents/Info" file and "CFBundleShortVersionString" key).
    if (currentPlatform === 'darwin') {
      const supportedBrowsers = {
        chrome: 'Google Chrome.app',
        safari: 'Safari.app',
        edge: 'Microsoft Edge.app',
        firefox: 'Firefox.app',
        opera: 'Opera.app',
        brave: 'Brave Browser.app',
        vivaldi: 'Vivaldi.app',
        libreWolf: 'LibreWolf.app',
      };
      const pairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key = supportedBrowser[0];
          const appName = supportedBrowser[1];
          const system = `/Applications/${appName}`;
          const user = `${process.env['HOME'] ?? ''}/Applications/${appName}`;

          const [hasSystem, hasUser] = await Promise.all([pathExists(system), pathExists(user)]);

          let appPath: CLIUtilityVersionGetBrowserVersionAppPath = null;

          if (hasSystem === true) {
            appPath = system;
          } else if (hasUser === true) {
            appPath = user;
          }

          if (appPath === null) {
            return null;
          }

          const versionResponse = await executeShell(`defaults read "${appPath}/Contents/Info" CFBundleShortVersionString`);

          if (versionResponse.code !== 0) {
            return null;
          }

          const version = versionResponse.textOut.trim();

          return [key, version] as const;
        }),
      );
      const entries = pairs
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
      const supportedBrowsers = {
        chrome: 'chrome.exe',
        edge: 'msedge.exe',
        firefox: 'firefox.exe',
        opera: 'opera.exe',
        brave: 'brave.exe',
        vivaldi: 'vivaldi.exe',
      };
      const pairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key = supportedBrowser[0];
          const exeName = supportedBrowser[1];
          const query = await parseWindowsRegistryQuery([
            `HKEY_CURRENT_USER\\Software\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
            `HKEY_LOCAL_MACHINE\\SOFTWARE\\WOW6432Node\\Microsoft\\Windows\\CurrentVersion\\App Paths\\${exeName}`,
          ]);

          // Skip if the "(Default)" key does not exist.
          if (query['(Default)'] === undefined) {
            return null;
          }

          // Access the "(Default)" key's data.
          let exePath = query['(Default)'].data;

          // Remove double quotes from the ends of the string.
          exePath = exePath.replace(PATTERN_DOUBLE_QUOTED_STRING_CAPTURE, '$1');

          // Get the product version through the PowerShell command via Command Prompt.
          const version = (await executeShell(`powershell -Command "(Get-Item '${exePath}').VersionInfo.ProductVersion"`)).textOut.trim();

          return [key, version] as const;
        }),
      );
      const entries = pairs
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
      const supportedBrowsers = {
        'chrome': 'google-chrome',
        'firefox': 'firefox',
        'brave': 'brave-browser',
        'vivaldi': 'vivaldi',
        'opera': 'opera',
        'edge': 'microsoft-edge',
        'libreWolf': 'librewolf',
      };
      const pairs = await Promise.allSettled(
        Object.entries(supportedBrowsers).map(async (supportedBrowser) => {
          const key = supportedBrowser[0];
          const commandName = supportedBrowser[1];
          const commandResponse = await executeShell(`command -v ${commandName}`);

          // The browser isn't installed.
          if (commandResponse.code !== 0) {
            return null;
          }

          const versionResponse = await executeShell(`${commandName} --version`);

          if (versionResponse.code !== 0) {
            return null;
          }

          const version = versionResponse.textOut.trim().replace(PATTERN_LEADING_NON_DIGITS, '');

          return [key, version] as const;
        }),
      );
      const entries = pairs
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
   * CLI Utility - Version - Get interpreter version.
   *
   * @private
   *
   * @returns {CLIUtilityVersionGetInterpreterVersionReturns}
   *
   * @since 1.0.0
   */
  private static async getInterpreterVersion(): CLIUtilityVersionGetInterpreterVersionReturns {
    const [javaVersion, rustVersion] = await Promise.all([
      executeShell('java --version'),
      executeShell('rustc --version'),
    ]);

    let interpreters: CLIUtilityVersionGetInterpreterVersionInterpreters = {};

    // Attempt to retrieve the Java version.
    if (javaVersion.code === 0) {
      const match = javaVersion.textOut.match(new RegExp(PATTERN_JAVA_VERSION_LINE, 'mi'));

      if (match !== null) {
        const matchVersion = match[1] ?? 'N/A';
        const matchDistribution = match[2] ?? 'N/A';
        const matchBuild = match[4] ?? 'N/A';

        interpreters = {
          ...interpreters,
          java: `${matchVersion} (distro: ${matchDistribution}, build: ${matchBuild})`,
        };
      }
    }

    // Attempt to retrieve the Rust version.
    if (rustVersion.code === 0) {
      const match = rustVersion.textOut.match(PATTERN_RUSTC_VERSION_LINE);

      if (match !== null) {
        const matchVersion = match[1] ?? 'N/A';
        const matchBuildHash = match[2] ?? 'N/A';
        const matchBuildDate = match[3] ?? 'N/A';
        const matchSource = match[4] ?? 'rustup';

        interpreters = {
          ...interpreters,
          rust: `${matchVersion} (build hash: ${matchBuildHash}, build date: ${matchBuildDate}, source: ${matchSource})`,
        };
      }
    }

    return interpreters;
  }

  /**
   * CLI Utility - Version - Print.
   *
   * @param {CLIUtilityVersionPrintList} list - List.
   *
   * @private
   *
   * @returns {CLIUtilityVersionPrintReturns}
   *
   * @since 1.0.0
   */
  private static print(list: CLIUtilityVersionPrintList): CLIUtilityVersionPrintReturns {
    // Each category maps to a rows-by-key object used to render a single two-column table.
    for (const [category, rowsByKey] of Object.entries(list)) {
      // Skip empty objects.
      if (Object.keys(rowsByKey).length === 0) {
        continue;
      }

      // Build the table.
      const table = new MarkdownTable([
        chalk.bold.yellow(itemPrettyNamesColumnTitle[`key-${category}`] ?? 'Key'),
        chalk.bold.yellow(itemPrettyNamesColumnTitle[`value-${category}`] ?? 'Value'),
      ], {
        padDelimiterRow: false,
        minimumColumnWidth: 10,
      });

      // Push data into the table.
      for (const [rowKey, rowValue] of Object.entries(rowsByKey)) {
        table.addRow([
          itemPrettyNamesBrand[rowKey] ?? itemPrettyNamesType[rowKey] ?? chalk.grey(rowKey),
          rowValue,
        ]);
      }

      // Print the table.
      process.stdout.write(`${itemPrettyNamesCategory[category] ?? chalk.grey(category)}\n`);
      process.stdout.write(`${table.render()}\n\n`);
    }
  }
}
