import { strictEqual } from 'node:assert/strict';

import { describe, it } from 'vitest';

import { spliceReadMeRegion, wrapReadMeRegion } from '../../lib/read-me-regions.js';

import type {
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Once,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Original,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Twice,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_DocumentedFenceBeforeRegion,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_DuplicateRegion,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_StrayStartBeforeRegion,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Expected,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Original,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Result,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_MissingEnd,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_MissingStart,
  Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_WrongRegion,
} from '../../types/tests/lib/read-me-regions.test.d.ts';

/**
 * Tests - Lib - Read Me Regions - Splice Read Me Region.
 *
 * @since 0.21.0
 */
describe('spliceReadMeRegion', () => {
  it('replaces the inner content of a region', () => {
    const original: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Original = [
      'before',
      '',
      wrapReadMeRegion('introduction', 'OLD BODY'),
      '',
      'after',
    ].join('\n');
    const result: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Result = spliceReadMeRegion(original, 'introduction', 'NEW BODY');
    const expected: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReplacesTheInnerContentOfARegion_Expected = [
      'before',
      '',
      wrapReadMeRegion('introduction', 'NEW BODY'),
      '',
      'after',
    ].join('\n');

    strictEqual(result, expected);

    return;
  });

  it('returns undefined when a marker is missing', () => {
    const missingStart: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_MissingStart = spliceReadMeRegion('<!-- nova-region-end: credits -->', 'credits', 'NEW');
    const missingEnd: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_MissingEnd = spliceReadMeRegion('<!-- nova-region: credits -->', 'credits', 'NEW');
    const wrongRegion: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_ReturnsUndefinedWhenAMarkerIsMissing_WrongRegion = spliceReadMeRegion(wrapReadMeRegion('header', 'BODY'), 'credits', 'NEW');

    strictEqual(missingStart, undefined);
    strictEqual(missingEnd, undefined);
    strictEqual(wrongRegion, undefined);

    return;
  });

  it('is idempotent when splicing the same content twice', () => {
    const original: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Original = wrapReadMeRegion('documentation', 'OLD');
    const once: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Once = spliceReadMeRegion(original, 'documentation', 'FRESH');
    const twice: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_IsIdempotentWhenSplicingTheSameContentTwice_Twice = (once !== undefined) ? spliceReadMeRegion(once, 'documentation', 'FRESH') : undefined;

    strictEqual(once, wrapReadMeRegion('documentation', 'FRESH'));
    strictEqual(twice, once);

    return;
  });

  it('leaves ambiguous or documented markers untouched', () => {
    // Scenario B: a consumer README documents the markers in a fenced example ABOVE the real
    // generated region. Pairing the first-of-each marker would rewrite the documentation example
    // and leave the real region stale. Two start markers and two end markers make the region
    // ambiguous, so the file must be left byte-identical (undefined).
    const documentedFenceBeforeRegion: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_DocumentedFenceBeforeRegion = [
      '# Project',
      '',
      '## How nova regions work',
      '',
      '```markdown',
      wrapReadMeRegion('header', 'example'),
      '```',
      '',
      'Everything above is documentation.',
      '',
      wrapReadMeRegion('header', 'REAL HEADER'),
      '',
      'Trailing note.',
      '',
    ].join('\n');

    // A duplicate region: the same region wrapped twice. There is no single unambiguous pair,
    // so the file must be left byte-identical.
    const duplicateRegion: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_DuplicateRegion = [
      wrapReadMeRegion('introduction', 'FIRST'),
      '',
      wrapReadMeRegion('introduction', 'SECOND'),
      '',
    ].join('\n');

    // Scenario C3: a lone stray start marker (inside a fence, with no matching end before the
    // real region) precedes the real region. Pairing the stray start with the real region's end
    // marker would delete the handwritten prose between them. The extra start marker makes the
    // region ambiguous, so the file must be left byte-identical.
    const strayStartBeforeRegion: Tests_Lib_ReadMeRegions_SpliceReadMeRegion_LeavesAmbiguousOrDocumentedMarkersUntouched_StrayStartBeforeRegion = [
      '# Project',
      '',
      '```markdown',
      '<!-- nova-region: header -->',
      'your custom header',
      '```',
      '',
      'IMPORTANT HANDWRITTEN PROSE THAT MUST SURVIVE.',
      '',
      wrapReadMeRegion('header', 'REAL HEADER'),
      '',
      'Trailing handwritten note.',
      '',
    ].join('\n');

    // Every ambiguous input is skipped, leaving the README byte-identical rather than mis-splicing.
    strictEqual(spliceReadMeRegion(documentedFenceBeforeRegion, 'header', 'NEW HEADER'), undefined);
    strictEqual(spliceReadMeRegion(duplicateRegion, 'introduction', 'NEW'), undefined);
    strictEqual(spliceReadMeRegion(strayStartBeforeRegion, 'header', 'NEW HEADER'), undefined);

    return;
  });

  return;
});
