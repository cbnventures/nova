import { translate } from '@docusaurus/Translate';
import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { createElement } from 'react';

import type {
  Theme_Heading_Index_Heading_BrokenLinks,
  Theme_Heading_Index_Heading_HashLink,
  Theme_Heading_Index_Heading_HashLinkLabel,
  Theme_Heading_Index_Heading_Id,
  Theme_Heading_Index_Heading_Props,
} from '../../types/theme/Heading/index.d.ts';

/**
 * Theme - Heading.
 *
 * Renders a heading element at the specified level with an anchor hash link
 * revealed on hover or keyboard focus, collecting anchor identifiers through
 * Docusaurus broken-link tracking.
 *
 * @param {Theme_Heading_Index_Heading_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Heading(props: Theme_Heading_Index_Heading_Props) {
  const id: Theme_Heading_Index_Heading_Id = props['id'];
  const brokenLinks: Theme_Heading_Index_Heading_BrokenLinks = useBrokenLinks();

  if (props['as'] !== 'h1' && id !== undefined) {
    brokenLinks.collectAnchor(id);
  }

  const hashLinkLabel: Theme_Heading_Index_Heading_HashLinkLabel = translate({
    id: 'theme.common.headingLinkTitle',
    message: 'Direct link to heading',
    description: 'Title and aria-label for the hash-link anchor revealed on heading hover or focus',
  });

  let hashLink: Theme_Heading_Index_Heading_HashLink = null;

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
      style: props['style'],
    },
    props['children'],
    hashLink,
  );
}

export default Heading;
