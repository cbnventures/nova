import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {
  Theme_Error_Index_Error_DocusaurusContext,
  Theme_Error_Index_Error_Message,
  Theme_Error_Index_Error_Overrides,
  Theme_Error_Index_Error_Pages,
  Theme_Error_Index_Error_Props,
  Theme_Error_Index_Error_RetryLabelOverride,
  Theme_Error_Index_Error_ThemeConfig,
  Theme_Error_Index_Error_TryAgain,
} from '../../types/theme/Error/index.d.ts';

/**
 * Theme - Error.
 *
 * Renders a plain error fallback with the error message and a retry button,
 * providing a minimal view for the top-level error boundary without any
 * layout wrapper.
 *
 * @param {Theme_Error_Index_Error_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Error(props: Theme_Error_Index_Error_Props) {
  const docusaurusContext: Theme_Error_Index_Error_DocusaurusContext = useDocusaurusContext();
  const themeConfig: Theme_Error_Index_Error_ThemeConfig = docusaurusContext['siteConfig']['themeConfig'] as Theme_Error_Index_Error_ThemeConfig;
  const errorPages: Theme_Error_Index_Error_Pages = themeConfig['errorPages'] as Theme_Error_Index_Error_Pages;
  const overrides: Theme_Error_Index_Error_Overrides = (errorPages !== undefined && errorPages !== null) ? errorPages['error'] as Theme_Error_Index_Error_Overrides : undefined;
  const retryLabelOverride: Theme_Error_Index_Error_RetryLabelOverride = (overrides !== undefined && overrides !== null) ? overrides['retryLabel'] as Theme_Error_Index_Error_RetryLabelOverride : undefined;

  const message: Theme_Error_Index_Error_Message = props['error']['message'];
  const tryAgainLabel: Theme_Error_Index_Error_TryAgain = (retryLabelOverride !== undefined && retryLabelOverride !== '') ? retryLabelOverride : translate({
    id: 'theme.Error.tryAgain',
    message: 'Try again',
    description: 'The label for the button that retries after an error',
  });

  return (
    <div
      className={(props['className'] !== undefined) ? `nova-error-surface nova-error ${props['className']}` : 'nova-error-surface nova-error'}
      style={props['style']}
      role="alert"
    >
      <p className="nova-error-message" dir="auto">{message}</p>
      <div className="nova-error-actions">
        <button className="nova-error-retry" type="button" onClick={props['tryAgain']}>
          {tryAgainLabel}
        </button>
      </div>
    </div>
  );
}

export default Error;
