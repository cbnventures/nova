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
      message: 'Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Sentinel - Trust Is a Vulnerability',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Hero
        eyebrow={translate({
          id: 'home.hero.eyebrow',
          message: 'Security Platform',
          description: 'Front page hero eyebrow above the heading',
        })}
        heading={translate({
          id: 'home.hero.heading',
          message: 'Trust is a vulnerability.',
          description: 'Front page hero main heading',
        })}
        tagline={translate({
          id: 'home.hero.tagline',
          message: 'Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends.',
          description: 'Front page hero tagline beneath the heading',
        })}
        ctaLabel={translate({
          id: 'home.hero.ctaLabel',
          message: 'Explore the Platform',
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
        <InstallStrip command="spark install sentinel-agent" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:eye',
              title: translate({
                id: 'home.features.watchtower.title',
                message: 'Watchtower',
                description: 'Front page Features card title for Watchtower',
              }),
              description: translate({
                id: 'home.features.watchtower.description',
                message: 'Continuous posture assessment. Evaluates device health, location, and behavior every 90 seconds. The moment conditions change, Watchtower knows.',
                description: 'Front page Features card description for Watchtower',
              }),
            },
            {
              icon: 'lucide:door-open',
              title: translate({
                id: 'home.features.drawbridge.title',
                message: 'Drawbridge',
                description: 'Front page Features card title for Drawbridge',
              }),
              description: translate({
                id: 'home.features.drawbridge.description',
                message: 'Adaptive access gateway. Grants, narrows, or revokes access in real time based on context — identity, posture, location, and time. No static rules.',
                description: 'Front page Features card description for Drawbridge',
              }),
            },
            {
              icon: 'lucide:shield-check',
              title: translate({
                id: 'home.features.garrison.title',
                message: 'Garrison',
                description: 'Front page Features card title for Garrison',
              }),
              description: translate({
                id: 'home.features.garrison.description',
                message: 'Endpoint compliance engine. Enforces policy on every connected device. Disk encryption, OS version, firewall status — all verified before access is granted.',
                description: 'Front page Features card description for Garrison',
              }),
            },
            {
              icon: 'lucide:brick-wall',
              title: translate({
                id: 'home.features.rampart.title',
                message: 'Rampart',
                description: 'Front page Features card title for Rampart',
              }),
              description: translate({
                id: 'home.features.rampart.description',
                message: 'Micro-segmentation layer. Isolates workloads so lateral movement is impossible. Even if one segment is compromised, the breach stops there.',
                description: 'Front page Features card description for Rampart',
              }),
            },
            {
              icon: 'lucide:search',
              title: translate({
                id: 'home.features.spyglass.title',
                message: 'Spyglass',
                description: 'Front page Features card title for Spyglass',
              }),
              description: translate({
                id: 'home.features.spyglass.description',
                message: 'Audit and forensics. Full session reconstruction with 7-year immutable log retention. Every access decision, every policy evaluation, every connection — recorded.',
                description: 'Front page Features card description for Spyglass',
              }),
            },
            {
              icon: 'lucide:shield',
              title: translate({
                id: 'home.features.parapet.title',
                message: 'Parapet',
                description: 'Front page Features card title for Parapet',
              }),
              description: translate({
                id: 'home.features.parapet.description',
                message: 'Policy simulation sandbox. Test access rules against real traffic before enforcing them. See who gains access, who loses it, and why — without touching production.',
                description: 'Front page Features card description for Parapet',
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
              value: '90s',
              label: translate({
                id: 'home.stats.cycle.label',
                message: 'Re-evaluation cycle',
                description: 'Front page Stats label for re-evaluation cycle',
              }),
              color: 'primary',
            },
            {
              value: '10K',
              label: translate({
                id: 'home.stats.tunnels.label',
                message: 'Concurrent tunnels',
                description: 'Front page Stats label for concurrent tunnels',
              }),
              color: 'accent',
            },
            {
              value: '7yr',
              label: translate({
                id: 'home.stats.retention.label',
                message: 'Audit retention',
                description: 'Front page Stats label for audit retention',
              }),
              color: 'primary',
            },
            {
              value: '12ms',
              label: translate({
                id: 'home.stats.latency.label',
                message: 'Policy latency',
                description: 'Front page Stats label for policy latency',
              }),
              color: 'accent',
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'One Policy, Complete Evaluation',
            description: 'Front page Spotlight section heading',
          })}
        >
          <pre className="nova-code-snippet">
            {[
              '# trust-policy.grain',
              'policy "production-access" {',
              '  resource = "api-cluster-east"',
              '  effect   = "allow"',
              '',
              '  conditions {',
              '    device.posture   >= 85',
              '    user.mfa         = true',
              '    network.location = ["office", "vpn"]',
              '    session.age      <= 3600',
              '  }',
              '',
              '  on_failure {',
              '    action  = "revoke"',
              '    notify  = "security-ops"',
              '    log     = "spyglass"',
              '  }',
              '}',
              '',
              '$ sentinel evaluate --policy production-access',
              '  Watchtower posture score: 92 (pass)',
              '  MFA status: enrolled (pass)',
              '  Network: vpn/filament-east (pass)',
              '  Session age: 1847s (pass)',
              '  Result: ACCESS GRANTED — next evaluation in 90s',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Define what trust means. Sentinel enforces it continuously.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Monitor your fleet on the go',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'Security Bulletin',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Threat research, posture advisories, and the philosophy of continuous trust.',
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
