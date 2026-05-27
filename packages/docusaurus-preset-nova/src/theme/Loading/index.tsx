import { translate } from '@docusaurus/Translate';

import type {
  Theme_Loading_Index_Loading_ErrorMessage,
  Theme_Loading_Index_Loading_ErrorPrefix,
  Theme_Loading_Index_Loading_Loading,
  Theme_Loading_Index_Loading_Props,
  Theme_Loading_Index_Loading_Retry,
  Theme_Loading_Index_Loading_Timeout,
} from '../../types/theme/Loading/index.d.ts';

/**
 * Theme - Loading.
 *
 * Renders a loading indicator with contextual states for
 * error, timeout, and delay, providing a fallback view
 * while route components are lazy-loaded.
 *
 * @param {Theme_Loading_Index_Loading_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Loading(props: Theme_Loading_Index_Loading_Props) {
  const errorPrefix: Theme_Loading_Index_Loading_ErrorPrefix = translate({
    id: 'theme.Loading.errorPrefix',
    message: 'Error: ',
    description: 'The prefix shown before an error message during loading',
  });
  const retryLabel: Theme_Loading_Index_Loading_Retry = translate({
    id: 'theme.Loading.retry',
    message: 'Retry',
    description: 'The label for the retry button shown during a loading error or timeout',
  });
  const timeoutMessage: Theme_Loading_Index_Loading_Timeout = translate({
    id: 'theme.Loading.timeout',
    message: 'Taking a long time...',
    description: 'The message shown when loading takes too long',
  });
  const loadingMessage: Theme_Loading_Index_Loading_Loading = translate({
    id: 'theme.Loading.loading',
    message: 'Loading...',
    description: 'The message shown while content is being loaded',
  });

  if (props['error'] !== null && props['error'] !== undefined) {
    const errorMessage: Theme_Loading_Index_Loading_ErrorMessage = props['error']['message'];

    return (
      <div
        className={(props['className'] !== undefined) ? `nova-loading ${props['className']}` : 'nova-loading'}
        style={props['style']}
        data-state="error"
        role="alert"
      >
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
      <div
        className={(props['className'] !== undefined) ? `nova-loading ${props['className']}` : 'nova-loading'}
        style={props['style']}
        data-state="timeout"
        role="status"
        aria-live="polite"
      >
        <div className="nova-loading-spinner" aria-hidden="true" />
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
      <div
        className={(props['className'] !== undefined) ? `nova-loading ${props['className']}` : 'nova-loading'}
        style={props['style']}
        data-state="loading"
        role="status"
        aria-live="polite"
      >
        <div className="nova-loading-spinner" aria-hidden="true" />
        <p className="nova-loading-message">{loadingMessage}</p>
      </div>
    );
  }

  return null;
}

export default Loading;
