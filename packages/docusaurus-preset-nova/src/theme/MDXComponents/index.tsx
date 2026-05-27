import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import Details from '@theme/Details';
import Heading from '@theme/Heading';
import Mermaid from '@theme/Mermaid';
import { Children, isValidElement } from 'react';

import type { ReactElement, ReactNode } from 'react';

import type {
  Theme_MdxComponents_Index_MdxCode_BlockSpread,
  Theme_MdxComponents_Index_MdxCode_Children,
  Theme_MdxComponents_Index_MdxCode_IsInline,
  Theme_MdxComponents_Index_MdxCode_Language,
  Theme_MdxComponents_Index_MdxCode_Live,
  Theme_MdxComponents_Index_MdxCode_Metastring,
  Theme_MdxComponents_Index_MdxCode_Props,
  Theme_MdxComponents_Index_MdxCode_ShowLineNumbers,
  Theme_MdxComponents_Index_MdxCode_Title,
  Theme_MdxComponents_Index_MdxComponentsProps,
  Theme_MdxComponents_Index_MdxDetails_Children,
  Theme_MdxComponents_Index_MdxDetails_Items,
  Theme_MdxComponents_Index_MdxDetails_Props,
  Theme_MdxComponents_Index_MdxDetails_Summary,
  Theme_MdxComponents_Index_MdxHeading_As,
  Theme_MdxComponents_Index_MdxHeading_Id,
  Theme_MdxComponents_Index_MdxHeading_Props,
  Theme_MdxComponents_Index_MdxPre_Props,
  Theme_MdxComponents_Index_MdxTable_Props,
} from '../../types/theme/MDXComponents/index.d.ts';

/**
 * Theme - MDX Components - MDX Code.
 *
 * Renders a code element as either an inline code span or a fenced
 * code block depending on whether the content contains
 * newlines or multiple elements.
 *
 * @param {Theme_MdxComponents_Index_MdxCode_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxCode(props: Theme_MdxComponents_Index_MdxCode_Props) {
  const children: Theme_MdxComponents_Index_MdxCode_Children = props['children'] as ReactNode;
  const isInline: Theme_MdxComponents_Index_MdxCode_IsInline = (
    typeof children !== 'undefined'
    && Children.toArray(children).every(
      (element) => typeof element === 'string' && element.includes('\n') !== true,
    )
  );

  if (isInline === true) {
    return <CodeInline>{children}</CodeInline>;
  }

  const language: Theme_MdxComponents_Index_MdxCode_Language = (typeof props['data-language'] === 'string') ? props['data-language'] : undefined;
  const title: Theme_MdxComponents_Index_MdxCode_Title = (typeof props['data-title'] === 'string') ? props['data-title'] : undefined;
  const metastring: Theme_MdxComponents_Index_MdxCode_Metastring = (typeof props['metastring'] === 'string') ? props['metastring'] : undefined;
  const showLineNumbers: Theme_MdxComponents_Index_MdxCode_ShowLineNumbers = props['data-show-line-numbers'] === 'true';
  const live: Theme_MdxComponents_Index_MdxCode_Live = props['data-live'] === 'true';

  const codeBlockSpread: Theme_MdxComponents_Index_MdxCode_BlockSpread = {
    showLineNumbers,
    live,
  };

  if (language !== undefined) {
    Reflect.set(codeBlockSpread, 'language', language);
  }

  if (title !== undefined) {
    Reflect.set(codeBlockSpread, 'title', title);
  }

  if (metastring !== undefined) {
    Reflect.set(codeBlockSpread, 'metastring', metastring);
  }

  return (
    <CodeBlock {...codeBlockSpread}>
      {children}
    </CodeBlock>
  );
}

/**
 * Theme - MDX Components - MDX Pre.
 *
 * Passes through fenced code block children without adding a
 * wrapper element, since the Code component already handles
 * block rendering.
 *
 * @param {Theme_MdxComponents_Index_MdxPre_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxPre(props: Theme_MdxComponents_Index_MdxPre_Props) {
  return <>{props['children'] as ReactNode}</>;
}

/**
 * Theme - MDX Components - MDX Heading.
 *
 * Renders a heading element at the specified level by delegating
 * to the theme Heading component with the as
 * prop forwarded.
 *
 * @param {Theme_MdxComponents_Index_MdxHeading_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxHeading(props: Theme_MdxComponents_Index_MdxHeading_Props) {
  const headingAs: Theme_MdxComponents_Index_MdxHeading_As = props['as'] as Theme_MdxComponents_Index_MdxHeading_As;
  const headingId: Theme_MdxComponents_Index_MdxHeading_Id = props['id'] as Theme_MdxComponents_Index_MdxHeading_Id;

  return (
    <Heading
      as={headingAs}
      id={headingId}
    >
      {props['children'] as ReactNode}
    </Heading>
  );
}

/**
 * Theme - MDX Components - MDX Details.
 *
 * Splits children into a summary element and remaining content,
 * passing each to the theme Details component as
 * separate props.
 *
 * @param {Theme_MdxComponents_Index_MdxDetails_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxDetails(props: Theme_MdxComponents_Index_MdxDetails_Props) {
  const items: Theme_MdxComponents_Index_MdxDetails_Items = Children.toArray(props['children'] as ReactNode);
  const summary: Theme_MdxComponents_Index_MdxDetails_Summary = items.find(
    (item) => isValidElement(item) === true && item['type'] === 'summary',
  );
  const children: Theme_MdxComponents_Index_MdxDetails_Children = <>{items.filter((item) => item !== summary)}</>;

  return (
    <Details summary={summary as ReactElement} {...props}>
      {children}
    </Details>
  );
}

/**
 * Theme - MDX Components - MDX Table.
 *
 * Wraps a native table element in a horizontally scrollable
 * container so wide tables do not push the page layout
 * beyond the viewport on narrow screens.
 *
 * @param {Theme_MdxComponents_Index_MdxTable_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxTable(props: Theme_MdxComponents_Index_MdxTable_Props) {
  return (
    <div className="nova-table-scroll">
      <table {...props} />
    </div>
  );
}

/**
 * Theme - MDX Components - MDX Components.
 *
 * Maps standard MDX element names to bare theme components
 * for rendering headings, code blocks, links, details, and
 * admonitions without framework styling.
 *
 * @since 0.15.0
 */
const mdxComponents = {
  Head,
  details: MdxDetails,
  Details: MdxDetails,
  code: MdxCode,
  a: Link,
  pre: MdxPre,
  ul: 'ul',
  li: 'li',
  table: MdxTable,
  img: 'img',
  h1: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h1" {...props} />,
  h2: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h2" {...props} />,
  h3: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h3" {...props} />,
  h4: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h4" {...props} />,
  h5: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h5" {...props} />,
  h6: (props: Theme_MdxComponents_Index_MdxComponentsProps) => <MdxHeading as="h6" {...props} />,
  admonition: Admonition,
  mermaid: Mermaid,
  Mermaid,
};

export default mdxComponents;
