import type { ThemeDocRootLayoutMainDocRootLayoutMainProps } from '../../../../types/theme/DocRoot/Layout/Main/index.d.ts';

/**
 * Theme - Doc Root - Layout - Main - Doc Root Layout Main.
 *
 * Renders a plain main element wrapping child content with no module
 * CSS classes, no Infima container utilities, and no hidden
 * sidebar container awareness.
 *
 * @param {ThemeDocRootLayoutMainDocRootLayoutMainProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function DocRootLayoutMain(props: ThemeDocRootLayoutMainDocRootLayoutMainProps) {
  return (
    <main className="nova-col-12 nova-col-lg-9">
      {props['children']}
    </main>
  );
}

export default DocRootLayoutMain;
