import { translate } from '@docusaurus/Translate';

import type {
  ThemeErrorErrorTryAgain,
  ThemeErrorMessage,
  ThemeErrorProps,
} from '../../types/theme/Error/index.d.ts';

/**
 * Theme - Error.
 *
 * Renders a plain error fallback with the error message and
 * a retry button, providing a minimal view for the top-level
 * error boundary without any layout wrapper.
 *
 * @param {ThemeErrorProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function Error(props: ThemeErrorProps) {
  const message: ThemeErrorMessage = props['error']['message'];
  const tryAgainLabel: ThemeErrorErrorTryAgain = translate({
    id: 'theme.Error.tryAgain',
    message: 'Try again',
    description: 'The label for the button that retries after an error',
  });

  return (
    <div className="nova-error" role="alert">
      <p className="nova-error-message">{message}</p>
      <div className="nova-error-actions">
        <button className="nova-error-retry" type="button" onClick={props['tryAgain']}>
          {tryAgainLabel}
        </button>
      </div>
    </div>
  );
}

export default Error;
