import useBrokenLinks from '@docusaurus/useBrokenLinks';
import { createElement } from 'react';

import type {
  ThemeHeadingBrokenLinks,
  ThemeHeadingId,
  ThemeHeadingProps,
} from '../../types/theme/Heading/index.d.ts';

/**
 * Theme - Heading.
 *
 * Renders a plain heading element at the specified level, collecting anchor
 * identifiers through Docusaurus broken-link tracking without any hash-link
 * or anchor icon decoration.
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

  return createElement(
    props['as'],
    {
      id,
      className: (props['className'] !== undefined) ? `nova-heading ${props['className']}` : 'nova-heading',
    },
    props['children'],
  );
}

export default Heading;
