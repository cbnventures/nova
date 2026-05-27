import TitleFormatterProvider from '@theme/ThemeProvider/TitleFormatter';

import type { Theme_ThemeProvider_Index_ThemeProvider_Props } from '../../types/theme/ThemeProvider/index.d.ts';

/**
 * Theme - Theme Provider - Theme Provider.
 *
 * Top-level theme context wrapper that composes the title
 * formatter provider required by the Docusaurus rendering
 * pipeline for document title management.
 *
 * @param {Theme_ThemeProvider_Index_ThemeProvider_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ThemeProvider(props: Theme_ThemeProvider_Index_ThemeProvider_Props) {
  return (
    <TitleFormatterProvider>
      {props['children']}
    </TitleFormatterProvider>
  );
}

export default ThemeProvider;
