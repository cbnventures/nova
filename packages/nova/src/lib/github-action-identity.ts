import {
  isMap,
  isScalar,
  parseDocument,
  stringify,
} from 'yaml';

import type {
  Lib_GithubActionIdentity_FormatGithubActionScalar_PlainCandidate,
  Lib_GithubActionIdentity_FormatGithubActionScalar_Returns,
  Lib_GithubActionIdentity_FormatGithubActionScalar_ScalarType,
  Lib_GithubActionIdentity_FormatGithubActionScalar_Value,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Content,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Document,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_DocumentContents,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Formatted,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertedFormatted,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertIndex,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Key,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_LineEnd,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_PairValue,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Prefix,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousKey,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousValue,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Returns,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_ScalarType,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Separator,
  Lib_GithubActionIdentity_ReplaceGithubActionScalar_Value,
  Lib_GithubActionIdentity_ResolveGithubActionAuthor_Author,
  Lib_GithubActionIdentity_ResolveGithubActionAuthor_Entities,
  Lib_GithubActionIdentity_ResolveGithubActionAuthor_Returns,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Content,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Document,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedLength,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedPath,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedMain,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedWorkspacePath,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Returns,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_RunsMain,
  Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_WorkspacePaths,
} from '../types/lib/github-action-identity.d.ts';

/**
 * Lib - GitHub Action Identity - Replace GitHub Action Scalar.
 *
 * Rewrites one top-level scalar of an action manifest in place, keeping its quote
 * style, comments, and every other byte. A missing key is added after another key.
 * Returns undefined when the manifest cannot be edited safely.
 *
 * @param {Lib_GithubActionIdentity_ReplaceGithubActionScalar_Content}     content     - Content.
 * @param {Lib_GithubActionIdentity_ReplaceGithubActionScalar_Key}         key         - Key.
 * @param {Lib_GithubActionIdentity_ReplaceGithubActionScalar_Value}       value       - Value.
 * @param {Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousKey} previousKey - Previous key.
 *
 * @returns {Lib_GithubActionIdentity_ReplaceGithubActionScalar_Returns}
 *
 * @since 0.49.0
 */
export function replaceGithubActionScalar(content: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Content, key: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Key, value: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Value, previousKey: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousKey): Lib_GithubActionIdentity_ReplaceGithubActionScalar_Returns {
  const document: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Document = parseDocument(content);

  if (document.errors.length > 0) {
    return undefined;
  }

  const documentContents: Lib_GithubActionIdentity_ReplaceGithubActionScalar_DocumentContents = document.contents;

  if (isMap(documentContents) === false) {
    return undefined;
  }

  const pair: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Pair = documentContents.items.find((item) => {
    return isScalar(item.key) === true && item.key.value === key;
  });

  // Replace only the characters of the existing value so the rest of the file stays byte-identical.
  if (pair !== undefined) {
    const pairValue: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PairValue = pair['value'];

    if (
      isScalar(pairValue) === false
      || pairValue.range === undefined
      || pairValue.range === null
      || pairValue.type === 'BLOCK_FOLDED'
      || pairValue.type === 'BLOCK_LITERAL'
    ) {
      return undefined;
    }

    const formatted: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Formatted = formatGithubActionScalar(value, pairValue.type);

    return `${content.slice(0, pairValue.range[0])}${formatted}${content.slice(pairValue.range[1])}`;
  }

  // Add a missing key on its own line after the previous key, matching that key's quote style.
  const previousPair: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousPair = (previousKey === undefined) ? undefined : documentContents.items.find((item) => {
    return isScalar(item.key) === true && item.key.value === previousKey;
  });
  const previousValue: Lib_GithubActionIdentity_ReplaceGithubActionScalar_PreviousValue = (previousPair !== undefined) ? previousPair['value'] : undefined;
  let insertIndex: Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertIndex = 0;
  let scalarType: Lib_GithubActionIdentity_ReplaceGithubActionScalar_ScalarType = 'QUOTE_DOUBLE';

  if (
    isScalar(previousValue) === true
    && previousValue.range !== undefined
    && previousValue.range !== null
  ) {
    const lineEnd: Lib_GithubActionIdentity_ReplaceGithubActionScalar_LineEnd = content.indexOf('\n', previousValue.range[1]);

    insertIndex = (lineEnd === -1) ? content.length : lineEnd + 1;
    scalarType = previousValue.type;

    // A block scalar already ends at the start of the next line, so insert right there.
    if (
      previousValue.type === 'BLOCK_FOLDED'
      || previousValue.type === 'BLOCK_LITERAL'
    ) {
      insertIndex = previousValue.range[1];
    }
  }

  const prefix: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Prefix = content.slice(0, insertIndex);
  const separator: Lib_GithubActionIdentity_ReplaceGithubActionScalar_Separator = (prefix !== '' && prefix.endsWith('\n') === false) ? '\n' : '';
  const insertedFormatted: Lib_GithubActionIdentity_ReplaceGithubActionScalar_InsertedFormatted = formatGithubActionScalar(value, scalarType);

  return [
    `${prefix}${separator}${key}: ${insertedFormatted}`,
    content.slice(insertIndex),
  ].join('\n');
}

