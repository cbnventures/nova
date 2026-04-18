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
    <Layout description="Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery.">
      <Head>
        <title>Envoy - Messages Arrive</title>
      </Head>
      <Hero
        eyebrow="Integration Infrastructure"
        heading="Messages arrive. That is the entire product."
        tagline="Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery."
        ctaLabel="Read the Docs"
        ctaLink="/docs/overview/"
        secondaryCtaLabel="View on Threadbare"
        secondaryCtaLink="https://nova.cbnventures.io"
      />
      <main>
        <InstallStrip command="vial pull envoy" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:route',
              title: 'Dispatch',
              description: 'Intelligent routing engine. Inspects every incoming payload and routes by content, source, severity, or custom rules. First match wins. No ambiguity.',
            },
            {
              icon: 'lucide:repeat',
              title: 'Courier',
              description: 'Guaranteed-delivery retry engine. Exponential backoff with jitter, dead-letter queues for messages that will never arrive, and delivery receipts for every attempt.',
            },
            {
              icon: 'lucide:package',
              title: 'Parcel',
              description: 'Payload transformation pipeline. Rewrites messages between formats — JSON to JSON, JSON to plaintext, XML to JSON. Field mapping, lossy and lossless modes.',
            },
            {
              icon: 'lucide:lock',
              title: 'Cipher',
              description: 'Authentication gateway. HMAC-SHA256 signatures, bearer tokens, and IP allowlists. Verifies source identity before a single byte reaches the transformation pipeline.',
            },
            {
              icon: 'lucide:scroll-text',
              title: 'Ledger',
              description: 'Full delivery audit trail. Every message received, transformed, routed, and delivered is recorded in an append-only log with configurable retention policies.',
            },
            {
              icon: 'lucide:shield',
              title: 'Embassy',
              description: 'Origin-masking reverse proxy. Keeps your internal services off the public internet. External sources hit Embassy. Internal services never know the outside exists.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '8',
              label: 'Protocol translators',
              color: 'primary',
            },
            {
              value: '3MB',
              label: 'Vial image',
              color: 'accent',
            },
            {
              value: '0',
              label: 'External dependencies',
              color: 'primary',
            },
            {
              value: '<5ms',
              label: 'Relay latency',
              color: 'accent',
            },
          ]}
        />
        <Spotlight surface="alt" heading="Translate, Route, Deliver">
          <pre className="nova-code-snippet">
            {[
              '# Glassboard alert comes in',
              '{',
              '  "alertname": "HighCPU",',
              '  "severity": "critical",',
              '  "instance": "web-03.arcline.internal",',
              '  "value": "94.2%"',
              '}',
              '',
              '# Envoy transforms and routes to Canary',
              '{',
              '  "title": "[critical] HighCPU",',
              '  "body": "web-03.arcline.internal \u2014 CPU at 94.2%",',
              '  "priority": 5,',
              '  "tags": ["rotating_light"]',
              '}',
              '',
              '# Delivered in 3.1ms. Courier confirms receipt.',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            Glassboard fires the alert. Envoy translates the payload, routes it to
            the right Canary topic, and confirms delivery. Neither side knows
            the other exists.
          </p>
        </Spotlight>
        <AppMarketDownload
          label="Get delivery notifications"
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading="Dispatches from the Relay Room"
          description="Release notes, integration deep dives, and the occasional dispatch from the relay room."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
