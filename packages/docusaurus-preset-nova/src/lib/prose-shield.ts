import { toPosixPath } from './posix-path.js';
import { LIB_REGEX_PROSE_ARTICLE_TYPE_SELECTOR } from './regex.js';

import type {
  Lib_ProseShield_CreateProseShieldPlugin_Once_Inherited,
  Lib_ProseShield_CreateProseShieldPlugin_Once_NextSelectors,
  Lib_ProseShield_CreateProseShieldPlugin_Once_Returns,
  Lib_ProseShield_CreateProseShieldPlugin_Once_Root,
  Lib_ProseShield_CreateProseShieldPlugin_Once_SourceFile,
  Lib_ProseShield_CreateProseShieldPlugin_Returns,
  Lib_ProseShield_CreateProseShieldPlugin_StylesDirectory,
  Lib_ProseShield_CreateProseShieldPlugin_StylesPrefix,
  Lib_ProseShield_FindSubjectInsertIndex_Character,
  Lib_ProseShield_FindSubjectInsertIndex_Depth,
  Lib_ProseShield_FindSubjectInsertIndex_Quote,
  Lib_ProseShield_FindSubjectInsertIndex_Remainder,
  Lib_ProseShield_FindSubjectInsertIndex_Returns,
  Lib_ProseShield_FindSubjectInsertIndex_Selector,
  Lib_ProseShield_FindSubjectInsertIndex_SubjectCharacter,
  Lib_ProseShield_FindSubjectInsertIndex_SubjectStart,
  Lib_ProseShield_HasProseAncestor_Current,
  Lib_ProseShield_HasProseAncestor_Node,
  Lib_ProseShield_HasProseAncestor_Returns,
  Lib_ProseShield_IsProseSelector_Returns,
  Lib_ProseShield_IsProseSelector_Selector,
  Lib_ProseShield_ProseShieldExclusion,
  Lib_ProseShield_ProseShieldLegacyPseudoElements,
  Lib_ProseShield_ShieldProseSelector_Inherited,
  Lib_ProseShield_ShieldProseSelector_InsertIndex,
  Lib_ProseShield_ShieldProseSelector_Returns,
  Lib_ProseShield_ShieldProseSelector_Selector,
} from '../types/lib/prose-shield.d.ts';

/**
 * Lib - Prose Shield - Prose Shield Exclusion.
 *
 * Zero-specificity filter appended to doc prose selectors so they skip
 * everything inside a block playground preview, which then renders blocks
 * the way they look on a landing page.
 *
 * @since 0.50.0
 */
export const proseShieldExclusion: Lib_ProseShield_ProseShieldExclusion = ':where(:not(.nova-block-playground-canvas *))';

/**
 * Lib - Prose Shield - Prose Shield Legacy Pseudo Elements.
 *
 * Single-colon pseudo-elements that must stay at the end of a compound
 * selector, so the exclusion is inserted in front of them.
 *
 * @since 0.50.0
 */
const proseShieldLegacyPseudoElements: Lib_ProseShield_ProseShieldLegacyPseudoElements = [
  ':before',
  ':after',
  ':first-line',
  ':first-letter',
];

/**
 * Lib - Prose Shield - Is Prose Selector.
 *
 * Checks whether a selector targets doc or blog prose, meaning it is scoped
 * under the MDX content wrapper, the doc content wrapper, or an article.
 *
 * @param {Lib_ProseShield_IsProseSelector_Selector} selector - Selector.
 *
 * @returns {Lib_ProseShield_IsProseSelector_Returns}
 *
 * @since 0.50.0
 */
export function isProseSelector(selector: Lib_ProseShield_IsProseSelector_Selector): Lib_ProseShield_IsProseSelector_Returns {
  return (
    selector.includes('.nova-mdx-content')
    || selector.includes('.nova-doc-content')
    || LIB_REGEX_PROSE_ARTICLE_TYPE_SELECTOR.test(selector)
  );
}

/**
 * Lib - Prose Shield - Find Subject Insert Index.
 *
 * Finds where the exclusion goes in a selector: the end of its last compound,
 * or just before that compound's pseudo-element. Brackets, parentheses, and
 * quoted strings are skipped so their contents are never split.
 *
 * @param {Lib_ProseShield_FindSubjectInsertIndex_Selector} selector - Selector.
 *
 * @returns {Lib_ProseShield_FindSubjectInsertIndex_Returns}
 *
 * @since 0.50.0
 */
