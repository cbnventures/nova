import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import IconExternalLink from '@theme/IconExternalLink';

import type {
  ThemeFooterCreditCreditDocusaurusLabel,
  ThemeFooterCreditCreditDocusaurusUrl,
  ThemeFooterCreditCreditNovaLabel,
  ThemeFooterCreditCreditNovaUrl,
  ThemeFooterCreditCreditPhraseIndex,
  ThemeFooterCreditCreditPhrases,
  ThemeFooterCreditCreditSuffix,
  ThemeFooterCreditCreditText,
  ThemeFooterCreditCreditUtmSource,
  ThemeFooterCreditDocusaurusContext,
  ThemeFooterCreditGlobalData,
  ThemeFooterCreditReturns,
} from '../../types/theme/Footer/credit.d.ts';

/**
 * Theme - Footer - Credit.
 *
 * Shared credit attribution line that renders a rotating verb chosen at build
 * time and read from plugin global data at render time, so SSR HTML and
 * client hydration match (no flash from useEffect-time randomization).
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
    translate({
      id: 'theme.footer.creditPhrases.forged',
      message: 'Forged',
      description: 'Random verb 1 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.crafted',
      message: 'Crafted',
      description: 'Random verb 2 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.assembled',
      message: 'Assembled',
      description: 'Random verb 3 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.conjured',
      message: 'Conjured',
      description: 'Random verb 4 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.woven',
      message: 'Woven',
      description: 'Random verb 5 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.sculpted',
      message: 'Sculpted',
      description: 'Random verb 6 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.summoned',
      message: 'Summoned',
      description: 'Random verb 7 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.brewed',
      message: 'Brewed',
      description: 'Random verb 8 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.sparked',
      message: 'Sparked',
      description: 'Random verb 9 of 10 in the footer credit line',
    }),
    translate({
      id: 'theme.footer.creditPhrases.kindled',
      message: 'Kindled',
      description: 'Random verb 10 of 10 in the footer credit line',
    }),
  ];

  const globalData: ThemeFooterCreditGlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as ThemeFooterCreditGlobalData;
  const creditPhraseIndex: ThemeFooterCreditCreditPhraseIndex = (typeof globalData['creditPhraseIndex'] === 'number') ? globalData['creditPhraseIndex'] : 0;

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
      <a href={creditNovaUrl} target="_blank" rel="noopener noreferrer">
        {creditNovaLabel}
        <IconExternalLink />
      </a>
      {' × '}
      <a href={creditDocusaurusUrl} target="_blank" rel="noopener noreferrer">
        {creditDocusaurusLabel}
        <IconExternalLink />
      </a>
    </p>
  );
}

export default FooterCredit;
