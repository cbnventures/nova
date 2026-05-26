import {
  AppMarketDownload,
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Spotlight,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/blocks';

import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import Layout from '@theme/Layout';

function Home() {
  return (
    <Layout description={translate({
      id: 'home.layout.description',
      message: 'Marshal is the Department of Repository Affairs — automated stewardship for projects that prefer paperwork to drama.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Marshal - Filed, Sealed, Automated',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Hero
        eyebrow={translate({
          id: 'home.hero.eyebrow',
          message: 'Repository Stewardship',
          description: 'Front page hero eyebrow above the heading',
        })}
        heading={translate({
          id: 'home.hero.heading',
          message: 'Filed, sealed, automated.',
          description: 'Front page hero main heading',
        })}
        tagline={translate({
          id: 'home.hero.tagline',
          message: 'Marshal is the Department of Repository Affairs — automated stewardship for projects that prefer paperwork to drama. Every thread, every ticket, every access tier, handled in order.',
          description: 'Front page hero tagline beneath the heading',
        })}
        ctaLabel={translate({
          id: 'home.hero.ctaLabel',
          message: 'Get Started',
          description: 'Front page hero primary call-to-action button label',
        })}
        ctaLink="/docs/overview/"
        secondaryCtaLabel={translate({
          id: 'home.hero.secondaryCtaLabel',
          message: 'View on Threadbare',
          description: 'Front page hero secondary call-to-action button label',
        })}
        secondaryCtaLink="https://nova.cbnventures.io"
      />
      <main>
        <InstallStrip command="spark install marshal" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:file-text',
              title: translate({
                id: 'home.features.policies.title',
                message: 'Policies',
                description: 'Front page Features card title for Policies',
              }),
              description: translate({
                id: 'home.features.policies.description',
                message: 'Write a YAML block describing how Marshal handles a class of events — stale threads, overdue PRs, support by tier. Marshal reads only what is filed and stamps only what is sealed.',
                description: 'Front page Features card description for Policies',
              }),
            },
            {
              icon: 'lucide:inbox',
              title: translate({
                id: 'home.features.dockets.title',
                message: 'Dockets',
                description: 'Front page Features card title for Dockets',
              }),
              description: translate({
                id: 'home.features.dockets.description',
                message: 'Every action Marshal takes writes a line in the public record. Closed threads, stamped approvals, scheduled rollovers — all append-only, all visible, nothing retracted.',
                description: 'Front page Features card description for Dockets',
              }),
            },
            {
              icon: 'lucide:layers',
              title: translate({
                id: 'home.features.accessTiers.title',
                message: 'Access Tiers',
                description: 'Front page Features card title for Access Tiers',
              }),
              description: translate({
                id: 'home.features.accessTiers.description',
                message: 'Route incoming work by sponsor, contributor, or public. The label is stamped, not negotiated. Every routing decision is filed in the docket.',
                description: 'Front page Features card description for Access Tiers',
              }),
            },
            {
              icon: 'lucide:clock',
              title: translate({
                id: 'home.features.scheduledStewardship.title',
                message: 'Scheduled Stewardship',
                description: 'Front page Features card title for Scheduled Stewardship',
              }),
              description: translate({
                id: 'home.features.scheduledStewardship.description',
                message: 'Run cleanups, audits, and rollovers on a cron. Marshal acts at the top of the hour, files a record, and moves on. Nothing waits for a human to remember.',
                description: 'Front page Features card description for Scheduled Stewardship',
              }),
            },
            {
              icon: 'lucide:archive',
              title: translate({
                id: 'home.features.threadArchival.title',
                message: 'Thread Archival',
                description: 'Front page Features card title for Thread Archival',
              }),
              description: translate({
                id: 'home.features.threadArchival.description',
                message: 'Close and seal threads inactive for N days — with a paper trail for each. Every sealed thread carries the reason for archival and a path to reopen.',
                description: 'Front page Features card description for Thread Archival',
              }),
            },
            {
              icon: 'lucide:stamp',
              title: translate({
                id: 'home.features.automatedStamps.title',
                message: 'Automated Stamps',
                description: 'Front page Features card title for Automated Stamps',
              }),
              description: translate({
                id: 'home.features.automatedStamps.description',
                message: 'Marshal acts under a standing authorization. Every action carries a timestamp, an author of record, and a reference to the policy that triggered it.',
                description: 'Front page Features card description for Automated Stamps',
              }),
            },
          ]}
        />
        <Stats
          heading={translate({
            id: 'home.stats.heading',
            message: 'By the Numbers',
            description: 'Front page Stats section heading',
          })}
          items={[
            {
              value: '0',
              label: translate({
                id: 'home.stats.manualClosures.label',
                message: 'Manual closures',
                description: 'Front page Stats label for manual closures count',
              }),
              color: 'primary',
            },
            {
              value: '1',
              label: translate({
                id: 'home.stats.policyFile.label',
                message: 'Policy file',
                description: 'Front page Stats label for policy file count',
              }),
              color: 'accent',
            },
            {
              value: '∞',
              label: translate({
                id: 'home.stats.docketEntries.label',
                message: 'Docket entries',
                description: 'Front page Stats label for docket entries count',
              }),
              color: 'primary',
            },
            {
              value: '3',
              label: translate({
                id: 'home.stats.accessTiers.label',
                message: 'Access tiers',
                description: 'Front page Stats label for access tiers count',
              }),
              color: 'accent',
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'One Policy File, Everything Stamped',
            description: 'Front page Spotlight section heading',
          })}
        >
          <pre className="nova-code-snippet">
            {[
              '# marshal.policy',
              'thread-archival {',
              '  inactive_days = 90',
              '  label         = "archived"',
              '  notice        = true',
              '}',
              '',
              'access-tiers {',
              '  sponsor     { priority = 1 }',
              '  contributor { priority = 2 }',
              '  public      { priority = 3 }',
              '}',
              '',
              '$ marshal status',
              '→ 2 policies active',
              '→ 2,108 threads archived last cycle',
              '→ 3 access tiers in effect',
              '→ Last action: STAMPED at 06:00 UTC',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Describe the rules. Marshal files the paperwork.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Review your docket on the go',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'Dispatches from the Department',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Policies filed, dockets stamped, stewardship on the record.',
            description: 'Front page BlogPreview section description',
          })}
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
