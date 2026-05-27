import { TitleFormatterProvider } from '@docusaurus/theme-common/internal';

import type { Theme_ThemeProvider_TitleFormatter_Index_TitleFormatter_Props } from '../../../types/theme/ThemeProvider/TitleFormatter/index.d.ts';

/**
 * Theme - Theme Provider - Title Formatter - Title Formatter.
 *
 * Wraps children in the Docusaurus title formatter
 * context using the default formatting behavior without
 * any custom transformation logic.
 *
 * @param {Theme_ThemeProvider_TitleFormatter_Index_TitleFormatter_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function TitleFormatter(props: Theme_ThemeProvider_TitleFormatter_Index_TitleFormatter_Props) {
  return (
    <TitleFormatterProvider formatter={(params) => params.defaultFormatter(params)}>
      {props['children']}
    </TitleFormatterProvider>
  );
}

export default TitleFormatter;
