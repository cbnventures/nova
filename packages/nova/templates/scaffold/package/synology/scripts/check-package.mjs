import {
  access,
  readdir,
  readFile,
  stat,
} from 'node:fs/promises';
import {
  dirname,
  join,
  resolve,
} from 'node:path';
import { fileURLToPath } from 'node:url';
import { gunzipSync } from 'node:zlib';

import { listTar } from './archive.mjs';
import {
  desktopIconSizes,
  lifecycleScripts,
  requiredInfoKeys,
  usesUsrLocalLink,
} from './package-constants.mjs';
import { readPngDimensions } from './png.mjs';
import {
  dsmVersionPattern,
  infoLinePattern,
  wizardFilePattern,
  wizardScriptPattern,
} from './regex.mjs';

/**
 * Check Package - Script Path.
 *
 * Resolves this module for workspace discovery and direct-execution detection.
 * Importing the module exposes validation without running the command wrapper.
 *
 * @since UNRELEASED
 */
const scriptPath = fileURLToPath(import.meta.url);

/**
 * Check Package - Executable Permission Digits.
 *
 * Lists octal permission digits whose execute bit is set.
 * String inspection avoids bitwise operations while covering all three classes.
 *
 * @since UNRELEASED
 */
const executablePermissionDigits = new Set([
  '1',
  '3',
  '5',
  '7',
]);

/**
 * Check Package - Is Executable Mode.
 *
 * Checks the owner, group, and other execute bits without bitwise operators.
 * At least one executable class is sufficient for the structural archive check.
 *
 * @param {number} mode - Mode.
 *
 * @returns {boolean}
 *
 * @since UNRELEASED
 */
function isExecutableMode(mode) {
  const permissions = mode.toString(8).slice(-3);

  return [...permissions].some((permission) => executablePermissionDigits.has(permission));
}

/**
 * Check Package - Path Exists.
 *
 * Reports whether one optional package path exists.
 * Access errors are intentionally treated as absence for optional inputs.
 *
 * @param {string} filePath - File path.
 *
 * @returns {Promise<boolean>}
 *
 * @since UNRELEASED
 */
async function pathExists(filePath) {
  try {
    await access(filePath);

    return true;
  } catch {
    return false;
  }
}

/**
 * Check Package - Parse Info.
 *
 * Parses Synology's key="value" metadata and rejects malformed or duplicate
 * assignments.
 *
 * @param {string} content - Content.
 *
 * @returns {SynologyPackage_InfoFields}
 *
 * @since UNRELEASED
 */
function parseInfo(content) {
  const fields = new Map();
  const lines = content.split('\n');

  for (let lineIndex = 0; lineIndex < lines.length; lineIndex += 1) {
    const line = (lines[lineIndex] ?? '').trim();

    if (line === '') {
      continue;
    }

    const match = infoLinePattern.exec(line);

    if (
      match === null
      || match[1] === undefined
      || match[2] === undefined
    ) {
      throw new Error(`INFO line ${lineIndex + 1} must use key="value" syntax.`);
    }

    if (fields.has(match[1]) === true) {
      throw new Error(`INFO key "${match[1]}" is declared more than once.`);
    }

    fields.set(match[1], match[2]);
  }

  return fields;
}

/**
 * Check Package - Validate Info.
 *
 * Validates the required DSM 7 fields, minimum OS build, noarch target, and
 * package identity shared with package.json.
 *
 * @param {string} content     - Content.
 * @param {string} packageName - Package name.
 * @param {string} version     - Version.
 *
 * @returns {SynologyPackage_InfoFields}
 *
 * @since UNRELEASED
 */
