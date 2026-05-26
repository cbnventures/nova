import { LIB_REGEX_LESS_THAN_SIGN } from './regex.js';

import type {
  LibSafeJsonLdSerializeJsonLdLessThanPattern,
  LibSafeJsonLdSerializeJsonLdRaw,
  LibSafeJsonLdSerializeJsonLdReturns,
  LibSafeJsonLdSerializeJsonLdValue,
} from '../types/lib/safe-json-ld.d.ts';

/**
 * Lib - Safe JSON Ld - Serialize JSON Ld.
 *
 * Stringifies a payload and escapes every `<` so an embedded `</script>` in
 * any string value cannot close an inline `<script type="application/ld+json">`
 * element early.
 *
 * @param {LibSafeJsonLdSerializeJsonLdValue} value - Value.
 *
 * @returns {LibSafeJsonLdSerializeJsonLdReturns}
 *
 * @since 0.18.0
 */
export function serializeJsonLd(value: LibSafeJsonLdSerializeJsonLdValue): LibSafeJsonLdSerializeJsonLdReturns {
  const lessThanPattern: LibSafeJsonLdSerializeJsonLdLessThanPattern = new RegExp(LIB_REGEX_LESS_THAN_SIGN.source, 'g');

  const raw: LibSafeJsonLdSerializeJsonLdRaw = JSON.stringify(value);

  return raw.replace(lessThanPattern, '\\u003c');
}
