import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  useEffect,
  useState,
} from 'react';

import type {
  ThemeFooterCreditCreditDocusaurusLabel,
  ThemeFooterCreditCreditDocusaurusUrl,
  ThemeFooterCreditCreditNovaLabel,
  ThemeFooterCreditCreditNovaUrl,
  ThemeFooterCreditCreditPhraseIndex,
  ThemeFooterCreditCreditPhraseIndexState,
  ThemeFooterCreditCreditPhrases,
  ThemeFooterCreditCreditSuffix,
  ThemeFooterCreditCreditText,
  ThemeFooterCreditCreditUtmSource,
  ThemeFooterCreditDocusaurusContext,
  ThemeFooterCreditReturns,
  ThemeFooterCreditSetCreditPhraseIndex,
} from '../../types/theme/Footer/credit.d.ts';

/**
 * Theme - Footer - Credit.
 *
 * Shared credit attribution line that renders a rotating verb with
 * links to the Nova and Docusaurus projects using a stable default
 * for SSR then swapping to a random phrase after hydration.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function FooterCredit(): ThemeFooterCreditReturns {
  const docusaurusContext: ThemeFooterCreditDocusaurusContext = useDocusaurusContext();
  const creditUtmSource: ThemeFooterCreditCreditUtmSource = new URL(docusaurusContext.siteConfig.url).hostname;
  const creditNovaUrl: ThemeFooterCreditCreditNovaUrl = `https://nova.cbnventures.io?utm_source=${creditUtmSource}&utm_medium=referral&utm_campaign=nova-preset-credit`;
  const creditDocusaurusUrl: ThemeFooterCreditCreditDocusaurusUrl = `https://docusaurus.io?utm_source=${creditUtmSource}&utm_medium=referral&utm_campaign=nova-preset-credit`;

  const creditPhrases: ThemeFooterCreditCreditPhrases = [
    'Forged',
    'Crafted',
    'Assembled',
    'Conjured',
    'Woven',
    'Sculpted',
    'Summoned',
    'Brewed',
    'Sparked',
    'Kindled',
  ];

  const creditPhraseIndexState: ThemeFooterCreditCreditPhraseIndexState = useState<ThemeFooterCreditCreditPhraseIndex>(0);
  const creditPhraseIndex: ThemeFooterCreditCreditPhraseIndex = creditPhraseIndexState[0];
  const setCreditPhraseIndex: ThemeFooterCreditSetCreditPhraseIndex = creditPhraseIndexState[1];

  useEffect(() => {
    setCreditPhraseIndex(Math.floor(Math.random() * creditPhrases.length));

    return undefined;
  }, []);

  const creditSuffix: ThemeFooterCreditCreditSuffix = translate({
    id: 'theme.footer.creditSuffix',
    message: ' with ',
    description: 'The suffix between the random verb and the credit links in the footer',
  });
  const creditText: ThemeFooterCreditCreditText = `${creditPhrases[creditPhraseIndex]}${creditSuffix}`;
  const creditNovaLabel: ThemeFooterCreditCreditNovaLabel = translate({
    id: 'theme.footer.creditNovaLabel',
    message: 'Nova',
    description: 'The label for the Nova credit link in the footer',
  });
  const creditDocusaurusLabel: ThemeFooterCreditCreditDocusaurusLabel = translate({
    id: 'theme.footer.creditDocusaurusLabel',
    message: 'Docusaurus',
    description: 'The label for the Docusaurus credit link in the footer',
  });

  return (
    <p>
      {creditText}
      <a href={creditNovaUrl} target="_blank" rel="noopener noreferrer">{creditNovaLabel}</a>
      {' \u00D7 '}
      <a href={creditDocusaurusUrl} target="_blank" rel="noopener noreferrer">{creditDocusaurusLabel}</a>
    </p>
  );
}

export default FooterCredit;
