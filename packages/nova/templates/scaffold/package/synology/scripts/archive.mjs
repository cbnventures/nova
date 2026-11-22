import {
  readdir,
  readFile,
  stat,
} from 'node:fs/promises';
import { posix } from 'node:path';

/**
 * Archive - Tar Block Size.
 *
 * Uses the fixed record size required by the ustar format.
 * Every header and content padding boundary aligns to this value.
 *
 * @since UNRELEASED
 */
const tarBlockSize = 512;

/**
 * Archive - Tar Permission Modulus.
 *
 * Selects the low nine permission bits without relying on bitwise operators.
 * Archive entries therefore retain only portable owner, group, and other modes.
 *
 * @since UNRELEASED
 */
const tarPermissionModulus = Number.parseInt('1000', 8);

/**
 * Archive - Write String.
 *
 * Writes one UTF-8 ustar header field and rejects values that do not fit.
 * The explicit bounds prevent a field from overwriting its neighbor.
 *
 * @param {Buffer} buffer - Buffer.
 * @param {number} offset - Offset.
 * @param {number} length - Length.
 * @param {string} value  - Value.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function writeString(buffer, offset, length, value) {
  if (Buffer.byteLength(value) > length) {
    throw new Error(`Tar header value "${value}" exceeds ${length} bytes.`);
  }

  buffer.write(value, offset, length, 'utf-8');

  return;
}

/**
 * Archive - Write Octal.
 *
 * Writes one null-terminated numeric ustar field.
 * Padding keeps numeric fields compatible with traditional tar readers.
 *
 * @param {Buffer} buffer - Buffer.
 * @param {number} offset - Offset.
 * @param {number} length - Length.
 * @param {number} value  - Value.
 *
 * @returns {void}
 *
 * @since UNRELEASED
 */
function writeOctal(buffer, offset, length, value) {
  const octal = value.toString(8).padStart(length - 1, '0');

  if (octal.length >= length) {
    throw new Error(`Tar numeric value "${value}" exceeds ${length} bytes.`);
  }

  writeString(buffer, offset, length, `${octal}\0`);

  return;
}

/**
 * Archive - Read String.
 *
 * Reads one null-terminated ustar header field.
 * Missing terminators consume the complete fixed-width field.
 *
 * @param {Buffer} buffer - Buffer.
 * @param {number} offset - Offset.
 * @param {number} length - Length.
 *
 * @returns {string}
 *
 * @since UNRELEASED
 */
function readString(buffer, offset, length) {
  const field = buffer.subarray(offset, offset + length);
  const nullIndex = field.indexOf(0);

  return field.subarray(0, (nullIndex === -1) ? field.length : nullIndex).toString('utf-8');
}

/**
 * Archive - Read Octal.
 *
 * Reads one octal ustar header field.
 * Empty numeric fields resolve to zero for conventional tar defaults.
 *
 * @param {Buffer} buffer - Buffer.
 * @param {number} offset - Offset.
 * @param {number} length - Length.
 *
 * @returns {number}
 *
 * @since UNRELEASED
 */
function readOctal(buffer, offset, length) {
  const value = readString(buffer, offset, length).trim();

  return (value === '') ? 0 : Number.parseInt(value, 8);
}

/**
 * Archive - Build Header.
 *
 * Builds one deterministic ustar header with fixed ownership and timestamp.
 * Stable metadata makes repeated package builds byte-for-byte reproducible.
 *
 * @param {SynologyPackage_TarEntry} entry - Entry.
 *
 * @returns {Buffer}
 *
 * @since UNRELEASED
 */
function buildHeader(entry) {
  const header = Buffer.alloc(tarBlockSize);
  const size = (entry.type === '5') ? 0 : entry.data.length;

  writeString(header, 0, 100, entry.name);
  writeOctal(header, 100, 8, entry.mode % tarPermissionModulus);
  writeOctal(header, 108, 8, 0);
  writeOctal(header, 116, 8, 0);
  writeOctal(header, 124, 12, size);
  writeOctal(header, 136, 12, 0);

  header.fill(32, 148, 156);

  writeString(header, 156, 1, entry.type);

  writeString(header, 257, 6, 'ustar\0');
  writeString(header, 263, 2, '00');

  let checksum = 0;

  for (const byte of header) {
    checksum += byte;
  }

  writeString(header, 148, 8, `${checksum.toString(8).padStart(6, '0')}\0 `);

  return header;
}

/**
 * Archive - Create Tar.
 *
 * Serializes regular files and directories into a deterministic ustar archive.
 * Two empty blocks terminate the archive according to the format contract.
 *
 * @param {SynologyPackage_TarEntries} entries - Entries.
 *
 * @returns {Buffer}
 *
 * @since UNRELEASED
 */