function validateInfo(content, packageName, version) {
  const fields = parseInfo(content);

  for (const requiredInfoKey of requiredInfoKeys) {
    const value = fields.get(requiredInfoKey);

    if (value === undefined || value.trim() === '') {
      throw new Error(`INFO must contain a non-empty "${requiredInfoKey}" field.`);
    }
  }

  if (fields.get('package') !== packageName) {
    throw new Error('INFO package must match package.json name.');
  }

  if (fields.get('version') !== version) {
    throw new Error('INFO version must match package.json version.');
  }

  if (fields.get('arch') !== 'noarch') {
    throw new Error('The starter package must keep INFO arch="noarch".');
  }

  if (fields.get('thirdparty') !== 'yes') {
    throw new Error('INFO thirdparty must be "yes" for this package.');
  }

  const minimumVersion = fields.get('os_min_ver') ?? '';
  const minimumVersionMatch = dsmVersionPattern.exec(minimumVersion);

  if (minimumVersionMatch === null) {
    throw new Error('INFO os_min_ver must use the DSM X.Y-BUILD format.');
  }

  const major = Number.parseInt(minimumVersionMatch[1] ?? '0', 10);
  const minor = Number.parseInt(minimumVersionMatch[2] ?? '0', 10);
  const build = Number.parseInt(minimumVersionMatch[3] ?? '0', 10);
  const isDsm7OrNewer = major > 7
    || (
      major === 7
      && (
        minor > 0
        || build >= 40000
      )
    );

  if (isDsm7OrNewer === false) {
    throw new Error('INFO os_min_ver must be at least 7.0-40000.');
  }

  return fields;
}

/**
 * Check Package - Validate Png.
 *
 * Confirms one package icon is a square PNG at its required DSM size.
 * Both the compact and Package Center artwork use this shared validator.
 *
 * @param {Buffer} image    - Image.
 * @param {number} size     - Size.
 * @param {string} fileName - File name.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function validatePng(image, size, fileName) {
  const dimensions = readPngDimensions(image);

  if (dimensions.width !== size || dimensions.height !== size) {
    throw new Error(`${fileName} must be exactly ${size}x${size} pixels.`);
  }

  return;
}

/**
 * Check Package - Validate Privilege.
 *
 * Requires DSM 7 lifecycle scripts and payload files to run as the package user.
 * Root execution is deliberately rejected by requiring the exact DSM default.
 *
 * @param {Buffer|string} content - Content.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function validatePrivilege(content) {
  const parsed = JSON.parse(content.toString());

  if (
    parsed === null
    || typeof parsed !== 'object'
    || Reflect.get(parsed, 'defaults') === null
    || typeof Reflect.get(parsed, 'defaults') !== 'object'
    || Reflect.get(Reflect.get(parsed, 'defaults'), 'run-as') !== 'package'
  ) {
    throw new Error('conf/privilege must set defaults.run-as to "package".');
  }

  return;
}

/**
 * Check Package - Validate Resource.
 *
 * Validates an optional resource object and, when selected by the scaffold,
 * requires its /usr/local linker to expose the example service.
 *
 * @param {Buffer|string} content - Content.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function validateResource(content) {
  const parsed = JSON.parse(content.toString());

  if (
    parsed === null
    || typeof parsed !== 'object'
    || Array.isArray(parsed) === true
  ) {
    throw new Error('conf/resource must contain a JSON object.');
  }

  if (usesUsrLocalLink === false) {
    return;
  }

  const linker = Reflect.get(parsed, 'usr-local-linker');
  const binaries = (linker !== null && typeof linker === 'object') ? Reflect.get(linker, 'bin') : undefined;

  if (Array.isArray(binaries) === false || binaries.includes('bin/example-service') === false) {
    throw new Error('conf/resource must link bin/example-service through usr-local-linker.');
  }

  return;
}

/**
 * Check Package - Is Plain Object.
 *
 * Reports whether a parsed JSON value is an object rather than null or an array.
 * Wizard and desktop configuration checks share this guard.
 *
 * @param {unknown} value - Value.
 *
 * @returns {boolean}
 *
 * @since UNRELEASED
 */
function isPlainObject(value) {
  return (
    value !== null
    && typeof value === 'object'
    && Array.isArray(value) === false
  );
}

