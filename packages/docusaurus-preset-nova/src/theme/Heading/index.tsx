import { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { createElement } from 'react';

import type {
  ThemeHeadingBrokenLinks,
  ThemeHeadingHashLink,
  ThemeHeadingHashLinkLabel,
  ThemeHeadingId,
  ThemeHeadingProps,
} from '../../types/theme/Heading/index.d.ts';

/**
 * Theme - Heading.
 *
 * Renders a heading element at the specified level with an anchor hash link
 * revealed on hover or keyboard focus, collecting anchor identifiers through
 * Docusaurus broken-link tracking.
 *
 * @param {ThemeHeadingProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Heading(props: ThemeHeadingProps) {
  const id: ThemeHeadingId = props['id'];
  const brokenLinks: ThemeHeadingBrokenLinks = useBrokenLinks();

  if (props['as'] !== 'h1' && id !== undefined) {
    brokenLinks.collectAnchor(id);
  }

  const hashLinkLabel: ThemeHeadingHashLinkLabel = translate({
    id: 'theme.common.headingLinkTitle',
    message: 'Direct link to heading',
    description: 'Title and aria-label for the hash-link anchor revealed on heading hover or focus',
  });

  let hashLink: ThemeHeadingHashLink = null;

  if (props['as'] !== 'h1' && id !== undefined) {
    hashLink = (
      <a
        className="nova-heading-hash-link"
        href={`#${id}`}
        aria-label={hashLinkLabel}
        title={hashLinkLabel}
      />
    );
  }

  return createElement(
    props['as'],
    {
      id,
      className: (props['className'] !== undefined) ? `nova-heading ${props['className']}` : 'nova-heading',
    },
    props['children'],
    hashLink,
  );
}

export default Heading;
