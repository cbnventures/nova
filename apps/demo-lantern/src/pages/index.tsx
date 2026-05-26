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
      message: 'Lantern watches your whole house — zones, motion, arm/disarm — without ever raising its voice.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Lantern - Watchful, Warm, Always Home',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Hero
        eyebrow={translate({
          id: 'home.hero.eyebrow',
          message: 'Whole-House Monitoring',
          description: 'Front page hero eyebrow above the heading',
        })}
        heading={translate({
          id: 'home.hero.heading',
          message: 'Watchful, warm, always home.',
          description: 'Front page hero main heading',
        })}
        tagline={translate({
          id: 'home.hero.tagline',
          message: 'Lantern watches your whole house — zones, motion, arm/disarm — without ever raising its voice. Every room, every door, every quiet moment, held gently.',
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
        <InstallStrip command="spark install lantern" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:home',
              title: translate({
                id: 'home.features.zones.title',
                message: 'Zones',
                description: 'Front page Features card title for Zones',
              }),
              description: translate({
                id: 'home.features.zones.description',
                message: 'Group devices by where they live — perimeter, interior, sleeping areas. Arm any zone independently. Disarm gently, by name. Lantern never raises its voice.',
                description: 'Front page Features card description for Zones',
              }),
            },
            {
              icon: 'lucide:activity',
              title: translate({
                id: 'home.features.motionEvents.title',
                message: 'Motion Events',
                description: 'Front page Features card title for Motion Events',
              }),
              description: translate({
                id: 'home.features.motionEvents.description',
                message: 'Every motion passes through the event stream with direction and an optional confidence band. Replay, filter, hand off to a hub. Nothing is dropped.',
                description: 'Front page Features card description for Motion Events',
              }),
            },
            {
              icon: 'lucide:door-open',
              title: translate({
                id: 'home.features.contactSensors.title',
                message: 'Contact Sensors',
                description: 'Front page Features card title for Contact Sensors',
              }),
              description: translate({
                id: 'home.features.contactSensors.description',
                message: 'Door opened, window held, gate closed — each contact event is timestamped and stored in a quiet ledger. Browse sensor history without leaving the room.',
                description: 'Front page Features card description for Contact Sensors',
              }),
            },
            {
              icon: 'lucide:shield-check',
              title: translate({
                id: 'home.features.armDisarm.title',
                message: 'Arm / Disarm',
                description: 'Front page Features card title for Arm / Disarm',
              }),
              description: translate({
                id: 'home.features.armDisarm.description',
                message: 'Arm or disarm by zone, by user, or by schedule. Hand off control to someone you trust — by name, by passphrase, or by HomeKit Home Hub presence.',
                description: 'Front page Features card description for Arm / Disarm',
              }),
            },
            {
              icon: 'lucide:search',
              title: translate({
                id: 'home.features.deviceDiscovery.title',
                message: 'Device Discovery',
                description: 'Front page Features card title for Device Discovery',
              }),
              description: translate({
                id: 'home.features.deviceDiscovery.description',
                message: 'Lantern finds every sensor and contact device on your hub automatically. No manual pairing, no configuration files. It discovers what is already there.',
                description: 'Front page Features card description for Device Discovery',
              }),
            },
            {
              icon: 'lucide:history',
              title: translate({
                id: 'home.features.sensorHistory.title',
                message: 'Sensor History',
                description: 'Front page Features card title for Sensor History',
              }),
              description: translate({
                id: 'home.features.sensorHistory.description',
                message: 'A quiet ledger of everything that happened — motion, contact, arm states — sorted by zone and time. Scroll back through a week without leaving the dashboard.',
                description: 'Front page Features card description for Sensor History',
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
              value: '4',
              label: translate({
                id: 'home.stats.zones.label',
                message: 'Default zones',
                description: 'Front page Stats label for default zones count',
              }),
              color: 'primary',
            },
            {
              value: '0',
              label: translate({
                id: 'home.stats.configFiles.label',
                message: 'Config files',
                description: 'Front page Stats label for config files count',
              }),
              color: 'accent',
            },
            {
              value: '2am',
              label: translate({
                id: 'home.stats.handoff.label',
                message: 'Handoff ready',
                description: 'Front page Stats label for handoff readiness',
              }),
              color: 'primary',
            },
            {
              value: '∞',
              label: translate({
                id: 'home.stats.sensorHistory.label',
                message: 'Sensor history',
                description: 'Front page Stats label for sensor history',
              }),
              color: 'accent',
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'Every Zone, Quietly Held',
            description: 'Front page Spotlight section heading',
          })}
        >
          <pre className="nova-code-snippet">
            {[
              '# lantern.zones',
              'zone "perimeter" {',
              '  devices = autodiscovered',
              '  arm     = always',
              '}',
              '',
              'zone "watch" {',
              '  devices = autodiscovered',
              '  arm     = after_dark',
              '  handoff = trusted_user',
              '}',
              '',
              '$ lantern status',
              '→ 4 zones active',
              '→ 12 devices discovered',
              '→ Perimeter armed, Watch armed after dark',
              '→ Last event: front door closed at 11:02pm',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Describe who lives where. Lantern watches the rest.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Manage your zones on the go',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'From the Porch Light',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Updates, patterns, and quiet notes from the house.',
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