/**
 * Check Package - Is Non Empty String.
 *
 * Reports whether a parsed JSON value is a string with visible content.
 * Whitespace-only titles, keys, and paths count as missing.
 *
 * @param {unknown} value - Value.
 *
 * @returns {boolean}
 *
 * @since UNRELEASED
 */
function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Check Package - Validate Wizard File.
 *
 * Validates one JSON wizard file: a list of steps, each with a title and items,
 * where every field DSM exports to the lifecycle scripts has a key.
 *
 * @param {Buffer|string} content  - Content.
 * @param {string}        fileName - File name.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function validateWizardFile(content, fileName) {
  const steps = JSON.parse(content.toString());

  if (Array.isArray(steps) === false || steps.length === 0) {
    throw new Error(`WIZARD_UIFILES/${fileName} must contain a non-empty JSON array of steps.`);
  }

  for (const step of steps) {
    if (
      isPlainObject(step) === false
      || isNonEmptyString(Reflect.get(step, 'step_title')) === false
      || Array.isArray(Reflect.get(step, 'items')) === false
    ) {
      throw new Error(`Every step in WIZARD_UIFILES/${fileName} needs a "step_title" and an "items" array.`);
    }

    for (const item of Reflect.get(step, 'items')) {
      const subitems = (isPlainObject(item) === true) ? Reflect.get(item, 'subitems') : undefined;

      if (subitems === undefined) {
        continue;
      }

      if (
        Array.isArray(subitems) === false
        || subitems.some((subitem) => isPlainObject(subitem) === false || isNonEmptyString(Reflect.get(subitem, 'key')) === false) === true
      ) {
        throw new Error(`Every field in WIZARD_UIFILES/${fileName} needs a "key" for the lifecycle scripts.`);
      }
    }
  }

  return;
}

/**
 * Check Package - Check Wizard Files.
 *
 * Validates the optional WIZARD_UIFILES directory and returns the file names
 * the built archive must contain.
 *
 * @param {string} workspaceDirectory - Workspace directory.
 *
 * @returns {Promise<string[]>}
 *
 * @since UNRELEASED
 */
async function checkWizardFiles(workspaceDirectory) {
  const wizardDirectory = join(workspaceDirectory, 'WIZARD_UIFILES');

  if (await pathExists(wizardDirectory) === false) {
    return [];
  }

  const wizardFiles = await readdir(wizardDirectory);

  for (const wizardFile of wizardFiles) {
    if (wizardFilePattern.test(wizardFile) === true) {
      validateWizardFile(await readFile(join(wizardDirectory, wizardFile)), wizardFile);
    } else if (wizardScriptPattern.test(wizardFile) === false) {
      throw new Error(`WIZARD_UIFILES/${wizardFile} is not an install, upgrade, or uninstall wizard file.`);
    }
  }

  return wizardFiles;
}

/**
 * Check Package - Check Desktop Icons.
 *
 * Requires one square PNG per DSM size for an icon path with a "{0}" size
 * placeholder, so no menu or taskbar view shows a gap.
 *
 * @param {string}  uiDirectory     - Ui directory.
 * @param {string}  uiDirectoryName - Ui directory name.
 * @param {string}  entryId         - Entry id.
 * @param {unknown} icon            - Icon.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function checkDesktopIcons(uiDirectory, uiDirectoryName, entryId, icon) {
  if (typeof icon !== 'string' || icon.includes('{0}') === false) {
    throw new Error(`src/${uiDirectoryName}/config entry "${entryId}" needs an "icon" path with a "{0}" size placeholder.`);
  }

  for (const desktopIconSize of desktopIconSizes) {
    const iconPath = icon.replace('{0}', String(desktopIconSize));

    validatePng(await readFile(join(uiDirectory, iconPath)), desktopIconSize, `src/${uiDirectoryName}/${iconPath}`);
  }

  return;
}

/**
 * Check Package - Check Desktop Entry.
 *
 * Validates one ui/config entry. A "url" entry opens a link; an "app" entry
 * opens the native window class named by "appWindow". Returns whether the entry
 * appears in the DSM main menu.
 *
 * @param {string} uiDirectory     - Ui directory.
 * @param {string} uiDirectoryName - Ui directory name.
 * @param {string} entryId         - Entry id.
 * @param {object} entry           - Entry.
 *
 * @returns {Promise<boolean>}
 *
 * @since UNRELEASED
 */
