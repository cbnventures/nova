import type {
  Lib_CodeBlockMetastring_HasMetastringFlag_Escaped,
  Lib_CodeBlockMetastring_HasMetastringFlag_Flag,
  Lib_CodeBlockMetastring_HasMetastringFlag_Metastring,
  Lib_CodeBlockMetastring_HasMetastringFlag_Quote,
  Lib_CodeBlockMetastring_HasMetastringFlag_Returns,
  Lib_CodeBlockMetastring_HasMetastringFlag_Token,
  Lib_CodeBlockMetastring_HasMetastringFlag_TypedCharacter,
} from '../types/lib/code-block-metastring.d.ts';

/**
 * Lib - Code Block Metastring - Has Metastring Flag.
 *
 * Checks whitespace-delimited code-fence metadata for a standalone flag while
 * ignoring words inside single- or double-quoted attribute values. Escaped
 * characters inside quoted values do not terminate the active quote.
 *
 * @param {Lib_CodeBlockMetastring_HasMetastringFlag_Metastring} metastring - Metastring.
 * @param {Lib_CodeBlockMetastring_HasMetastringFlag_Flag}       flag       - Flag.
 *
 * @returns {Lib_CodeBlockMetastring_HasMetastringFlag_Returns}
 *
 * @since 0.22.0
 */
export function hasMetastringFlag(metastring: Lib_CodeBlockMetastring_HasMetastringFlag_Metastring, flag: Lib_CodeBlockMetastring_HasMetastringFlag_Flag): Lib_CodeBlockMetastring_HasMetastringFlag_Returns {
  let quote: Lib_CodeBlockMetastring_HasMetastringFlag_Quote = undefined;
  let escaped: Lib_CodeBlockMetastring_HasMetastringFlag_Escaped = false;
  let token: Lib_CodeBlockMetastring_HasMetastringFlag_Token = '';

  for (const character of metastring.concat(' ')) {
    const typedCharacter: Lib_CodeBlockMetastring_HasMetastringFlag_TypedCharacter = character;

    if (quote !== undefined) {
      if (escaped === true) {
        escaped = false;

        continue;
      }

      if (typedCharacter === '\\') {
        escaped = true;

        continue;
      }

      if (typedCharacter === quote) {
        quote = undefined;
      }

      continue;
    }

    if (typedCharacter === '"' || typedCharacter === '\'') {
      quote = typedCharacter;

      continue;
    }

    if (typedCharacter.trim() === '') {
      if (token === flag) {
        return true;
      }

      token = '';

      continue;
    }

    token = token.concat(typedCharacter);
  }

  return false;
}
