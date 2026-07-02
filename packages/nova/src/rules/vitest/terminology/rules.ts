import { strictEqual } from 'node:assert/strict';
import { existsSync } from 'node:fs';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

import { it } from 'vitest';

import { slugifyHeading } from '../../../lib/markdown-slug.js';
import {
  LIB_REGEX_PATTERN_CODE_BLOCK,
  LIB_REGEX_PATTERN_HEADING_H2_LINE,
  LIB_REGEX_PATTERN_TERMINOLOGY_TITLE_ATTR,
  LIB_REGEX_PATTERN_TERMINOLOGY_TO_ATTR,
} from '../../../lib/regex.js';
import { isEnabled } from '../enable.js';

import type {
  Rules_Vitest_Terminology_Rules_AnchorResolves_Anchor,
  Rules_Vitest_Terminology_Rules_AnchorResolves_ComponentRegexSource,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Config,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Content,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Enable,
  Rules_Vitest_Terminology_Rules_AnchorResolves_ExpectedBase,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Failures,
  Rules_Vitest_Terminology_Rules_AnchorResolves_FilePath,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Files,
  Rules_Vitest_Terminology_Rules_AnchorResolves_Returns,
  Rules_Vitest_Terminology_Rules_AnchorResolves_StrippedContent,
  Rules_Vitest_Terminology_Rules_AnchorResolves_TerminologyPath,
  Rules_Vitest_Terminology_Rules_AnchorResolves_ToMatch,
  Rules_Vitest_Terminology_Rules_AnchorResolves_ToValue,
  Rules_Vitest_Terminology_Rules_AnchorResolves_ValidAnchors,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_Anchor,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_Config,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_HeadingCapture,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_Returns,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyContent,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyPath,
  Rules_Vitest_Terminology_Rules_BuildValidAnchors_ValidAnchors,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Children,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_ComponentRegexSource,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Config,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Content,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Enable,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Failures,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_FilePath,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Files,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_Returns,
  Rules_Vitest_Terminology_Rules_ChildrenNonempty_StrippedContent,
  Rules_Vitest_Terminology_Rules_ComponentPattern_ComponentName,
  Rules_Vitest_Terminology_Rules_ComponentPattern_Returns,
  Rules_Vitest_Terminology_Rules_ComponentValidation_Config,
  Rules_Vitest_Terminology_Rules_ComponentValidation_Enable,
  Rules_Vitest_Terminology_Rules_ComponentValidation_Returns,
  Rules_Vitest_Terminology_Rules_ComponentValidation_TerminologyPath,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Attrs,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_ComponentRegexSource,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Config,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Content,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Enable,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Failures,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_FilePath,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Files,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_Returns,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_StrippedContent,
  Rules_Vitest_Terminology_Rules_TitleAttrPresent_TitleMatch,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Attrs,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_ComponentRegexSource,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Config,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Content,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Enable,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Failures,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_FilePath,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Files,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_Returns,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_StrippedContent,
  Rules_Vitest_Terminology_Rules_ToAttrPresent_ToMatch,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Attrs,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_ComponentRegexSource,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Config,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Content,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Enable,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_ExpectedBase,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Failures,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_FilePath,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Files,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_Returns,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_StrippedContent,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_ToMatch,
  Rules_Vitest_Terminology_Rules_ToPointsToBase_ToValue,
} from '../../../types/rules/vitest/terminology/rules.d.ts';

/**
 * Rules - Vitest - Terminology - Rules - Component Pattern.
 *
 * Builds the component-capture regex source for the configured component name. Capture
 * group one is the attribute string and group two is the children text. The children
 * capture cannot span nested elements (a known nova limitation carried forward).
 *
 * @param {Rules_Vitest_Terminology_Rules_ComponentPattern_ComponentName} componentName - Component name.
 *
 * @returns {Rules_Vitest_Terminology_Rules_ComponentPattern_Returns}
 *
 * @since 0.20.0
 */
export function componentPattern(componentName: Rules_Vitest_Terminology_Rules_ComponentPattern_ComponentName): Rules_Vitest_Terminology_Rules_ComponentPattern_Returns {
  return `<${componentName}\\s+([^>]*)>([^<]*)</${componentName}>`;
}

/**
 * Rules - Vitest - Terminology - Rules - Build Valid Anchors.
 *
 * Reads the terminology source page and returns the set of valid anchor slugs derived
 * from its h2 headings. Returns an empty set when the page does not exist so callers can
 * short-circuit on the portability escape hatch.
 *
 * @param {Rules_Vitest_Terminology_Rules_BuildValidAnchors_Config} config - Config.
 *
 * @returns {Rules_Vitest_Terminology_Rules_BuildValidAnchors_Returns}
 *
 * @since 0.20.0
 */