async function checkDesktopEntry(uiDirectory, uiDirectoryName, entryId, entry) {
  const type = (isPlainObject(entry) === true) ? Reflect.get(entry, 'type') : undefined;

  if (isNonEmptyString(type) === false || isNonEmptyString(Reflect.get(entry, 'title')) === false) {
    throw new Error(`src/${uiDirectoryName}/config entry "${entryId}" needs a "type" and a "title".`);
  }

  const texts = Reflect.get(entry, 'texts');

  if (texts !== undefined && await pathExists(join(uiDirectory, texts, 'enu', 'strings')) === false) {
    throw new Error(`src/${uiDirectoryName}/config entry "${entryId}" needs src/${uiDirectoryName}/${texts}/enu/strings.`);
  }

  if (type === 'url' && isNonEmptyString(Reflect.get(entry, 'url')) === false) {
    throw new Error(`src/${uiDirectoryName}/config entry "${entryId}" needs a "url".`);
  }

  if (type === 'app' && isNonEmptyString(Reflect.get(entry, 'appWindow')) === false) {
    throw new Error(`src/${uiDirectoryName}/config entry "${entryId}" needs an "appWindow" class.`);
  }

  if (type !== 'url' && type !== 'app') {
    return false;
  }

  await checkDesktopIcons(uiDirectory, uiDirectoryName, entryId, Reflect.get(entry, 'icon'));

  return true;
}

/**
 * Check Package - Check Desktop UI.
 *
 * Validates the INFO dsmuidir folder: every ui/config section and entry, the
 * JavaScript files the sections name, executable CGI scripts, and the apps named
 * by dsmappname. Returns the folder, if any.
 *
 * @param {string}                     workspaceDirectory - Workspace directory.
 * @param {SynologyPackage_InfoFields} fields             - Fields.
 *
 * @returns {Promise<string|undefined>}
 *
 * @since UNRELEASED
 */
async function checkDesktopUi(workspaceDirectory, fields) {
  const uiDirectoryName = fields.get('dsmuidir');

  if (uiDirectoryName === undefined) {
    return undefined;
  }

  if (
    isNonEmptyString(uiDirectoryName) === false
    || uiDirectoryName.includes(':') === true
    || uiDirectoryName.includes(' ') === true
  ) {
    throw new Error('INFO dsmuidir must name one folder inside src.');
  }

  const uiDirectory = join(workspaceDirectory, 'src', uiDirectoryName);
  const config = JSON.parse(await readFile(join(uiDirectory, 'config'), 'utf-8'));
  const menuEntryIds = [];

  if (isPlainObject(config) === false) {
    throw new Error(`src/${uiDirectoryName}/config must contain a JSON object.`);
  }

  for (const sectionName of Object.keys(config)) {
    const section = Reflect.get(config, sectionName);

    if (isPlainObject(section) === false) {
      throw new Error(`src/${uiDirectoryName}/config section "${sectionName}" must be an object.`);
    }

    if (sectionName !== '.url' && await pathExists(join(uiDirectory, sectionName)) === false) {
      throw new Error(`src/${uiDirectoryName}/config loads "${sectionName}", which is missing from src/${uiDirectoryName}.`);
    }

    for (const entryId of Object.keys(section)) {
      if (await checkDesktopEntry(uiDirectory, uiDirectoryName, entryId, Reflect.get(section, entryId)) === true) {
        menuEntryIds.push(entryId);
      }
    }
  }

  if (menuEntryIds.length === 0) {
    throw new Error(`src/${uiDirectoryName}/config must declare at least one "app" or "url" entry.`);
  }

  for (const appName of (fields.get('dsmappname') ?? '').split(' ').filter((name) => name !== '')) {
    if (menuEntryIds.includes(appName) === false) {
      throw new Error(`INFO dsmappname "${appName}" must match an app in src/${uiDirectoryName}/config.`);
    }
  }

  for (const uiFile of await readdir(uiDirectory)) {
    if (uiFile.endsWith('.cgi') === true && isExecutableMode((await stat(join(uiDirectory, uiFile))).mode) === false) {
      throw new Error(`src/${uiDirectoryName}/${uiFile} must be executable; DSM runs it as a CGI script.`);
    }
  }

  return uiDirectoryName;
}