export function findSubjectInsertIndex(selector: Lib_ProseShield_FindSubjectInsertIndex_Selector): Lib_ProseShield_FindSubjectInsertIndex_Returns {
  let depth: Lib_ProseShield_FindSubjectInsertIndex_Depth = 0;
  let quote: Lib_ProseShield_FindSubjectInsertIndex_Quote = undefined;
  let subjectStart: Lib_ProseShield_FindSubjectInsertIndex_SubjectStart = 0;

  for (let i = 0; i < selector.length; i += 1) {
    const character: Lib_ProseShield_FindSubjectInsertIndex_Character = selector.charAt(i);

    if (quote !== undefined) {
      if (character === quote) {
        quote = undefined;
      }

      continue;
    }

    if (character === '"' || character === '\'') {
      quote = character;

      continue;
    }

    if (character === '(' || character === '[') {
      depth += 1;

      continue;
    }

    if (character === ')' || character === ']') {
      depth -= 1;

      continue;
    }

    if (
      depth === 0
      && (
        character === ' '
        || character === '>'
        || character === '+'
        || character === '~'
      )
    ) {
      subjectStart = i + 1;
    }
  }

  depth = 0;
  quote = undefined;

  for (let i = subjectStart; i < selector.length; i += 1) {
    const subjectCharacter: Lib_ProseShield_FindSubjectInsertIndex_SubjectCharacter = selector.charAt(i);

    if (quote !== undefined) {
      if (subjectCharacter === quote) {
        quote = undefined;
      }

      continue;
    }

    if (subjectCharacter === '"' || subjectCharacter === '\'') {
      quote = subjectCharacter;

      continue;
    }

    if (subjectCharacter === '(' || subjectCharacter === '[') {
      depth += 1;

      continue;
    }

    if (subjectCharacter === ')' || subjectCharacter === ']') {
      depth -= 1;

      continue;
    }

    if (depth === 0 && subjectCharacter === ':') {
      const remainder: Lib_ProseShield_FindSubjectInsertIndex_Remainder = selector.slice(i);

      if (
        remainder.startsWith('::') === true
        || proseShieldLegacyPseudoElements.some((pseudoElement) => remainder.startsWith(pseudoElement)) === true
      ) {
        return i;
      }
    }
  }

  return selector.length;
}

/**
 * Lib - Prose Shield - Shield Prose Selector.
 *
 * Appends the exclusion to a prose selector, or to any selector nested in a
 * prose rule. Selectors that already belong to the playground stay as they
 * are, so its own styles keep applying.
 *
 * @param {Lib_ProseShield_ShieldProseSelector_Selector}  selector  - Selector.
 * @param {Lib_ProseShield_ShieldProseSelector_Inherited} inherited - Inherited.
 *
 * @returns {Lib_ProseShield_ShieldProseSelector_Returns}
 *
 * @since 0.50.0
 */
export function shieldProseSelector(selector: Lib_ProseShield_ShieldProseSelector_Selector, inherited: Lib_ProseShield_ShieldProseSelector_Inherited): Lib_ProseShield_ShieldProseSelector_Returns {
  if (selector.includes('nova-block-playground') === true || selector.includes(proseShieldExclusion) === true) {
    return selector;
  }

  if (inherited === false && isProseSelector(selector) === false) {
    return selector;
  }

  const insertIndex: Lib_ProseShield_ShieldProseSelector_InsertIndex = findSubjectInsertIndex(selector);

  return `${selector.slice(0, insertIndex)}${proseShieldExclusion}${selector.slice(insertIndex)}`;
}

/**
 * Lib - Prose Shield - Has Prose Ancestor.
 *
 * Walks up a nested rule's parents to see whether any enclosing rule is a
 * prose rule, so native CSS nesting inside prose rules is shielded too.
 *
 * @param {Lib_ProseShield_HasProseAncestor_Node} node - Node.
 *
 * @returns {Lib_ProseShield_HasProseAncestor_Returns}
 *
 * @since 0.50.0
 */
export function hasProseAncestor(node: Lib_ProseShield_HasProseAncestor_Node): Lib_ProseShield_HasProseAncestor_Returns {
  let current: Lib_ProseShield_HasProseAncestor_Current = node['parent'];

  while (current !== undefined) {
    if (
      current['type'] === 'rule'
      && current['selector'] !== undefined
      && isProseSelector(current['selector']) === true
    ) {
      return true;
    }

    current = current['parent'];
  }

  return false;
}

/**
 * Lib - Prose Shield - Create Prose Shield Plugin.
 *
 * Builds the PostCSS plugin that shields block playground previews from doc
 * prose styles. It only rewrites the preset's own stylesheets, leaving site
 * stylesheets and third-party CSS untouched.
 *
 * @param {Lib_ProseShield_CreateProseShieldPlugin_StylesDirectory} stylesDirectory - Styles directory.
 *
 * @returns {Lib_ProseShield_CreateProseShieldPlugin_Returns}
 *
 * @since 0.50.0
 */
export function createProseShieldPlugin(stylesDirectory: Lib_ProseShield_CreateProseShieldPlugin_StylesDirectory): Lib_ProseShield_CreateProseShieldPlugin_Returns {
  const stylesPrefix: Lib_ProseShield_CreateProseShieldPlugin_StylesPrefix = `${toPosixPath(stylesDirectory).toLowerCase()}/`;

  return {
    postcssPlugin: 'nova-prose-shield',
    Once(root: Lib_ProseShield_CreateProseShieldPlugin_Once_Root): Lib_ProseShield_CreateProseShieldPlugin_Once_Returns {
      const sourceFile: Lib_ProseShield_CreateProseShieldPlugin_Once_SourceFile = (root['source'] !== undefined && root['source']['input'] !== undefined) ? root['source']['input']['file'] : undefined;

      if (sourceFile === undefined || toPosixPath(sourceFile).toLowerCase().startsWith(stylesPrefix) === false) {
        return;
      }

      root.walkRules((rule) => {
        if (
          rule['parent'] !== undefined
          && rule['parent']['type'] === 'atrule'
          && rule['parent']['name'] !== undefined
          && rule['parent']['name'].endsWith('keyframes') === true
        ) {
          return;
        }

        const inherited: Lib_ProseShield_CreateProseShieldPlugin_Once_Inherited = hasProseAncestor(rule);
        const nextSelectors: Lib_ProseShield_CreateProseShieldPlugin_Once_NextSelectors = rule['selectors'].map((selector) => shieldProseSelector(selector, inherited));

        Reflect.set(rule, 'selectors', nextSelectors);

        return;
      });

      return;
    },
  };
}