export async function buildValidAnchors(config: Rules_Vitest_Terminology_Rules_BuildValidAnchors_Config): Rules_Vitest_Terminology_Rules_BuildValidAnchors_Returns {
  const validAnchors: Rules_Vitest_Terminology_Rules_BuildValidAnchors_ValidAnchors = new Set<string>();
  const terminologyPath: Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyPath = config['terminologyPath'];

  if (existsSync(terminologyPath) === false) {
    return validAnchors;
  }

  const terminologyContent: Rules_Vitest_Terminology_Rules_BuildValidAnchors_TerminologyContent = await readFile(terminologyPath, 'utf-8');

  for (const headingMatch of terminologyContent.matchAll(new RegExp(LIB_REGEX_PATTERN_HEADING_H2_LINE, 'gm'))) {
    const headingCapture: Rules_Vitest_Terminology_Rules_BuildValidAnchors_HeadingCapture = headingMatch[1] ?? '';
    const anchor: Rules_Vitest_Terminology_Rules_BuildValidAnchors_Anchor = slugifyHeading(headingCapture);

    validAnchors.add(anchor);
  }

  return validAnchors;
}

/**
 * Rules - Vitest - Terminology - Rules - Title Attr Present.
 *
 * Rule `terminology-title-attr-present`: every component usage must carry a non-empty
 * `title` attribute. Component usages inside fenced code blocks are skipped.
 *
 * @param {Rules_Vitest_Terminology_Rules_TitleAttrPresent_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_TitleAttrPresent_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_TitleAttrPresent_Returns}
 *
 * @since 0.20.0
 */