/**
 * Check Package - Require Tar Entry.
 *
 * Finds one named archive entry and reports a package-specific error when it
 * is absent.
 *
 * @param {SynologyPackage_ListedTarEntries} entries - Entries.
 * @param {string}                           name    - Name.
 *
 * @returns {SynologyPackage_ListedTarEntry}
 *
 * @since UNRELEASED
 */
function requireTarEntry(entries, name) {
  const entry = entries.find((candidate) => candidate.name === name);

  if (entry === undefined) {
    throw new Error(`The SPK archive is missing "${name}".`);
  }

  return entry;
}

/**
 * Check Package - Validate Archive.
 *
 * Validates the final SPK inventory, lifecycle permissions, configuration,
 * icons, and compressed payload.
 *
 * @param {string}           spkPath         - Spk path.
 * @param {string}           infoContent     - Info content.
 * @param {boolean}          hasResource     - Has resource.
 * @param {string[]}         wizardFiles     - Wizard files.
 * @param {string|undefined} uiDirectoryName - Ui directory name.
 *
 * @returns {Promise<void>}
 *
 * @since UNRELEASED
 */
async function validateArchive(spkPath, infoContent, hasResource, wizardFiles, uiDirectoryName) {
  const entries = listTar(await readFile(spkPath));
  const infoEntry = requireTarEntry(entries, 'INFO');
  const payloadEntry = requireTarEntry(entries, 'package.tgz');
  const privilegeEntry = requireTarEntry(entries, 'conf/privilege');
  const iconEntry = requireTarEntry(entries, 'PACKAGE_ICON.PNG');
  const largeIconEntry = requireTarEntry(entries, 'PACKAGE_ICON_256.PNG');

  if (infoEntry.data.toString('utf-8') !== infoContent) {
    throw new Error('The SPK INFO file differs from the source INFO file.');
  }

  validatePrivilege(privilegeEntry.data);
  validatePng(iconEntry.data, 64, 'PACKAGE_ICON.PNG');
  validatePng(largeIconEntry.data, 256, 'PACKAGE_ICON_256.PNG');

  for (const lifecycleScript of lifecycleScripts) {
    const scriptEntry = requireTarEntry(entries, `scripts/${lifecycleScript}`);

    if (isExecutableMode(scriptEntry.mode) === false) {
      throw new Error(`SPK lifecycle script "${lifecycleScript}" must be executable.`);
    }
  }

  if (hasResource === true) {
    validateResource(requireTarEntry(entries, 'conf/resource').data);
  }

  for (const wizardFile of wizardFiles) {
    requireTarEntry(entries, `WIZARD_UIFILES/${wizardFile}`);
  }

  const payloadEntries = listTar(gunzipSync(payloadEntry.data));
  const serviceEntry = requireTarEntry(payloadEntries, 'bin/example-service');

  if (isExecutableMode(serviceEntry.mode) === false) {
    throw new Error('package.tgz bin/example-service must be executable.');
  }

  if (uiDirectoryName !== undefined) {
    requireTarEntry(payloadEntries, `${uiDirectoryName}/config`);
  }

  return;
}

