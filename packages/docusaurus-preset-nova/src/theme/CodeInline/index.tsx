import type { ThemeCodeInlineCodeInlineProps } from '../../types/theme/CodeInline/index.d.ts';

/**
 * Theme - Code Inline - Code Inline.
 *
 * Renders inline code content inside a plain code element without
 * any syntax highlighting or framework-specific styling,
 * preserving semantic markup.
 *
 * @param {ThemeCodeInlineCodeInlineProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CodeInline(props: ThemeCodeInlineCodeInlineProps) {
  return (
    <code
      className={(props['className'] !== undefined) ? `nova-code-inline ${props['className']}` : 'nova-code-inline'}
      style={props['style']}
    >
      {props['children']}
    </code>
  );
}

export default CodeInline;
