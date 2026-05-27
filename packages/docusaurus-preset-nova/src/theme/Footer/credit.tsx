import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { usePluginData } from '@docusaurus/useGlobalData';
import IconExternalLink from '@theme/IconExternalLink';

import type {
  Theme_Footer_Credit_CreditDocusaurusLabel,
  Theme_Footer_Credit_CreditDocusaurusUrl,
  Theme_Footer_Credit_CreditNovaLabel,
  Theme_Footer_Credit_CreditNovaUrl,
  Theme_Footer_Credit_CreditPhraseIndex,
  Theme_Footer_Credit_CreditPhrases,
  Theme_Footer_Credit_CreditSuffix,
  Theme_Footer_Credit_CreditText,
  Theme_Footer_Credit_CreditUtmSource,
  Theme_Footer_Credit_DocusaurusContext,
  Theme_Footer_Credit_GlobalData,
  Theme_Footer_Credit_Returns,
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
function FooterCredit(): Theme_Footer_Credit_Returns {
  const docusaurusContext: Theme_Footer_Credit_DocusaurusContext = useDocusaurusContext();
  const creditUtmSource: Theme_Footer_Credit_CreditUtmSource = new URL(docusaurusContext.siteConfig.url).hostname;
  const creditNovaUrl: Theme_Footer_Credit_CreditNovaUrl = `https://nova.cbnventures.io?utm_source=${creditUtmSource}&utm_medium=referral&utm_campaign=nova-preset-credit`;
  const creditDocusaurusUrl: Theme_Footer_Credit_CreditDocusaurusUrl = `https://docusaurus.io?utm_source=${creditUtmSource}&utm_medium=referral&utm_campaign=nova-preset-credit`;

  const creditPhrases: Theme_Footer_Credit_CreditPhrases = [
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

  const globalData: Theme_Footer_Credit_GlobalData = (usePluginData('docusaurus-theme-nova') ?? {}) as Theme_Footer_Credit_GlobalData;
  const creditPhraseIndex: Theme_Footer_Credit_CreditPhraseIndex = (typeof globalData['creditPhraseIndex'] === 'number') ? globalData['creditPhraseIndex'] : 0;

  const creditSuffix: Theme_Footer_Credit_CreditSuffix = translate({
    id: 'theme.footer.creditSuffix',
    message: ' with ',
    description: 'The suffix between the random verb and the credit links in the footer',
  });
  const creditText: Theme_Footer_Credit_CreditText = `${creditPhrases[creditPhraseIndex]}${creditSuffix}`;
  const creditNovaLabel: Theme_Footer_Credit_CreditNovaLabel = translate({
    id: 'theme.footer.creditNovaLabel',
    message: 'Nova',
    description: 'The label for the Nova credit link in the footer',
  });
  const creditDocusaurusLabel: Theme_Footer_Credit_CreditDocusaurusLabel = translate({
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
