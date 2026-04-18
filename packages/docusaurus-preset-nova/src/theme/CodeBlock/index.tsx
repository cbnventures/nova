import { translate } from '@docusaurus/Translate';
import React, {
  Suspense,
  useEffect,
  useRef,
  useState,
} from 'react';

import type {
  ThemeCodeBlockCodeBlockCodeRef,
  ThemeCodeBlockCodeBlockCollapsed,
  ThemeCodeBlockCodeBlockCollapsedState,
  ThemeCodeBlockCodeBlockCopied,
  ThemeCodeBlockCodeBlockCopiedLabel,
  ThemeCodeBlockCodeBlockCopiedState,
  ThemeCodeBlockCodeBlockCopyAriaLabel,
  ThemeCodeBlockCodeBlockCopyLabel,
  ThemeCodeBlockCodeBlockIsPreHighlighted,
  ThemeCodeBlockCodeBlockLineCount,
  ThemeCodeBlockCodeBlockPlainText,
  ThemeCodeBlockCodeBlockProps,
  ThemeCodeBlockCodeBlockSetCollapsed,
  ThemeCodeBlockCodeBlockSetCopied,
  ThemeCodeBlockCodeBlockSetWordWrap,
  ThemeCodeBlockCodeBlockShouldCollapse,
  ThemeCodeBlockCodeBlockShowLess,
  ThemeCodeBlockCodeBlockShowMore,
  ThemeCodeBlockCodeBlockWordWrap,
  ThemeCodeBlockCodeBlockWordWrapState,
  ThemeCodeBlockCodeBlockWordWrapToggle,
  ThemeCodeBlockCodeBlockWrapLabel,
  ThemeCodeBlockExtractPlainTextElementProps,
  ThemeCodeBlockExtractPlainTextNode,
  ThemeCodeBlockExtractPlainTextReturns,
} from '../../types/theme/CodeBlock/index.d.ts';

const lazyLiveEditor = React.lazy(() => import('./live-editor.js'));

/**
 * Theme - Code Block - Extract Plain Text.
 *
 * Recursively extracts displayable plain text from a React element tree,
 * concatenating string nodes to produce a clipboard-ready text value
 * without markup or formatting.
 *
 * @param {ThemeCodeBlockExtractPlainTextNode} node - Node.
 *
 * @returns {ThemeCodeBlockExtractPlainTextReturns}
 *
 * @since 0.15.0
 */
function extractPlainText(node: ThemeCodeBlockExtractPlainTextNode): ThemeCodeBlockExtractPlainTextReturns {
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
    const elementProps: ThemeCodeBlockExtractPlainTextElementProps = (node as React.ReactElement)['props'] as ThemeCodeBlockExtractPlainTextElementProps;

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
 * @param {ThemeCodeBlockCodeBlockProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function CodeBlock(props: ThemeCodeBlockCodeBlockProps) {
  const isPreHighlighted: ThemeCodeBlockCodeBlockIsPreHighlighted = typeof props['children'] !== 'string';
  const plainText: ThemeCodeBlockCodeBlockPlainText = (isPreHighlighted === true) ? extractPlainText(props['children']) : String(props['children']);
  const copiedState: ThemeCodeBlockCodeBlockCopiedState = useState<ThemeCodeBlockCodeBlockCopied>(false);
  const copied: ThemeCodeBlockCodeBlockCopied = copiedState[0];
  const setCopied: ThemeCodeBlockCodeBlockSetCopied = copiedState[1];
  const collapsedState: ThemeCodeBlockCodeBlockCollapsedState = useState<ThemeCodeBlockCodeBlockCollapsed>(false);
  const collapsed: ThemeCodeBlockCodeBlockCollapsed = collapsedState[0];
  const setCollapsed: ThemeCodeBlockCodeBlockSetCollapsed = collapsedState[1];
  const wordWrapState: ThemeCodeBlockCodeBlockWordWrapState = useState<ThemeCodeBlockCodeBlockWordWrap>(false);
  const wordWrap: ThemeCodeBlockCodeBlockWordWrap = wordWrapState[0];
  const setWordWrap: ThemeCodeBlockCodeBlockSetWordWrap = wordWrapState[1];
  const codeRef: ThemeCodeBlockCodeBlockCodeRef = useRef<HTMLElement | null>(null);
  const lineCount: ThemeCodeBlockCodeBlockLineCount = plainText.split('\n').length;
  const shouldCollapse: ThemeCodeBlockCodeBlockShouldCollapse = (
    lineCount > 25
    && (
      props['metastring'] === undefined
      || props['metastring'].includes('noCollapse') === false
    )
  );
  const wordWrapToggleLabel: ThemeCodeBlockCodeBlockWordWrapToggle = translate({
    id: 'theme.CodeBlock.wordWrapToggle',
    message: 'Toggle word wrap',
    description: 'The ARIA label for the word wrap toggle button in code blocks',
  });
  const wrapLabel: ThemeCodeBlockCodeBlockWrapLabel = translate({
    id: 'theme.CodeBlock.wrapLabel',
    message: 'Wrap',
    description: 'The button text for the word wrap toggle in code blocks',
  });
  const copyAriaLabel: ThemeCodeBlockCodeBlockCopyAriaLabel = translate({
    id: 'theme.CodeBlock.copyButtonAriaLabel',
    message: 'Copy code to clipboard',
    description: 'The ARIA label for the copy button in code blocks',
  });
  const copiedLabel: ThemeCodeBlockCodeBlockCopiedLabel = translate({
    id: 'theme.CodeBlock.copied',
    message: 'Copied!',
    description: 'The button text shown after code has been copied to clipboard',
  });
  const copyLabel: ThemeCodeBlockCodeBlockCopyLabel = translate({
    id: 'theme.CodeBlock.copy',
    message: 'Copy',
    description: 'The button text for the copy button in code blocks',
  });
  const showMoreLabel: ThemeCodeBlockCodeBlockShowMore = translate({
    id: 'theme.CodeBlock.showMore',
    message: 'Show more',
    description: 'The button text to expand a collapsed code block',
  });
  const showLessLabel: ThemeCodeBlockCodeBlockShowLess = translate({
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
    void navigator.clipboard.writeText(plainText);

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

  // Path A — Live editor.
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

  // Path B — Pre-highlighted (from rehype plugin).
  if (isPreHighlighted === true) {
    return (
      <div
        className="nova-code-block"
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

  // Path C — Raw text (dynamic code).
  return (
    <div
      className="nova-code-block"
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
