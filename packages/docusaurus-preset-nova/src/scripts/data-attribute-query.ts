import type { ScriptsDataAttributeQueryLinesLines } from '../types/scripts/data-attribute-query.d.ts';

/**
 * Scripts - Data Attribute Query - Lines.
 *
 * Inline JavaScript string that reads query string parameters prefixed
 * with 'docusaurus-data-' and maps them to corresponding data attributes
 * on the document element at page load.
 *
 * @since 0.15.0
 */
const lines: ScriptsDataAttributeQueryLinesLines = [
  '(function() {',
  '  try {',
  '    var entries = new URLSearchParams(window.location.search).entries();',
  '    for (var pair of entries) {',
  '      var searchKey = pair[0];',
  '      var value = pair[1];',
  '      if (searchKey.startsWith(\'docusaurus-data-\')) {',
  '        var key = searchKey.replace(\'docusaurus-data-\', \'data-\');',
  '        document.documentElement.setAttribute(key, value);',
  '      }',
  '    }',
  '  } catch(e) {}',
  '})();',
];

export const dataAttributeQuery = lines.join('\n');
