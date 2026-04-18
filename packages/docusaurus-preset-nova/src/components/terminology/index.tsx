import Link from '@docusaurus/Link';

import type {
  ComponentsTerminologyClassName,
  ComponentsTerminologyProps,
} from '../../types/components/terminology/index.d.ts';

/**
 * Components - Terminology.
 *
 * Inline terminology component that renders children with a dotted
 * underline and a hover tooltip expanding the abbreviated term,
 * optionally linking to a glossary page.
 *
 * @param {ComponentsTerminologyProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsTerminology(props: ComponentsTerminologyProps) {
  const className: ComponentsTerminologyClassName = (props['color'] === true) ? 'nova-terminology nova-terminology-colored' : 'nova-terminology';

  if (props['to'] !== undefined) {
    return (
      <Link
        className={className}
        aria-label={props['title']}
        title={props['title']}
        to={props['to']}
      >
        {props['children']}
      </Link>
    );
  }

  return (
    <abbr
      className={className}
      title={props['title']}
    >
      {props['children']}
    </abbr>
  );
}

export default ComponentsTerminology;
