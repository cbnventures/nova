import Link from '@docusaurus/Link';

import type {
  Blocks_Terminology_Index_BlocksTerminology_ClassName,
  Blocks_Terminology_Index_BlocksTerminology_Props,
} from '../../types/blocks/terminology/index.d.ts';

/**
 * Blocks - Terminology.
 *
 * Inline terminology component that renders children with a dotted
 * underline and a hover tooltip expanding the abbreviated term,
 * optionally linking to a glossary page.
 *
 * @param {Blocks_Terminology_Index_BlocksTerminology_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTerminology(props: Blocks_Terminology_Index_BlocksTerminology_Props) {
  const baseClassName: Blocks_Terminology_Index_BlocksTerminology_ClassName = (props['color'] === true) ? 'nova-terminology nova-terminology-colored' : 'nova-terminology';
  const className: Blocks_Terminology_Index_BlocksTerminology_ClassName = (props['className'] !== undefined) ? `${baseClassName} ${props['className']}` : baseClassName;

  if (props['to'] !== undefined) {
    return (
      <Link
        className={className}
        {...((props['style'] !== undefined) ? { style: props['style'] } : {})}
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
      style={props['style']}
      title={props['title']}
    >
      {props['children']}
    </abbr>
  );
}

export default BlocksTerminology;
