import {
  AppMarketDownload,
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Spotlight,
  Stats,
} from '@cbnventures/docusaurus-preset-nova/components';

import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';

function Home() {
  return (
    <Layout description="Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked.">
      <Head>
        <title>Signal - Every Click Tells a Story</title>
      </Head>
      <Hero
        eyebrow="Attribution Engine"
        heading="Every click tells a story. Most tools miss the plot."
        tagline="Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked. And what almost was."
        ctaLabel="Get Started"
        ctaLink="/docs/overview/"
        secondaryCtaLabel="View on Threadbare"
        secondaryCtaLink="https://nova.cbnventures.io"
      />
      <main>
        <InstallStrip command="spark install signal-cli" copyTarget="icon" />
        <Features
          items={[
            {
              icon: 'lucide:radio',
              title: 'Beacon',
              description: 'Link minting engine. Branded short links with embedded attribution metadata that survives URL shortening, messaging apps, and cross-device handoffs. Every link is a sensor.',
            },
            {
              icon: 'lucide:triangle',
              title: 'Prism',
              description: 'Multi-touch attribution modeler. Traces conversion paths across channels, assigns weighted credit to every touchpoint, and reconstructs the full journey from first encounter to final action.',
            },
            {
              icon: 'lucide:activity',
              title: 'Pulse',
              description: 'Real-time click stream. A live feed of every interaction — geo, device, referrer, and attribution data — arriving within one second of each click.',
            },
            {
              icon: 'lucide:aperture',
              title: 'Aperture',
              description: 'Campaign snapshots. Point-in-time performance captures with comparison overlays. See exactly what changed between any two moments in a campaign.',
            },
            {
              icon: 'lucide:waves',
              title: 'Resonance',
              description: 'Audience overlap detector. Finds where audiences bleed into each other across campaigns and segments. Stop paying twice to reach the same people.',
            },
            {
              icon: 'lucide:flame',
              title: 'Flare',
              description: 'QR and deep link generator. Bridges physical and digital attribution with full trace metadata. Every scan carries the same intelligence as a digital click.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '2ms',
              label: 'Redirect latency',
              color: 'primary',
            },
            {
              value: '50M',
              label: 'Links traced',
              color: 'accent',
            },
            {
              value: '99.99%',
              label: 'Uptime',
              color: 'primary',
            },
            {
              value: '180+',
              label: 'Regions',
              color: 'accent',
            },
          ]}
        />
        <Spotlight surface="alt" heading="From Beacon to Attribution">
          <pre className="nova-code-snippet">
            {[
              '# Mint a Beacon link with attribution metadata',
              '$ signal beacon create \\',
              '    --url "https://threadbare.example/pricing" \\',
              '    --campaign "product-launch" \\',
              '    --channel "email" \\',
              '    --variant "hero-cta"',
              '',
              '\u2192 https://go.signal.example/a7x9m2',
              '  trace: trc_8f3a1b2c4d5e6f70',
              '',
              '# After conversion, query the attribution path',
              '$ signal prism path --trace "trc_8f3a1b2c4d5e6f70"',
              '',
              '\u2192 4 touchpoints across 3 channels',
              '  social   (day 1)   weight: 0.12',
              '  email    (day 3)   weight: 0.18',
              '  search   (day 8)   weight: 0.28',
              '  retarget (day 12)  weight: 0.42',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            Every link is a sensor. Every redirect is a data point. Prism connects them into a single attribution path.
          </p>
        </Spotlight>
        <AppMarketDownload
          label="Monitor campaigns on the go"
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading="Attribution Insights"
          description="Case studies, technical deep dives, and the patterns hiding in your click streams."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
