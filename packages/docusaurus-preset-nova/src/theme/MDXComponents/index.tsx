import Head from '@docusaurus/Head';
import Admonition from '@theme/Admonition';
import CodeBlock from '@theme/CodeBlock';
import CodeInline from '@theme/CodeInline';
import Details from '@theme/Details';
import Heading from '@theme/Heading';
import Mermaid from '@theme/Mermaid';
import { Children, isValidElement } from 'react';

import type { ReactElement, ReactNode } from 'react';

import type {
  ThemeMdxComponentsMdxCodeChildren,
  ThemeMdxComponentsMdxCodeIsInline,
  ThemeMdxComponentsMdxCodeProps,
  ThemeMdxComponentsMdxComponentsProps,
  ThemeMdxComponentsMdxDetailsChildren,
  ThemeMdxComponentsMdxDetailsItems,
  ThemeMdxComponentsMdxDetailsProps,
  ThemeMdxComponentsMdxDetailsSummary,
  ThemeMdxComponentsMdxHeadingAs,
  ThemeMdxComponentsMdxHeadingId,
  ThemeMdxComponentsMdxHeadingProps,
  ThemeMdxComponentsMdxPreProps,
  ThemeMdxComponentsMdxTableProps,
} from '../../types/theme/MDXComponents/index.d.ts';

/**
 * Theme - MDX Components - MDX Code.
 *
 * Renders a code element as either an inline code span or a fenced
 * code block depending on whether the content contains
 * newlines or multiple elements.
 *
 * @param {ThemeMdxComponentsMdxCodeProps} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxCode(props: ThemeMdxComponentsMdxCodeProps) {
  const children: ThemeMdxComponentsMdxCodeChildren = props['children'] as ReactNode;
  const isInline: ThemeMdxComponentsMdxCodeIsInline = (
    typeof children !== 'undefined'
    && Children.toArray(children).every(
      (element) => typeof element === 'string' && element.includes('\n') !== true,
    )
  );

  if (isInline === true) {
    return <CodeInline>{children}</CodeInline>;
  }

  return <CodeBlock>{children}</CodeBlock>;
}

/**
 * Theme - MDX Components - MDX Pre.
 *
 * Passes through fenced code block children without adding a
 * wrapper element, since the Code component already handles
 * block rendering.
 *
 * @param {ThemeMdxComponentsMdxPreProps} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxPre(props: ThemeMdxComponentsMdxPreProps) {
  return <>{props['children'] as ReactNode}</>;
}

/**
 * Theme - MDX Components - MDX Heading.
 *
 * Renders a heading element at the specified level by delegating
 * to the theme Heading component with the as
 * prop forwarded.
 *
 * @param {ThemeMdxComponentsMdxHeadingProps} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxHeading(props: ThemeMdxComponentsMdxHeadingProps) {
  const headingAs: ThemeMdxComponentsMdxHeadingAs = props['as'] as ThemeMdxComponentsMdxHeadingAs;
  const headingId: ThemeMdxComponentsMdxHeadingId = props['id'] as ThemeMdxComponentsMdxHeadingId;

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
 * @param {ThemeMdxComponentsMdxDetailsProps} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxDetails(props: ThemeMdxComponentsMdxDetailsProps) {
  const items: ThemeMdxComponentsMdxDetailsItems = Children.toArray(props['children'] as ReactNode);
  const summary: ThemeMdxComponentsMdxDetailsSummary = items.find(
    (item) => isValidElement(item) === true && item['type'] === 'summary',
  );
  const children: ThemeMdxComponentsMdxDetailsChildren = <>{items.filter((item) => item !== summary)}</>;

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
 * @param {ThemeMdxComponentsMdxTableProps} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function MdxTable(props: ThemeMdxComponentsMdxTableProps) {
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
  a: 'a',
  pre: MdxPre,
  ul: 'ul',
  li: 'li',
  mermaid: Mermaid,
  table: MdxTable,
  img: 'img',
  h1: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h1" {...props} />,
  h2: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h2" {...props} />,
  h3: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h3" {...props} />,
  h4: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h4" {...props} />,
  h5: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h5" {...props} />,
  h6: (props: ThemeMdxComponentsMdxComponentsProps) => <MdxHeading as="h6" {...props} />,
  admonition: Admonition,
};

export default mdxComponents;
