import Link from '@docusaurus/Link';

import type { TermProps } from '@/types/index.d.ts';

/**
 * Term.
 *
 * @param {TermProps} props - Props.
 *
 * @constructor
 *
 * @since 1.0.0
 */
export default function Term({ children, title, to }: TermProps) {
  return (
    <Link to={to}>
      <abbr title={title}>{children}</abbr>
    </Link>
  );
}