export function createTar(entries) {
  const chunks = [];

  for (const entry of entries) {
    const header = buildHeader(entry);
    const paddingLength = (entry.type === '5') ? 0 : (tarBlockSize - (entry.data.length % tarBlockSize)) % tarBlockSize;

    chunks.push(header);

    if (entry.type !== '5') {
      chunks.push(entry.data);

      if (paddingLength > 0) {
        chunks.push(Buffer.alloc(paddingLength));
      }
    }
  }

  chunks.push(Buffer.alloc(tarBlockSize * 2));

  return Buffer.concat(chunks);
}

/**
 * Archive - Collect Tar Entries.
 *
 * Walks one directory in lexical order and preserves permission bits while
 * rejecting links and special files.
 *
 * @param {string} rootDirectory - Root directory.
 * @param {string} archivePrefix - Archive prefix.
 *
 * @returns {Promise<SynologyPackage_TarEntries>}
 *
 * @since UNRELEASED
 */
export async function collectTarEntries(rootDirectory, archivePrefix = '') {
  /**
   * Archive - Collect Tar Entries - Entries.
   *
   * Accumulates the directory records before returning the completed archive
   * inventory.
   *
   * @type {SynologyPackage_TarEntries}
   *
   * @since UNRELEASED
   */
  const entries = [];

  /**
   * Archive - Collect Tar Entries - Walk.
   *
   * Adds one directory's descendants to the collected ustar entries.
   * Lexical traversal produces stable entry ordering across builds.
   *
   * @param {string} directoryPath - Directory path.
   * @param {string} relativePath  - Relative path.
   *
   * @returns {Promise<void>}
   *
   * @since UNRELEASED
   */
  async function walk(directoryPath, relativePath) {
    const directoryEntries = await readdir(directoryPath, { withFileTypes: true });

    directoryEntries.sort((left, right) => left.name.localeCompare(right.name));

    for (const directoryEntry of directoryEntries) {
      const sourcePath = posix.join(directoryPath.split('\\').join('/'), directoryEntry.name);
      const childRelativePath = (relativePath === '') ? directoryEntry.name : posix.join(relativePath, directoryEntry.name);
      const archivePath = (archivePrefix === '') ? childRelativePath : posix.join(archivePrefix, childRelativePath);
      const sourceStats = await stat(sourcePath);

      if (directoryEntry.isDirectory() === true) {
        entries.push({
          name: `${archivePath}/`,
          mode: sourceStats.mode,
          type: '5',
          data: Buffer.alloc(0),
        });

        await walk(sourcePath, childRelativePath);
      } else if (directoryEntry.isFile() === true) {
        entries.push({
          name: archivePath,
          mode: sourceStats.mode,
          type: '0',
          data: await readFile(sourcePath),
        });
      } else {
        throw new Error(`Cannot archive "${sourcePath}": only regular files and directories are supported.`);
      }
    }

    return;
  }

  await walk(rootDirectory, '');

  return entries;
}

/**
 * Archive - List Tar.
 *
 * Parses a ustar archive, verifies header checksums, and returns every entry.
 * Entry data remains buffered so callers can validate nested payload archives.
 *
 * @param {Buffer} archive - Archive.
 *
 * @returns {SynologyPackage_ListedTarEntries}
 *
 * @since UNRELEASED
 */
export function listTar(archive) {
  /**
   * Archive - List Tar - Entries.
   *
   * Accumulates decoded records while the parser advances through the archive
   * blocks.
   *
   * @type {SynologyPackage_ListedTarEntries}
   *
   * @since UNRELEASED
   */
  const entries = [];
  let offset = 0;

  while (offset + tarBlockSize <= archive.length) {
    const header = archive.subarray(offset, offset + tarBlockSize);

    if (header.every((byte) => byte === 0) === true) {
      break;
    }

    const expectedChecksum = readOctal(header, 148, 8);
    let checksum = 0;

    for (let index = 0; index < header.length; index += 1) {
      const byte = header[index] ?? 0;

      checksum += (index >= 148 && index < 156) ? 32 : byte;
    }

    if (checksum !== expectedChecksum) {
      throw new Error(`Tar entry at byte ${offset} has an invalid header checksum.`);
    }

    const name = readString(header, 0, 100);
    const mode = readOctal(header, 100, 8);
    const size = readOctal(header, 124, 12);
    const type = readString(header, 156, 1) || '0';
    const dataOffset = offset + tarBlockSize;
    const data = archive.subarray(dataOffset, dataOffset + size);

    if (data.length !== size) {
      throw new Error(`Tar entry "${name}" extends past the archive boundary.`);
    }

    entries.push({
      name,
      mode,
      type,
      data,
      size,
    });

    offset = dataOffset + (Math.ceil(size / tarBlockSize) * tarBlockSize);
  }

  return entries;
}
