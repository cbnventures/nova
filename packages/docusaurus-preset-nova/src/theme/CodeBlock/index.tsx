import { translate } from '@docusaurus/Translate';
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  Theme_CodeBlock_Index_CodeBlock_CodeRef,
  Theme_CodeBlock_Index_CodeBlock_Collapsed,
  Theme_CodeBlock_Index_CodeBlock_CollapsedState,
  Theme_CodeBlock_Index_CodeBlock_Copied,
  Theme_CodeBlock_Index_CodeBlock_CopiedLabel,
  Theme_CodeBlock_Index_CodeBlock_CopiedState,
  Theme_CodeBlock_Index_CodeBlock_CopyAriaLabel,
  Theme_CodeBlock_Index_CodeBlock_CopyLabel,
  Theme_CodeBlock_Index_CodeBlock_HandleCopy_Textarea,
  Theme_CodeBlock_Index_CodeBlock_IsPreHighlighted,
  Theme_CodeBlock_Index_CodeBlock_LineCount,
  Theme_CodeBlock_Index_CodeBlock_PlainText,
  Theme_CodeBlock_Index_CodeBlock_Props,
  Theme_CodeBlock_Index_CodeBlock_SetCollapsed,
  Theme_CodeBlock_Index_CodeBlock_SetCopied,
  Theme_CodeBlock_Index_CodeBlock_SetWordWrap,
  Theme_CodeBlock_Index_CodeBlock_ShouldCollapse,
  Theme_CodeBlock_Index_CodeBlock_ShowLess,
  Theme_CodeBlock_Index_CodeBlock_ShowMore,
  Theme_CodeBlock_Index_CodeBlock_WordWrap,
  Theme_CodeBlock_Index_CodeBlock_WordWrapState,
  Theme_CodeBlock_Index_CodeBlock_WordWrapToggle,
  Theme_CodeBlock_Index_CodeBlock_WrapLabel,
  Theme_CodeBlock_Index_ExtractPlainText_ElementProps,
  Theme_CodeBlock_Index_ExtractPlainText_Node,
  Theme_CodeBlock_Index_ExtractPlainText_Returns,
} from '../../types/theme/CodeBlock/index.d.ts';

const lazyLiveEditor = React.lazy(() => import('./live-editor.js'));

/**
 * Theme - Code Block - Extract Plain Text.
 *
 * Recursively extracts displayable plain text from a React element tree,
 * concatenating string nodes to produce a clipboard-ready text value
 * without markup or formatting.
 *
 * @param {Theme_CodeBlock_Index_ExtractPlainText_Node} node - Node.
 *
 * @returns {Theme_CodeBlock_Index_ExtractPlainText_Returns}
 *
 * @since 0.15.0
 */
function extractPlainText(node: Theme_CodeBlock_Index_ExtractPlainText_Node): Theme_CodeBlock_Index_ExtractPlainText_Returns {
  if (typeof node === 'string') {
    return node;
  }

  if (typeof node === 'number') {
    return String(node);
  }

  if (
    node === null
    || node === undefined
    || typeof node === 'boolean'
  ) {
    return '';
  }

  if (Array.isArray(node) === true) {
    return node.map((child) => extractPlainText(child)).join('');
  }

  if (typeof node === 'object' && 'props' in node) {
    const elementProps: Theme_CodeBlock_Index_ExtractPlainText_ElementProps = (node as React.ReactElement)['props'] as Theme_CodeBlock_Index_ExtractPlainText_ElementProps;

    return extractPlainText(elementProps['children']);
  }

  return '';
}

