import { TitleFormatterProvider } from '@docusaurus/theme-common/internal';

import type { ThemeThemeProviderTitleFormatterTitleFormatterProps } from '../../../types/theme/ThemeProvider/TitleFormatter/index.d.ts';

/**
 * Theme - Theme Provider - Title Formatter - Title Formatter.
 *
 * Wraps children in the Docusaurus title formatter
 * context using the default formatting behavior without
 * any custom transformation logic.
 *
 * @param {ThemeThemeProviderTitleFormatterTitleFormatterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TitleFormatter(props: ThemeThemeProviderTitleFormatterTitleFormatterProps) {
  return (
    <TitleFormatterProvider formatter={(params) => params.defaultFormatter(params)}>
      {props['children']}
    </TitleFormatterProvider>
  );
}

export default TitleFormatter;
