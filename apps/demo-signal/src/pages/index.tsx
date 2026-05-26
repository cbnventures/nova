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
      message: 'Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Signal - Every Click Tells a Story',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Hero
        eyebrow={translate({
          id: 'home.hero.eyebrow',
          message: 'Attribution Engine',
          description: 'Front page hero eyebrow above the heading',
        })}
        heading={translate({
          id: 'home.hero.heading',
          message: 'Every click tells a story. Most tools miss the plot.',
          description: 'Front page hero main heading',
        })}
        tagline={translate({
          id: 'home.hero.tagline',
          message: 'Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked. And what almost was.',
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
        <InstallStrip command="spark install signal-cli" copyTarget="icon" />
        <Features
          items={[
            {
              icon: 'lucide:radio',
              title: translate({
                id: 'home.features.beacon.title',
                message: 'Beacon',
                description: 'Front page Features card title for Beacon',
              }),
              description: translate({
                id: 'home.features.beacon.description',
                message: 'Link minting engine. Branded short links with embedded attribution metadata that survives URL shortening, messaging apps, and cross-device handoffs. Every link is a sensor.',
                description: 'Front page Features card description for Beacon',
              }),
            },
            {
              icon: 'lucide:triangle',
              title: translate({
                id: 'home.features.prism.title',
                message: 'Prism',
                description: 'Front page Features card title for Prism',
              }),
              description: translate({
                id: 'home.features.prism.description',
                message: 'Multi-touch attribution modeler. Traces conversion paths across channels, assigns weighted credit to every touchpoint, and reconstructs the full journey from first encounter to final action.',
                description: 'Front page Features card description for Prism',
              }),
            },
            {
              icon: 'lucide:activity',
              title: translate({
                id: 'home.features.pulse.title',
                message: 'Pulse',
                description: 'Front page Features card title for Pulse',
              }),
              description: translate({
                id: 'home.features.pulse.description',
                message: 'Real-time click stream. A live feed of every interaction — geo, device, referrer, and attribution data — arriving within one second of each click.',
                description: 'Front page Features card description for Pulse',
              }),
            },
            {
              icon: 'lucide:aperture',
              title: translate({
                id: 'home.features.aperture.title',
                message: 'Aperture',
                description: 'Front page Features card title for Aperture',
              }),
              description: translate({
                id: 'home.features.aperture.description',
                message: 'Campaign snapshots. Point-in-time performance captures with comparison overlays. See exactly what changed between any two moments in a campaign.',
                description: 'Front page Features card description for Aperture',
              }),
            },
            {
              icon: 'lucide:waves',
              title: translate({
                id: 'home.features.resonance.title',
                message: 'Resonance',
                description: 'Front page Features card title for Resonance',
              }),
              description: translate({
                id: 'home.features.resonance.description',
                message: 'Audience overlap detector. Finds where audiences bleed into each other across campaigns and segments. Stop paying twice to reach the same people.',
                description: 'Front page Features card description for Resonance',
              }),
            },
            {
              icon: 'lucide:flame',
              title: translate({
                id: 'home.features.flare.title',
                message: 'Flare',
                description: 'Front page Features card title for Flare',
              }),
              description: translate({
                id: 'home.features.flare.description',
                message: 'QR and deep link generator. Bridges physical and digital attribution with full trace metadata. Every scan carries the same intelligence as a digital click.',
                description: 'Front page Features card description for Flare',
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
              value: '2ms',
              label: translate({
                id: 'home.stats.latency.label',
                message: 'Redirect latency',
                description: 'Front page Stats label for redirect latency',
              }),
              color: 'primary',
            },
            {
              value: '50M',
              label: translate({
                id: 'home.stats.links.label',
                message: 'Links traced',
                description: 'Front page Stats label for links traced',
              }),
              color: 'accent',
            },
            {
              value: '99.99%',
              label: translate({
                id: 'home.stats.uptime.label',
                message: 'Uptime',
                description: 'Front page Stats label for uptime',
              }),
              color: 'primary',
            },
            {
              value: '180+',
              label: translate({
                id: 'home.stats.regions.label',
                message: 'Regions',
                description: 'Front page Stats label for regions',
              }),
              color: 'accent',
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'From Beacon to Attribution',
            description: 'Front page Spotlight section heading',
          })}
        >
          <pre className="nova-code-snippet">
            {[
              '# Mint a Beacon link with attribution metadata',
              '$ signal beacon create \\',
              '    --url "https://threadbare.example/pricing" \\',
              '    --campaign "product-launch" \\',
              '    --channel "email" \\',
              '    --variant "hero-cta"',
              '',
              '→ https://go.signal.example/a7x9m2',
              '  trace: trc_8f3a1b2c4d5e6f70',
              '',
              '# After conversion, query the attribution path',
              '$ signal prism path --trace "trc_8f3a1b2c4d5e6f70"',
              '',
              '→ 4 touchpoints across 3 channels',
              '  social   (day 1)   weight: 0.12',
              '  email    (day 3)   weight: 0.18',
              '  search   (day 8)   weight: 0.28',
              '  retarget (day 12)  weight: 0.42',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Every link is a sensor. Every redirect is a data point. Prism connects them into a single attribution path.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Monitor campaigns on the go',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'Attribution Insights',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Case studies, technical deep dives, and the patterns hiding in your click streams.',
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
