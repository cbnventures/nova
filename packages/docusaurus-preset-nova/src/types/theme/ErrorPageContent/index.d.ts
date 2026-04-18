/**
 * Theme - Error Page Content - Error Page Content.
 *
 * @since 0.15.0
 */
export type ThemeErrorPageContentErrorPageContentPropsError = Error;

export type ThemeErrorPageContentErrorPageContentPropsTryAgain = () => void;

export type ThemeErrorPageContentErrorPageContentProps = {
  error: ThemeErrorPageContentErrorPageContentPropsError;
  tryAgain: ThemeErrorPageContentErrorPageContentPropsTryAgain;
  [key: string]: unknown;
};

export type ThemeErrorPageContentErrorPageContentMessage = string;

export type ThemeErrorPageContentErrorPageContentTitle = string;

export type ThemeErrorPageContentErrorPageContentTryAgain = string;
