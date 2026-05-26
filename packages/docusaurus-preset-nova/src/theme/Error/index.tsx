import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {
  ThemeErrorDocusaurusContext,
  ThemeErrorErrorPages,
  ThemeErrorErrorTryAgain,
  ThemeErrorMessage,
  ThemeErrorOverrides,
  ThemeErrorProps,
  ThemeErrorRetryLabelOverride,
  ThemeErrorThemeConfig,
} from '../../types/theme/Error/index.d.ts';

/**
 * Theme - Error.
 *
 * Renders a plain error fallback with the error message and a retry button,
 * providing a minimal view for the top-level error boundary without any
 * layout wrapper.
 *
 * @param {ThemeErrorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Error(props: ThemeErrorProps) {
  const docusaurusContext: ThemeErrorDocusaurusContext = useDocusaurusContext();
  const themeConfig: ThemeErrorThemeConfig = docusaurusContext['siteConfig']['themeConfig'] as ThemeErrorThemeConfig;
  const errorPages: ThemeErrorErrorPages = themeConfig['errorPages'] as ThemeErrorErrorPages;
  const overrides: ThemeErrorOverrides = (errorPages !== undefined && errorPages !== null) ? errorPages['error'] as ThemeErrorOverrides : undefined;
  const retryLabelOverride: ThemeErrorRetryLabelOverride = (overrides !== undefined && overrides !== null) ? overrides['retryLabel'] as ThemeErrorRetryLabelOverride : undefined;

  const message: ThemeErrorMessage = props['error']['message'];
  const tryAgainLabel: ThemeErrorErrorTryAgain = (retryLabelOverride !== undefined && retryLabelOverride !== '') ? retryLabelOverride : translate({
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
