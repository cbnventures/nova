import type { Scripts_DataAttributeQuery_Lines } from '../types/scripts/data-attribute-query.d.ts';

/**
 * Scripts - Data Attribute Query - Lines.
 *
 * Inline JavaScript string that reads query string parameters prefixed
 * with 'docusaurus-data-' and maps them to corresponding data attributes
 * on the document element at page load.
 *
 * @since 0.15.0
 */
const lines: Scripts_DataAttributeQuery_Lines = [
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

/**
 * Scripts - Data Attribute Query - Data Attribute Query.
 *
 * Newline-joined inline script source ready to embed in a pre-body
 * tag so query string data parameters apply before hydration.
 *
 * @since 0.21.0
 */
export const dataAttributeQuery = lines.join('\n');