/**
 * Lib - GitHub Action Identity - Resolve GitHub Action Author.
 *
 * Finds the name of the first entity with the "author" role, the same source
 * package.json sync-ownership uses, for the action manifest "author" field.
 *
 * @param {Lib_GithubActionIdentity_ResolveGithubActionAuthor_Entities} entities - Entities.
 *
 * @returns {Lib_GithubActionIdentity_ResolveGithubActionAuthor_Returns}
 *
 * @since 0.49.0
 */
export function resolveGithubActionAuthor(entities: Lib_GithubActionIdentity_ResolveGithubActionAuthor_Entities): Lib_GithubActionIdentity_ResolveGithubActionAuthor_Returns {
  const author: Lib_GithubActionIdentity_ResolveGithubActionAuthor_Author = (entities ?? []).find((entity) => {
    return Array.isArray(entity['roles']) === true && entity['roles'].includes('author') === true;
  });

  if (
    author === undefined
    || author['name'] === undefined
    || author['name'].trim() === ''
  ) {
    return undefined;
  }

  return author['name'].trim();
}

/**
 * Lib - GitHub Action Identity - Resolve GitHub Action Workspace Path.
 *
 * Finds the configured workspace that owns an action manifest by matching its
 * "runs.main" entry point. The deepest matching workspace path wins.
 *
 * @param {Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Content}        content        - Content.
 * @param {Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_WorkspacePaths} workspacePaths - Workspace paths.
 *
 * @returns {Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Returns}
 *
 * @since 0.49.0
 */
export function resolveGithubActionWorkspacePath(content: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Content, workspacePaths: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_WorkspacePaths): Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Returns {
  const document: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_Document = parseDocument(content);

  if (document.errors.length > 0) {
    return undefined;
  }

  const runsMain: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_RunsMain = document.getIn([
    'runs',
    'main',
  ]);

  if (typeof runsMain !== 'string') {
    return undefined;
  }

  const normalizedMain: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedMain = (runsMain.startsWith('./') === true) ? runsMain.slice(2) : runsMain;
  let matchedPath: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedPath = undefined;
  let matchedLength: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_MatchedLength = -1;

  for (const workspacePath of workspacePaths) {
    let normalizedWorkspacePath: Lib_GithubActionIdentity_ResolveGithubActionWorkspacePath_NormalizedWorkspacePath = (workspacePath.startsWith('./') === true) ? workspacePath.slice(2) : workspacePath;

    if (normalizedWorkspacePath.endsWith('/') === true) {
      normalizedWorkspacePath = normalizedWorkspacePath.slice(0, -1);
    }

    if (
      normalizedWorkspacePath !== ''
      && normalizedMain.startsWith(`${normalizedWorkspacePath}/`) === true
      && normalizedWorkspacePath.length > matchedLength
    ) {
      matchedPath = workspacePath;
      matchedLength = normalizedWorkspacePath.length;
    }
  }

  return matchedPath;
}

/**
 * Lib - GitHub Action Identity - Format GitHub Action Scalar.
 *
 * Writes a value in the quote style the manifest already uses. Plain values stay
 * plain only when YAML would read them back unchanged; otherwise they are quoted.
 *
 * @param {Lib_GithubActionIdentity_FormatGithubActionScalar_Value}      value      - Value.
 * @param {Lib_GithubActionIdentity_FormatGithubActionScalar_ScalarType} scalarType - Scalar type.
 *
 * @returns {Lib_GithubActionIdentity_FormatGithubActionScalar_Returns}
 *
 * @since 0.49.0
 */
function formatGithubActionScalar(value: Lib_GithubActionIdentity_FormatGithubActionScalar_Value, scalarType: Lib_GithubActionIdentity_FormatGithubActionScalar_ScalarType): Lib_GithubActionIdentity_FormatGithubActionScalar_Returns {
  if (scalarType === 'QUOTE_SINGLE') {
    return `'${value.replaceAll('\'', '\'\'')}'`;
  }

  if (scalarType === 'PLAIN') {
    const plainCandidate: Lib_GithubActionIdentity_FormatGithubActionScalar_PlainCandidate = stringify(value, {
      lineWidth: 0,
    });

    if (plainCandidate === `${value}\n`) {
      return value;
    }
  }

  // JSON string escapes are a valid subset of YAML double-quoted escapes.
  return JSON.stringify(value);
}