/**
 * Check Package - Check Package.
 *
 * Validates source files and, when present, the built noarch SPK archive.
 * Source-only checks also run before the first package build exists.
 *
 * @param {string} workspaceDirectory - Workspace directory.
 *
 * @returns {Promise<string|undefined>}
 *
 * @since UNRELEASED
 */
export async function checkPackage(workspaceDirectory) {
  const packageJsonRaw = await readFile(join(workspaceDirectory, 'package.json'), 'utf-8');
  const packageJson = JSON.parse(packageJsonRaw);
  const packageName = packageJson['name'];
  const version = packageJson['version'];

  if (typeof packageName !== 'string' || packageName.trim() === '') {
    throw new Error('package.json must contain a non-empty package name.');
  }

  if (typeof version !== 'string' || version.trim() === '') {
    throw new Error('package.json must contain a non-empty package version.');
  }

  const infoContent = await readFile(join(workspaceDirectory, 'INFO'), 'utf-8');

  const infoFields = validateInfo(infoContent, packageName, version);

  validatePrivilege(await readFile(join(workspaceDirectory, 'conf', 'privilege')));
  validatePng(await readFile(join(workspaceDirectory, 'PACKAGE_ICON.PNG')), 64, 'PACKAGE_ICON.PNG');
  validatePng(await readFile(join(workspaceDirectory, 'PACKAGE_ICON_256.PNG')), 256, 'PACKAGE_ICON_256.PNG');

  const resourcePath = join(workspaceDirectory, 'conf', 'resource');
  const hasResource = await pathExists(resourcePath);

  if (usesUsrLocalLink === true && hasResource === false) {
    throw new Error('The selected /usr/local linker option requires conf/resource.');
  }

  if (hasResource === true) {
    validateResource(await readFile(resourcePath));
  }

  for (const lifecycleScript of lifecycleScripts) {
    const scriptPathToCheck = join(workspaceDirectory, 'scripts', lifecycleScript);
    const scriptStats = await stat(scriptPathToCheck);

    if (scriptStats.isFile() === false || isExecutableMode(scriptStats.mode) === false) {
      throw new Error(`Lifecycle script "${lifecycleScript}" must be an executable regular file.`);
    }
  }

  const serviceStats = await stat(join(workspaceDirectory, 'src', 'bin', 'example-service'));

  if (serviceStats.isFile() === false || isExecutableMode(serviceStats.mode) === false) {
    throw new Error('src/bin/example-service must be an executable regular file.');
  }

  const wizardFiles = await checkWizardFiles(workspaceDirectory);
  const uiDirectoryName = await checkDesktopUi(workspaceDirectory, infoFields);
  const releaseDirectory = join(workspaceDirectory, 'build', 'release');

  if (await pathExists(releaseDirectory) === false) {
    return undefined;
  }

  const releaseFiles = await readdir(releaseDirectory);
  const spkFiles = releaseFiles.filter((releaseFile) => releaseFile.endsWith('.spk'));
  const expectedFileName = `${packageName}-${version}-noarch.spk`;

  if (spkFiles.length !== 1 || spkFiles[0] !== expectedFileName) {
    throw new Error(`build/release must contain exactly "${expectedFileName}".`);
  }

  const spkPath = join(releaseDirectory, expectedFileName);

  await validateArchive(spkPath, infoContent, hasResource, wizardFiles, uiDirectoryName);

  return spkPath;
}

if (process.argv[1] !== undefined && resolve(process.argv[1]) === scriptPath) {
  const workspaceDirectory = resolve(process.argv[2] ?? join(dirname(scriptPath), '..'));
  const spkPath = await checkPackage(workspaceDirectory);
  const suffix = (spkPath === undefined) ? ' Source files are ready to build.' : ` Archive: ${spkPath}`;

  process.stdout.write(`Synology package is structurally valid.${suffix}\n`);
}
