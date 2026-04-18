/**
 * Theme - Error.
 *
 * @since 0.15.0
 */
export type ThemeErrorPropsError = Error;

export type ThemeErrorPropsTryAgain = () => void;

export type ThemeErrorProps = {
  error: ThemeErrorPropsError;
  tryAgain: ThemeErrorPropsTryAgain;
  [key: string]: unknown;
};

export type ThemeErrorMessage = string;

export type ThemeErrorErrorTryAgain = string;
