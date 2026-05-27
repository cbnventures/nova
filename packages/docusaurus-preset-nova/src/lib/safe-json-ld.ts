import { LIB_REGEX_LESS_THAN_SIGN } from './regex.js';

import type {
  Lib_SafeJsonLd_SerializeJsonLd_LessThanPattern,
  Lib_SafeJsonLd_SerializeJsonLd_Raw,
  Lib_SafeJsonLd_SerializeJsonLd_Returns,
  Lib_SafeJsonLd_SerializeJsonLd_Value,
} from '../types/lib/safe-json-ld.d.ts';

/**
 * Lib - Safe JSON Ld - Serialize JSON Ld.
 *
 * Stringifies a payload and escapes every `<` so an embedded `</script>` in
 * any string value cannot close an inline `<script type="application/ld+json">`
 * element early.
 *
 * @param {Lib_SafeJsonLd_SerializeJsonLd_Value} value - Value.
 *
 * @returns {Lib_SafeJsonLd_SerializeJsonLd_Returns}
 *
 * @since 0.18.0
 */
export function serializeJsonLd(value: Lib_SafeJsonLd_SerializeJsonLd_Value): Lib_SafeJsonLd_SerializeJsonLd_Returns {
  const lessThanPattern: Lib_SafeJsonLd_SerializeJsonLd_LessThanPattern = new RegExp(LIB_REGEX_LESS_THAN_SIGN.source, 'g');

  const raw: Lib_SafeJsonLd_SerializeJsonLd_Raw = JSON.stringify(value);

  return raw.replace(lessThanPattern, '\\u003c');
}