export async function titleAttrPresent(config: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Config, enable: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Enable): Rules_Vitest_Terminology_Rules_TitleAttrPresent_Returns {
  if (isEnabled('terminology-title-attr-present', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Files = config['files'];
  const componentRegexSource: Rules_Vitest_Terminology_Rules_TitleAttrPresent_ComponentRegexSource = componentPattern(config['componentName']);

  for (const file of files) {
    it(`terminology title attributes present in ${file}`, async () => {
      const filePath: Rules_Vitest_Terminology_Rules_TitleAttrPresent_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Rules_Vitest_Terminology_Rules_TitleAttrPresent_StrippedContent = content.replace(new RegExp(LIB_REGEX_PATTERN_CODE_BLOCK, 'g'), '');
      const failures: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Failures = [];

      for (const componentMatch of strippedContent.matchAll(new RegExp(componentRegexSource, 'g'))) {
        const attrs: Rules_Vitest_Terminology_Rules_TitleAttrPresent_Attrs = componentMatch[1] ?? '';
        const titleMatch: Rules_Vitest_Terminology_Rules_TitleAttrPresent_TitleMatch = new RegExp(LIB_REGEX_PATTERN_TERMINOLOGY_TITLE_ATTR).exec(attrs);

        if (titleMatch === null || (titleMatch[1] ?? '').length === 0) {
          failures.push(`${file}: <${config['componentName']}> missing or empty title attribute`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Terminology title attribute issues:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Terminology - Rules - To Attr Present.
 *
 * Rule `terminology-to-attr-present`: every component usage must carry a non-empty `to`
 * attribute. Component usages inside fenced code blocks are skipped.
 *
 * @param {Rules_Vitest_Terminology_Rules_ToAttrPresent_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_ToAttrPresent_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_ToAttrPresent_Returns}
 *
 * @since 0.20.0
 */
export async function toAttrPresent(config: Rules_Vitest_Terminology_Rules_ToAttrPresent_Config, enable: Rules_Vitest_Terminology_Rules_ToAttrPresent_Enable): Rules_Vitest_Terminology_Rules_ToAttrPresent_Returns {
  if (isEnabled('terminology-to-attr-present', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Terminology_Rules_ToAttrPresent_Files = config['files'];
  const componentRegexSource: Rules_Vitest_Terminology_Rules_ToAttrPresent_ComponentRegexSource = componentPattern(config['componentName']);

  for (const file of files) {
    it(`terminology to attributes present in ${file}`, async () => {
      const filePath: Rules_Vitest_Terminology_Rules_ToAttrPresent_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Terminology_Rules_ToAttrPresent_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Rules_Vitest_Terminology_Rules_ToAttrPresent_StrippedContent = content.replace(new RegExp(LIB_REGEX_PATTERN_CODE_BLOCK, 'g'), '');
      const failures: Rules_Vitest_Terminology_Rules_ToAttrPresent_Failures = [];

      for (const componentMatch of strippedContent.matchAll(new RegExp(componentRegexSource, 'g'))) {
        const attrs: Rules_Vitest_Terminology_Rules_ToAttrPresent_Attrs = componentMatch[1] ?? '';
        const toMatch: Rules_Vitest_Terminology_Rules_ToAttrPresent_ToMatch = new RegExp(LIB_REGEX_PATTERN_TERMINOLOGY_TO_ATTR).exec(attrs);

        if (toMatch === null || (toMatch[1] ?? '').length === 0) {
          failures.push(`${file}: <${config['componentName']}> missing or empty to attribute`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Terminology to attribute issues:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Terminology - Rules - Children Nonempty.
 *
 * Rule `terminology-children-nonempty`: every component usage must wrap non-empty children
 * text. Component usages inside fenced code blocks are skipped.
 *
 * @param {Rules_Vitest_Terminology_Rules_ChildrenNonempty_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_ChildrenNonempty_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_ChildrenNonempty_Returns}
 *
 * @since 0.20.0
 */
export async function childrenNonempty(config: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Config, enable: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Enable): Rules_Vitest_Terminology_Rules_ChildrenNonempty_Returns {
  if (isEnabled('terminology-children-nonempty', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Files = config['files'];
  const componentRegexSource: Rules_Vitest_Terminology_Rules_ChildrenNonempty_ComponentRegexSource = componentPattern(config['componentName']);

  for (const file of files) {
    it(`terminology children non-empty in ${file}`, async () => {
      const filePath: Rules_Vitest_Terminology_Rules_ChildrenNonempty_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Rules_Vitest_Terminology_Rules_ChildrenNonempty_StrippedContent = content.replace(new RegExp(LIB_REGEX_PATTERN_CODE_BLOCK, 'g'), '');
      const failures: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Failures = [];

      for (const componentMatch of strippedContent.matchAll(new RegExp(componentRegexSource, 'g'))) {
        const children: Rules_Vitest_Terminology_Rules_ChildrenNonempty_Children = (componentMatch[2] ?? '').trim();

        if (children.length === 0) {
          failures.push(`${file}: <${config['componentName']}> has empty children`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Terminology children issues:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Terminology - Rules - To Points To Base.
 *
 * Rule `terminology-to-points-to-base`: every component `to` value must equal the expected
 * base route or be that base followed by an `#anchor`. Component usages inside fenced code
 * blocks are skipped.
 *
 * @param {Rules_Vitest_Terminology_Rules_ToPointsToBase_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_ToPointsToBase_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_ToPointsToBase_Returns}
 *
 * @since 0.20.0
 */
export async function toPointsToBase(config: Rules_Vitest_Terminology_Rules_ToPointsToBase_Config, enable: Rules_Vitest_Terminology_Rules_ToPointsToBase_Enable): Rules_Vitest_Terminology_Rules_ToPointsToBase_Returns {
  if (isEnabled('terminology-to-points-to-base', enable) === false) {
    return;
  }

  const files: Rules_Vitest_Terminology_Rules_ToPointsToBase_Files = config['files'];
  const componentRegexSource: Rules_Vitest_Terminology_Rules_ToPointsToBase_ComponentRegexSource = componentPattern(config['componentName']);
  const expectedBase: Rules_Vitest_Terminology_Rules_ToPointsToBase_ExpectedBase = config['expectedBase'];

  for (const file of files) {
    it(`terminology to points to base in ${file}`, async () => {
      const filePath: Rules_Vitest_Terminology_Rules_ToPointsToBase_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Terminology_Rules_ToPointsToBase_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Rules_Vitest_Terminology_Rules_ToPointsToBase_StrippedContent = content.replace(new RegExp(LIB_REGEX_PATTERN_CODE_BLOCK, 'g'), '');
      const failures: Rules_Vitest_Terminology_Rules_ToPointsToBase_Failures = [];

      for (const componentMatch of strippedContent.matchAll(new RegExp(componentRegexSource, 'g'))) {
        const attrs: Rules_Vitest_Terminology_Rules_ToPointsToBase_Attrs = componentMatch[1] ?? '';
        const toMatch: Rules_Vitest_Terminology_Rules_ToPointsToBase_ToMatch = new RegExp(LIB_REGEX_PATTERN_TERMINOLOGY_TO_ATTR).exec(attrs);

        if (toMatch === null) {
          continue;
        }

        const toValue: Rules_Vitest_Terminology_Rules_ToPointsToBase_ToValue = toMatch[1] ?? '';

        if (toValue !== expectedBase && toValue.startsWith(`${expectedBase}#`) === false) {
          failures.push(`${file}: <${config['componentName']} to="${toValue}"> does not point to ${expectedBase}`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Terminology to-base issues:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Terminology - Rules - Anchor Resolves.
 *
 * Rule `terminology-anchor-resolves`: when a component `to` value carries an `#anchor`, the
 * anchor must match an h2 heading slug from the terminology source page. The rule no-ops via
 * the `existsSync` guard when the terminology page is absent; code-fence usages are skipped.
 *
 * @param {Rules_Vitest_Terminology_Rules_AnchorResolves_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_AnchorResolves_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_AnchorResolves_Returns}
 *
 * @since 0.20.0
 */
export async function anchorResolves(config: Rules_Vitest_Terminology_Rules_AnchorResolves_Config, enable: Rules_Vitest_Terminology_Rules_AnchorResolves_Enable): Rules_Vitest_Terminology_Rules_AnchorResolves_Returns {
  if (isEnabled('terminology-anchor-resolves', enable) === false) {
    return;
  }

  const terminologyPath: Rules_Vitest_Terminology_Rules_AnchorResolves_TerminologyPath = config['terminologyPath'];

  if (existsSync(terminologyPath) === false) {
    return;
  }

  const validAnchors: Rules_Vitest_Terminology_Rules_AnchorResolves_ValidAnchors = await buildValidAnchors(config);
  const files: Rules_Vitest_Terminology_Rules_AnchorResolves_Files = config['files'];
  const componentRegexSource: Rules_Vitest_Terminology_Rules_AnchorResolves_ComponentRegexSource = componentPattern(config['componentName']);
  const expectedBase: Rules_Vitest_Terminology_Rules_AnchorResolves_ExpectedBase = config['expectedBase'];

  for (const file of files) {
    it(`terminology anchors resolve in ${file}`, async () => {
      const filePath: Rules_Vitest_Terminology_Rules_AnchorResolves_FilePath = join(config['rootDir'], file);
      const content: Rules_Vitest_Terminology_Rules_AnchorResolves_Content = await readFile(filePath, 'utf-8');
      const strippedContent: Rules_Vitest_Terminology_Rules_AnchorResolves_StrippedContent = content.replace(new RegExp(LIB_REGEX_PATTERN_CODE_BLOCK, 'g'), '');
      const failures: Rules_Vitest_Terminology_Rules_AnchorResolves_Failures = [];

      for (const componentMatch of strippedContent.matchAll(new RegExp(componentRegexSource, 'g'))) {
        const toMatch: Rules_Vitest_Terminology_Rules_AnchorResolves_ToMatch = new RegExp(LIB_REGEX_PATTERN_TERMINOLOGY_TO_ATTR).exec(componentMatch[1] ?? '');

        if (toMatch === null) {
          continue;
        }

        const toValue: Rules_Vitest_Terminology_Rules_AnchorResolves_ToValue = toMatch[1] ?? '';

        if (toValue.startsWith(`${expectedBase}#`) === false) {
          continue;
        }

        const anchor: Rules_Vitest_Terminology_Rules_AnchorResolves_Anchor = toValue.slice(`${expectedBase}#`.length);

        if (validAnchors.has(anchor) === false) {
          failures.push(`${file}: <${config['componentName']} to="${toValue}"> references unknown anchor "#${anchor}"`);
        }
      }

      strictEqual(failures.length, 0, [
        '',
        'Terminology anchor issues:',
        failures.join('\n'),
      ].join('\n'));

      return;
    });
  }

  return;
}

/**
 * Rules - Vitest - Terminology - Rules - Component Validation.
 *
 * Rule `terminology-component-validation`: the umbrella check. It short-circuits when the
 * terminology source page is absent (the portability escape hatch) and otherwise records a
 * single visible test node documenting that the per-rule checks are active.
 *
 * @param {Rules_Vitest_Terminology_Rules_ComponentValidation_Config} config - Config.
 * @param {Rules_Vitest_Terminology_Rules_ComponentValidation_Enable} enable - Enable.
 *
 * @returns {Rules_Vitest_Terminology_Rules_ComponentValidation_Returns}
 *
 * @since 0.20.0
 */
export function componentValidation(config: Rules_Vitest_Terminology_Rules_ComponentValidation_Config, enable: Rules_Vitest_Terminology_Rules_ComponentValidation_Enable): Rules_Vitest_Terminology_Rules_ComponentValidation_Returns {
  if (isEnabled('terminology-component-validation', enable) === false) {
    return;
  }

  const terminologyPath: Rules_Vitest_Terminology_Rules_ComponentValidation_TerminologyPath = config['terminologyPath'];

  if (existsSync(terminologyPath) === false) {
    return;
  }

  it(`terminology component validation is active${''}`, () => {
    strictEqual(existsSync(terminologyPath), true, 'terminology source page must exist when validation is active');

    return;
  });

  return;
}
