import type { Theme_DocRoot_Layout_Main_Index_DocRootLayoutMain_Props } from '../../../../types/theme/DocRoot/Layout/Main/index.d.ts';

/**
 * Theme - Doc Root - Layout - Main - Doc Root Layout Main.
 *
 * Renders a plain main element wrapping child content with no module
 * CSS classes, no Infima container utilities, and no hidden
 * sidebar container awareness.
 *
 * @param {Theme_DocRoot_Layout_Main_Index_DocRootLayoutMain_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayoutMain(props: Theme_DocRoot_Layout_Main_Index_DocRootLayoutMain_Props) {
  return (
    <main
      className={(props['className'] !== undefined) ? `nova-col-12 nova-col-lg-9 ${props['className']}` : 'nova-col-12 nova-col-lg-9'}
      style={props['style']}
    >
      {props['children']}
    </main>
  );
}

export default DocRootLayoutMain;
