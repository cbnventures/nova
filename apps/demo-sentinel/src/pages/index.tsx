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
    <Layout description="Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends.">
      <Head>
        <title>Sentinel - Trust Is a Vulnerability</title>
      </Head>
      <Hero
        eyebrow="Security Platform"
        heading="Trust is a vulnerability."
        tagline="Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends."
        ctaLabel="Explore the Platform"
        ctaLink="/docs/platform-overview/"
        secondaryCtaLabel="View on Threadbare"
        secondaryCtaLink="https://nova.cbnventures.io"
      />
      <main>
        <InstallStrip command="spark install sentinel-agent" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:eye',
              title: 'Watchtower',
              description: 'Continuous posture assessment. Evaluates device health, location, and behavior every 90 seconds. The moment conditions change, Watchtower knows.',
            },
            {
              icon: 'lucide:door-open',
              title: 'Drawbridge',
              description: 'Adaptive access gateway. Grants, narrows, or revokes access in real time based on context — identity, posture, location, and time. No static rules.',
            },
            {
              icon: 'lucide:shield-check',
              title: 'Garrison',
              description: 'Endpoint compliance engine. Enforces policy on every connected device. Disk encryption, OS version, firewall status — all verified before access is granted.',
            },
            {
              icon: 'lucide:brick-wall',
              title: 'Rampart',
              description: 'Micro-segmentation layer. Isolates workloads so lateral movement is impossible. Even if one segment is compromised, the breach stops there.',
            },
            {
              icon: 'lucide:search',
              title: 'Spyglass',
              description: 'Audit and forensics. Full session reconstruction with 7-year immutable log retention. Every access decision, every policy evaluation, every connection — recorded.',
            },
            {
              icon: 'lucide:shield',
              title: 'Parapet',
              description: 'Policy simulation sandbox. Test access rules against real traffic before enforcing them. See who gains access, who loses it, and why — without touching production.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '90s',
              label: 'Re-evaluation cycle',
              color: 'primary',
            },
            {
              value: '10K',
              label: 'Concurrent tunnels',
              color: 'accent',
            },
            {
              value: '7yr',
              label: 'Audit retention',
              color: 'primary',
            },
            {
              value: '12ms',
              label: 'Policy latency',
              color: 'accent',
            },
          ]}
        />
        <Spotlight surface="alt" heading="One Policy, Complete Evaluation">
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
              '  Result: ACCESS GRANTED \u2014 next evaluation in 90s',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            Define what trust means. Sentinel enforces it continuously.
          </p>
        </Spotlight>
        <AppMarketDownload
          label="Monitor your fleet on the go"
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading="Security Bulletin"
          description="Threat research, posture advisories, and the philosophy of continuous trust."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
