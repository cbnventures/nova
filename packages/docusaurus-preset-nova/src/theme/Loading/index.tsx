import { translate } from '@docusaurus/Translate';

import type {
  ThemeLoadingErrorMessage,
  ThemeLoadingLoadingErrorPrefix,
  ThemeLoadingLoadingLoading,
  ThemeLoadingLoadingRetry,
  ThemeLoadingLoadingTimeout,
  ThemeLoadingProps,
} from '../../types/theme/Loading/index.d.ts';

/**
 * Theme - Loading.
 *
 * Renders a loading indicator with contextual states for
 * error, timeout, and delay, providing a fallback view
 * while route components are lazy-loaded.
 *
 * @param {ThemeLoadingProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Loading(props: ThemeLoadingProps) {
  const errorPrefix: ThemeLoadingLoadingErrorPrefix = translate({
    id: 'theme.Loading.errorPrefix',
    message: 'Error: ',
    description: 'The prefix shown before an error message during loading',
  });
  const retryLabel: ThemeLoadingLoadingRetry = translate({
    id: 'theme.Loading.retry',
    message: 'Retry',
    description: 'The label for the retry button shown during a loading error or timeout',
  });
  const timeoutMessage: ThemeLoadingLoadingTimeout = translate({
    id: 'theme.Loading.timeout',
    message: 'Taking a long time...',
    description: 'The message shown when loading takes too long',
  });
  const loadingMessage: ThemeLoadingLoadingLoading = translate({
    id: 'theme.Loading.loading',
    message: 'Loading...',
    description: 'The message shown while content is being loaded',
  });

  if (props['error'] !== null && props['error'] !== undefined) {
    const errorMessage: ThemeLoadingErrorMessage = props['error']['message'];

    return (
      <div className="nova-loading" data-state="error" role="alert">
        <p className="nova-loading-message">
          {errorPrefix}
          {errorMessage}
        </p>
        {(props['retry'] !== undefined) && (
          <div className="nova-loading-actions">
            <button className="nova-loading-retry" type="button" onClick={props['retry']}>
              {retryLabel}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (props['timedOut'] === true) {
    return (
      <div className="nova-loading" data-state="timeout" role="status" aria-live="polite">
        <p className="nova-loading-message">{timeoutMessage}</p>
        {(props['retry'] !== undefined) && (
          <div className="nova-loading-actions">
            <button className="nova-loading-retry" type="button" onClick={props['retry']}>
              {retryLabel}
            </button>
          </div>
        )}
      </div>
    );
  }

  if (props['isLoading'] === true && props['pastDelay'] === true) {
    return (
      <div className="nova-loading" data-state="loading" role="status" aria-live="polite">
        <p className="nova-loading-message">{loadingMessage}</p>
      </div>
    );
  }

  return null;
}

export default Loading;
