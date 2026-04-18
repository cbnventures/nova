import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import type {
  ThemeLastUpdatedLastUpdatedAtDate,
  ThemeLastUpdatedLastUpdatedByUser,
  ThemeLastUpdatedLastUpdatedContext,
  ThemeLastUpdatedLastUpdatedCurrentLocale,
  ThemeLastUpdatedLastUpdatedDateDate,
  ThemeLastUpdatedLastUpdatedDateFormattedDate,
  ThemeLastUpdatedLastUpdatedDateLocale,
  ThemeLastUpdatedLastUpdatedDatePropsLastUpdatedAt,
  ThemeLastUpdatedLastUpdatedLabel,
  ThemeLastUpdatedLastUpdatedProps,
} from '../../types/theme/LastUpdated/index.d.ts';

/**
 * Theme - Last Updated - Last Updated Date.
 *
 * Formats an epoch timestamp into a localized UTC date string and
 * renders it inside a semantic time element with an ISO datetime
 * attribute for machine readability.
 *
 * @param {ThemeLastUpdatedLastUpdatedDatePropsLastUpdatedAt} lastUpdatedAt - Last updated at.
 *
 * @returns {JSX.Element}
 *
 * @since 0.15.0
 */
function LastUpdatedDate(lastUpdatedAt: ThemeLastUpdatedLastUpdatedDatePropsLastUpdatedAt, locale: ThemeLastUpdatedLastUpdatedDateLocale) {
  const date: ThemeLastUpdatedLastUpdatedDateDate = new Date(lastUpdatedAt);
  const formattedDate: ThemeLastUpdatedLastUpdatedDateFormattedDate = date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  });
  const atDateLabel: ThemeLastUpdatedLastUpdatedAtDate = translate({
    id: 'theme.lastUpdated.atDate',
    message: ' on {date}',
    description: 'The words used to describe when a document was last updated (date portion)',
  }, {
    date: formattedDate,
  });

  return (
    <span>
      {' '}
      <time dateTime={date.toISOString()}>
        {atDateLabel.trimStart()}
      </time>
    </span>
  );
}

/**
 * Theme - Last Updated - Last Updated.
 *
 * Renders a plain text span showing the last update timestamp
 * and author name, formatting the epoch date into a human-readable
 * UTC date string without framework styling.
 *
 * @param {ThemeLastUpdatedLastUpdatedProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function LastUpdated(props: ThemeLastUpdatedLastUpdatedProps) {
  const lastUpdatedContext: ThemeLastUpdatedLastUpdatedContext = useDocusaurusContext();
  const currentLocale: ThemeLastUpdatedLastUpdatedCurrentLocale = lastUpdatedContext['i18n']['currentLocale'];

  if (props['lastUpdatedAt'] === undefined && props['lastUpdatedBy'] === undefined) {
    return undefined;
  }

  const lastUpdatedLabel: ThemeLastUpdatedLastUpdatedLabel = translate({
    id: 'theme.lastUpdated.lastUpdatedAtBy',
    message: 'Last updated{atDate}{byUser}',
    description: 'The sentence used to describe when a document was last updated and by whom',
  }, {
    atDate: '',
    byUser: '',
  });
  const byUserLabel: ThemeLastUpdatedLastUpdatedByUser = translate({
    id: 'theme.lastUpdated.byUser',
    message: ' by {user}',
    description: 'The words used to describe when a document was last updated (author portion)',
  }, {
    user: props['lastUpdatedBy'] ?? '',
  });

  return (
    <span className="nova-last-updated">
      {lastUpdatedLabel}
      {(props['lastUpdatedAt'] !== undefined) && LastUpdatedDate(props['lastUpdatedAt'], currentLocale)}
      {(props['lastUpdatedBy'] !== undefined) && (
        <span>
          <strong>{byUserLabel}</strong>
        </span>
      )}
    </span>
  );
}

export default LastUpdated;
