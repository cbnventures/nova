import BrowserOnly from '@docusaurus/BrowserOnly';
import React, { Suspense } from 'react';

import type {
  Theme_BlockPlayground_Index_BlockPlayground_Code,
  Theme_BlockPlayground_Index_BlockPlayground_Fallback,
  Theme_BlockPlayground_Index_BlockPlayground_Props,
} from '../../types/theme/BlockPlayground/index.d.ts';

/**
 * Theme - Block Playground - Lazy Runtime.
 *
 * Lazily loaded editor and preview so the code editor and the JSX transpiler
 * are only fetched in the browser on pages that render a playground.
 *
 * @since 0.50.0
 */
const lazyRuntime = React.lazy(() => import('./runtime.js'));

/**
 * Theme - Block Playground - Block Playground.
 *
 * Renders an editable live example of the preset's blocks. Code runs inside
 * the docs page with every block in scope; the preview is zoomed out from
 * desktop width, and a dialog shows the same render at full size.
 *
 * @param {Theme_BlockPlayground_Index_BlockPlayground_Props} props - Props.
 *
 * @returns {JSX.Element}
 *
 * @since 0.50.0
 */
function BlockPlayground(props: Theme_BlockPlayground_Index_BlockPlayground_Props) {
  const code: Theme_BlockPlayground_Index_BlockPlayground_Code = props['code'].trim();
  const fallback: Theme_BlockPlayground_Index_BlockPlayground_Fallback = (
    <pre className="nova-block-playground-fallback">
      <code>{code}</code>
    </pre>
  );

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-block-playground ${props['className']}` : 'nova-block-playground'}
      style={props['style']}
    >
      <BrowserOnly fallback={fallback}>
        {() => (
          <Suspense fallback={fallback}>
            {React.createElement(lazyRuntime, {
              code,
            })}
          </Suspense>
        )}
      </BrowserOnly>
    </div>
  );
}

export default BlockPlayground;