/**
 * Theme - Code Block - Code Block.
 *
 * Renders a feature-rich code block with title bar, language badge, copy
 * button, word wrap toggle, collapsible long blocks, line numbers, and
 * live editor support via lazy-loaded Sandpack.
 *
 * @param {Theme_CodeBlock_Index_CodeBlock_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CodeBlock(props: Theme_CodeBlock_Index_CodeBlock_Props) {
  const isPreHighlighted: Theme_CodeBlock_Index_CodeBlock_IsPreHighlighted = typeof props['children'] !== 'string';
  const plainText: Theme_CodeBlock_Index_CodeBlock_PlainText = (isPreHighlighted === true) ? extractPlainText(props['children']) : String(props['children']);
  const copiedState: Theme_CodeBlock_Index_CodeBlock_CopiedState = useState<Theme_CodeBlock_Index_CodeBlock_Copied>(false);
  const copied: Theme_CodeBlock_Index_CodeBlock_Copied = copiedState[0];
  const setCopied: Theme_CodeBlock_Index_CodeBlock_SetCopied = copiedState[1];
  const collapsedState: Theme_CodeBlock_Index_CodeBlock_CollapsedState = useState<Theme_CodeBlock_Index_CodeBlock_Collapsed>(false);
  const collapsed: Theme_CodeBlock_Index_CodeBlock_Collapsed = collapsedState[0];
  const setCollapsed: Theme_CodeBlock_Index_CodeBlock_SetCollapsed = collapsedState[1];
  const wordWrapState: Theme_CodeBlock_Index_CodeBlock_WordWrapState = useState<Theme_CodeBlock_Index_CodeBlock_WordWrap>(false);
  const wordWrap: Theme_CodeBlock_Index_CodeBlock_WordWrap = wordWrapState[0];
  const setWordWrap: Theme_CodeBlock_Index_CodeBlock_SetWordWrap = wordWrapState[1];
  const codeRef: Theme_CodeBlock_Index_CodeBlock_CodeRef = useRef<HTMLElement | null>(null);
  const lineCount: Theme_CodeBlock_Index_CodeBlock_LineCount = plainText.split('\n').length;
  const shouldCollapse: Theme_CodeBlock_Index_CodeBlock_ShouldCollapse = (
    lineCount > 25
    && (
      props['metastring'] === undefined
      || props['metastring'].includes('noCollapse') === false
    )
  );
  const wordWrapToggleLabel: Theme_CodeBlock_Index_CodeBlock_WordWrapToggle = translate({
    id: 'theme.CodeBlock.wordWrapToggle',
    message: 'Toggle word wrap',
    description: 'The ARIA label for the word wrap toggle button in code blocks',
  });
  const wrapLabel: Theme_CodeBlock_Index_CodeBlock_WrapLabel = translate({
    id: 'theme.CodeBlock.wrapLabel',
    message: 'Wrap',
    description: 'The button text for the word wrap toggle in code blocks',
  });
  const copyAriaLabel: Theme_CodeBlock_Index_CodeBlock_CopyAriaLabel = translate({
    id: 'theme.CodeBlock.copyButtonAriaLabel',
    message: 'Copy code to clipboard',
    description: 'The ARIA label for the copy button in code blocks',
  });
  const copiedLabel: Theme_CodeBlock_Index_CodeBlock_CopiedLabel = translate({
    id: 'theme.CodeBlock.copied',
    message: 'Copied!',
    description: 'The button text shown after code has been copied to clipboard',
  });
  const copyLabel: Theme_CodeBlock_Index_CodeBlock_CopyLabel = translate({
    id: 'theme.CodeBlock.copy',
    message: 'Copy',
    description: 'The button text for the copy button in code blocks',
  });
  const showMoreLabel: Theme_CodeBlock_Index_CodeBlock_ShowMore = translate({
    id: 'theme.CodeBlock.showMore',
    message: 'Show more',
    description: 'The button text to expand a collapsed code block',
  });
  const showLessLabel: Theme_CodeBlock_Index_CodeBlock_ShowLess = translate({
    id: 'theme.CodeBlock.showLess',
    message: 'Show less',
    description: 'The button text to collapse an expanded code block',
  });

  useEffect(() => {
    if (shouldCollapse === true) {
      setCollapsed(true);
    }

    return undefined;
  }, [shouldCollapse]);

  /**
   * Theme - Code Block - Code Block - Handle Copy.
   *
   * Copies the extracted plain text to the system clipboard and sets a temporary
   * visual confirmation state that reverts after two seconds.
   *
   * @since 0.15.0
   */
  function handleCopy() {
    /*
     * navigator.clipboard is a secure-context-only API. Browsers expose it
     * only on HTTPS or on localhost/127.0.0.1, so it is undefined on plain
     * HTTP over a LAN IP (common during cross-device dev testing). When
     * missing, fall back to a hidden-textarea + execCommand('copy') path
     * that works in any context. The fallback is deprecated but universally
     * supported, and we only reach it when the modern API is unavailable.
     */
    if (navigator.clipboard !== undefined && navigator.clipboard.writeText !== undefined) {
      void navigator.clipboard.writeText(plainText);
    } else {
      const textarea: Theme_CodeBlock_Index_CodeBlock_HandleCopy_Textarea = document.createElement('textarea');

      textarea.value = plainText;
      textarea.style.position = 'fixed';
      textarea.style.opacity = '0';
      document.body.appendChild(textarea);

      textarea.select();

      document.execCommand('copy');

      document.body.removeChild(textarea);
    }

    setCopied(true);

    setTimeout(() => {
      setCopied(false);

      return undefined;
    }, 2000);

    return undefined;
  }

  /**
   * Theme - Code Block - Code Block - Toggle Word Wrap.
   *
   * Toggles the word wrap state between enabled and disabled, updating the
   * data attribute on the container element.
   *
   * @since 0.15.0
   */
  function toggleWordWrap() {
    setWordWrap((previous) => (previous === false));

    return undefined;
  }

  /**
   * Theme - Code Block - Code Block - Toggle Collapse.
   *
   * Toggles the collapsed state between expanded and collapsed, controlling
   * the visibility of long code blocks.
   *
   * @since 0.15.0
   */
  function toggleCollapse() {
    setCollapsed((previous) => (previous === false));

    return undefined;
  }

  // Path A - Live editor.
  if (props['live'] === true && props['language'] !== undefined) {
    return (
      <Suspense
        fallback={(
          <pre>
            <code>{plainText}</code>
          </pre>
        )}
      >
        {React.createElement(lazyLiveEditor, {
          code: plainText,
          language: props['language'],
        })}
      </Suspense>
    );
  }

  // Path B - Pre-highlighted (from rehype plugin).
  if (isPreHighlighted === true) {
    return (
      <div
        className={(props['className'] !== undefined) ? `nova-code-block ${props['className']}` : 'nova-code-block'}
        style={props['style']}
        data-word-wrap={wordWrap}
        data-collapsed={collapsed}
        data-line-numbers={(props['showLineNumbers'] === true) ? 'true' : undefined}
      >
        {(props['title'] !== undefined) && (
          <div className="nova-code-block-title">{props['title']}</div>
        )}
        <div className="nova-code-block-toolbar">
          {(props['language'] !== undefined) && (
            <span className="nova-code-block-lang">{props['language']}</span>
          )}
          <div className="nova-code-block-actions">
            <button
              type="button"
              className="nova-code-block-wrap"
              onClick={toggleWordWrap}
              aria-label={wordWrapToggleLabel}
              aria-pressed={wordWrap}
            >
              {wrapLabel}
            </button>
            <button
              type="button"
              className="nova-code-block-copy"
              onClick={handleCopy}
              aria-label={copyAriaLabel}
            >
              {(copied === true) ? copiedLabel : copyLabel}
            </button>
          </div>
        </div>
        <pre className="shiki">
          <code>{props['children']}</code>
        </pre>
        {(shouldCollapse === true) && (
          <button
            type="button"
            className="nova-code-block-expand"
            onClick={toggleCollapse}
            aria-expanded={collapsed === false}
          >
            {(collapsed === true) ? showMoreLabel : showLessLabel}
          </button>
        )}
      </div>
    );
  }

  // Path C - Raw text (dynamic code).
  return (
    <div
      className={(props['className'] !== undefined) ? `nova-code-block ${props['className']}` : 'nova-code-block'}
      style={props['style']}
      data-word-wrap={wordWrap}
      data-collapsed={collapsed}
      data-line-numbers={(props['showLineNumbers'] === true) ? 'true' : undefined}
    >
      {(props['title'] !== undefined) && (
        <div className="nova-code-block-title">{props['title']}</div>
      )}
      <div className="nova-code-block-toolbar">
        {(props['language'] !== undefined) && (
          <span className="nova-code-block-lang">{props['language']}</span>
        )}
        <div className="nova-code-block-actions">
          <button
            type="button"
            className="nova-code-block-wrap"
            onClick={toggleWordWrap}
            aria-label={wordWrapToggleLabel}
            aria-pressed={wordWrap}
          >
            {wrapLabel}
          </button>
          <button
            type="button"
            className="nova-code-block-copy"
            onClick={handleCopy}
            aria-label={copyAriaLabel}
          >
            {(copied === true) ? copiedLabel : copyLabel}
          </button>
        </div>
      </div>
      <pre className="shiki">
        <code ref={codeRef}>{plainText}</code>
      </pre>
      {(shouldCollapse === true) && (
        <button
          type="button"
          className="nova-code-block-expand"
          onClick={toggleCollapse}
          aria-expanded={collapsed === false}
        >
          {(collapsed === true) ? showMoreLabel : showLessLabel}
        </button>
      )}
    </div>
  );
}

export default CodeBlock;
