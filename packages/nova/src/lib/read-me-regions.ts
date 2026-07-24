import type {
  Lib_ReadMeRegions_SpliceReadMeRegion_After,
  Lib_ReadMeRegions_SpliceReadMeRegion_Before,
  Lib_ReadMeRegions_SpliceReadMeRegion_EndIndex,
  Lib_ReadMeRegions_SpliceReadMeRegion_EndMarker,
  Lib_ReadMeRegions_SpliceReadMeRegion_InnerStart,
  Lib_ReadMeRegions_SpliceReadMeRegion_NewInnerContent,
  Lib_ReadMeRegions_SpliceReadMeRegion_NextEndIndex,
  Lib_ReadMeRegions_SpliceReadMeRegion_NextStartIndex,
  Lib_ReadMeRegions_SpliceReadMeRegion_ReadmeText,
  Lib_ReadMeRegions_SpliceReadMeRegion_Region,
  Lib_ReadMeRegions_SpliceReadMeRegion_Returns,
  Lib_ReadMeRegions_SpliceReadMeRegion_StartIndex,
  Lib_ReadMeRegions_SpliceReadMeRegion_StartMarker,
  Lib_ReadMeRegions_WrapReadMeRegion_Content,
  Lib_ReadMeRegions_WrapReadMeRegion_Region,
  Lib_ReadMeRegions_WrapReadMeRegion_Returns,
} from '../types/lib/read-me-regions.d.ts';

/**
 * Lib - Read Me Regions - Splice Read Me Region.
 *
 * Replaces the inner content between a matched pair of nova region anchor comments
 * in an existing README, keeping the markers intact so a recipe can refresh that slice.
 * Returns undefined when either marker is absent so the caller can skip the file.
 *
 * @param {Lib_ReadMeRegions_SpliceReadMeRegion_ReadmeText}      readmeText      - Readme text.
 * @param {Lib_ReadMeRegions_SpliceReadMeRegion_Region}          region          - Region.
 * @param {Lib_ReadMeRegions_SpliceReadMeRegion_NewInnerContent} newInnerContent - New inner content.
 *
 * @returns {Lib_ReadMeRegions_SpliceReadMeRegion_Returns}
 *
 * @since 0.21.0
 */
export function spliceReadMeRegion(readmeText: Lib_ReadMeRegions_SpliceReadMeRegion_ReadmeText, region: Lib_ReadMeRegions_SpliceReadMeRegion_Region, newInnerContent: Lib_ReadMeRegions_SpliceReadMeRegion_NewInnerContent): Lib_ReadMeRegions_SpliceReadMeRegion_Returns {
  const startMarker: Lib_ReadMeRegions_SpliceReadMeRegion_StartMarker = `<!-- nova-region: ${region} -->`;
  const endMarker: Lib_ReadMeRegions_SpliceReadMeRegion_EndMarker = `<!-- nova-region-end: ${region} -->`;

  const startIndex: Lib_ReadMeRegions_SpliceReadMeRegion_StartIndex = readmeText.indexOf(startMarker);
  const endIndex: Lib_ReadMeRegions_SpliceReadMeRegion_EndIndex = readmeText.indexOf(endMarker);

  // Both markers must be present and correctly ordered for the region to be refreshable.
  if (
    startIndex === -1
    || endIndex === -1
    || endIndex < startIndex
  ) {
    return undefined;
  }

  // The region must be UNIQUE and unambiguously paired. A consumer README that documents these
  // markers (a fenced example, a pasted recipe doc) or carries a stray unmatched marker contains
  // a second start or end marker, so "first occurrence of each" could pair a documented marker
  // with the real region and splice at the wrong boundary, corrupting content outside the region.
  // Any such ambiguity is treated like a hand-edited README and left byte-identical by returning
  // undefined. The end marker is also paired to ITS start (the first end after the start marker),
  // never a global first end that could belong to an earlier stray or fenced marker.
  const nextStartIndex: Lib_ReadMeRegions_SpliceReadMeRegion_NextStartIndex = readmeText.indexOf(startMarker, startIndex + startMarker.length);
  const nextEndIndex: Lib_ReadMeRegions_SpliceReadMeRegion_NextEndIndex = readmeText.indexOf(endMarker, endIndex + endMarker.length);

  if (
    nextStartIndex !== -1
    || nextEndIndex !== -1
  ) {
    return undefined;
  }

  const innerStart: Lib_ReadMeRegions_SpliceReadMeRegion_InnerStart = startIndex + startMarker.length;

  const before: Lib_ReadMeRegions_SpliceReadMeRegion_Before = readmeText.slice(0, innerStart);
  const after: Lib_ReadMeRegions_SpliceReadMeRegion_After = readmeText.slice(endIndex);

  // Reassemble with the fresh inner content on its own line, mirroring wrapReadMeRegion so the
  // result stays byte-identical to a freshly generated region and re-splicing is idempotent.
  return [
    before,
    newInnerContent,
    after,
  ].join('\n');
}

/**
 * Lib - Read Me Regions - Wrap Read Me Region.
 *
 * Wraps a generated README slice in a matched pair of nova region anchor
 * comments so a recipe can later locate and refresh just that slice in place.
 *
 * @param {Lib_ReadMeRegions_WrapReadMeRegion_Region}  region  - Region.
 * @param {Lib_ReadMeRegions_WrapReadMeRegion_Content} content - Content.
 *
 * @returns {Lib_ReadMeRegions_WrapReadMeRegion_Returns}
 *
 * @since 0.21.0
 */
export function wrapReadMeRegion(region: Lib_ReadMeRegions_WrapReadMeRegion_Region, content: Lib_ReadMeRegions_WrapReadMeRegion_Content): Lib_ReadMeRegions_WrapReadMeRegion_Returns {
  return [
    `<!-- nova-region: ${region} -->`,
    content,
    `<!-- nova-region-end: ${region} -->`,
  ].join('\n');
}
