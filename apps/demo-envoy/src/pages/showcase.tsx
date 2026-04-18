import {
  AppMarketDownload,
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Spotlight,
  Stats,
  Terminology,
} from '@cbnventures/docusaurus-preset-nova/components';
import Details from '@theme/Details';
import Layout from '@theme/Layout';
import { useState } from 'react';

import type {
  PagesShowcaseExpanded,
  PagesShowcaseSetExpanded,
  PagesShowcaseState,
} from '@site/src/types/pages/showcase.d.ts';

function Showcase() {
  const state: PagesShowcaseState = useState<PagesShowcaseExpanded>(undefined);
  const expanded: PagesShowcaseExpanded = state[0];
  const setExpanded: PagesShowcaseSetExpanded = state[1];

  function handleToggleAll() {
    setExpanded(expanded !== true);

    return undefined;
  }

  return (
    <Layout description="Envoy component showcase demonstrating every component from docusaurus-preset-nova.">
      <main
        className="nova-container"
        style={{
          paddingTop: '2rem',
          paddingBottom: '4rem',
        }}
      >
        <div
          style={{
            marginBottom: '2.5rem',
            padding: '1.25rem 1.5rem',
            background: 'color-mix(in srgb, var(--nova-color-primary-500), transparent 96%)',
            border: '1px solid color-mix(in srgb, var(--nova-color-primary-500), transparent 88%)',
            borderRadius: 'var(--nova-shape-radius)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              gap: '1rem',
            }}
          >
            <h1 style={{ margin: 0 }}>Component Showcase</h1>
            <button
              className="nova-cta-secondary"
              type="button"
              onClick={handleToggleAll}
              style={{
                flexShrink: 0,
                padding: '0.375rem 1rem',
                fontSize: '0.8125rem',
              }}
            >
              {(expanded === true) ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
          <p
            style={{
              margin: '0.5rem 0 0',
              fontSize: '0.875rem',
              color: 'var(--nova-color-neutral-500)',
            }}
          >
            Every component from the Envoy preset, rendered with sample data.
          </p>
        </div>
        <Details open={expanded}>
          <summary><h2>Hero (full)</h2></summary>
          <Hero
            eyebrow="Component Showcase"
            heading="Every Envoy component, demonstrated in one place."
            tagline="This page renders each component from @cbnventures/docusaurus-preset-nova/components with Envoy-world data so you can see how they look and behave."
            ctaLabel="Read the Docs"
            ctaLink="/docs/overview/"
            secondaryCtaLabel="View on Threadbare"
            secondaryCtaLink="https://nova.cbnventures.io"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Hero (minimal)</h2></summary>
          <Hero
            heading="Deliver without ceremony."
            tagline="Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery."
            ctaLabel="Get Started"
            ctaLink="/docs/overview/"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: icon)</h2></summary>
          <InstallStrip
            label="Install with Vial"
            command="vial pull envoy:latest"
            copyTarget="icon"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: block)</h2></summary>
          <InstallStrip
            label="Or use the Spark CLI"
            command="spark install envoy"
            copyTarget="block"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (no label)</h2></summary>
          <InstallStrip command="envoy start --config relay.grain" />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: text)</h2></summary>
          <InstallStrip
            label="Quick install"
            command="vial pull envoy"
            copyTarget="text"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (with icons)</h2></summary>
          <Features
            heading="Why Teams Choose Envoy"
            items={[
              {
                icon: 'lucide:route',
                title: 'Dispatch',
                description: 'Intelligent routing engine. Inspects payloads and routes by content, source, severity, or custom rules.',
              },
              {
                icon: 'lucide:repeat',
                title: 'Courier',
                description: 'Guaranteed-delivery retry engine. Exponential backoff, dead-letter queues, and delivery receipts.',
              },
              {
                icon: 'lucide:package',
                title: 'Parcel',
                description: 'Payload transformation pipeline. Rewrites messages between formats — JSON, XML, plaintext, form-data.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (without icons, without heading)</h2></summary>
          <Features
            items={[
              {
                title: 'Cipher',
                description: 'Authentication gateway. HMAC signatures, bearer tokens, and IP allowlists. Verifies source identity before processing.',
              },
              {
                title: 'Ledger',
                description: 'Append-only delivery audit trail. Every message received, transformed, routed, and delivered is recorded.',
              },
              {
                title: 'Embassy',
                description: 'Origin-masking reverse proxy. Keeps internal services off the public internet entirely.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (six items, mixed icons)</h2></summary>
          <Features
            heading="Everything in One Relay"
            items={[
              {
                icon: 'lucide:route',
                title: 'Dispatch',
                description: 'Routes messages by content, source, severity, or schedule. First matching relay wins.',
              },
              {
                icon: 'lucide:repeat',
                title: 'Courier',
                description: 'Exponential backoff with jitter. Dead-letter queues. Delivery receipts. Guaranteed delivery.',
              },
              {
                title: 'Parcel',
                description: 'Transforms payloads between any two formats. Lossy and lossless modes. Field mapping and template rendering.',
              },
              {
                icon: 'lucide:lock',
                title: 'Cipher',
                description: 'Authenticates every incoming request. HMAC, bearer, and IP allowlist modes. Zero-downtime token rotation.',
              },
              {
                title: 'Ledger',
                description: 'Records every state transition. Append-only. Configurable retention. Exportable via Spoke API.',
              },
              {
                icon: 'lucide:shield',
                title: 'Embassy',
                description: 'Reverse proxy that hides internal topology. TLS termination. Header stripping. Origin masking.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Stats (with heading and description)</h2></summary>
          <Stats
            heading="Relay Metrics"
            description="Key performance indicators across all active relay pipelines."
            items={[
              {
                value: '<5ms',
                label: 'Relay latency (p99)',
                color: 'primary',
              },
              {
                value: '3MB',
                label: 'Vial image size',
                color: 'accent',
              },
              {
                value: '100%',
                label: 'Delivery rate',
                color: 'primary',
              },
              {
                value: '8',
                label: 'Protocol translators',
                color: 'accent',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Stats (without heading)</h2></summary>
          <Stats
            items={[
              {
                value: '8',
                label: 'Translators',
              },
              {
                value: '0',
                label: 'Dependencies',
              },
              {
                value: '6',
                label: 'Sub-tools',
              },
              {
                value: '200ms',
                label: 'Cold start',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with code)</h2></summary>
          <Spotlight heading="Quick Start">
            <pre className="nova-code-snippet">
              {[
                'vial pull envoy',
                'envoy start --config relay.grain',
                'curl http://localhost:8090/api/health',
              ].join('\n')}
            </pre>
            <p className="nova-section-description">
              Three commands to go from zero to a working relay.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with text)</h2></summary>
          <Spotlight heading="How It Works">
            <p className="nova-section-description">
              Envoy reads your relay manifest, initializes Cipher for authentication,
              compiles Parcel transformation rules, and registers Dispatch routes.
              Messages flow through the pipeline in under five milliseconds.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (with description)</h2></summary>
          <BlogPreview
            heading="Dispatches from the Relay Room"
            description="Release notes, integration deep dives, and the occasional dispatch from the relay room."
            posts={[
              {
                title: 'What Happens When a Webhook Fails at 3 AM',
                date: '2025-03-01',
                description: 'A Glassboard alert fired at 3:47 AM. The webhook to Canary failed silently. Nobody woke up. That is the problem that started Envoy.',
                permalink: '/blog/2025/03/01/webhook-fails-at-3am/',
              },
              {
                title: 'Retry Logic Is Harder Than You Think',
                date: '2025-06-05',
                description: 'Naive retry is easy. Reliable retry under load, with backoff, jitter, and dead-letter queues, is a different discipline.',
                permalink: '/blog/2025/06/05/retry-logic/',
              },
              {
                title: 'The 3MB Container That Replaced Our Entire Integration Layer',
                date: '2025-08-22',
                description: 'Twelve services, nine cron jobs, and a shared database — replaced by a single 3MB Vial image.',
                permalink: '/blog/2025/08/22/3mb-container/',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (without description)</h2></summary>
          <BlogPreview
            heading="Recent Dispatches"
            posts={[{
              title: 'Envoy 2.2: Fanout Routing and Ledger Export',
              date: '2025-10-15',
              description: 'Dispatch now supports fanout to multiple destinations from a single relay. Ledger entries are exportable to any Spoke endpoint on a configurable schedule.',
              permalink: '/blog/2025/03/01/webhook-fails-at-3am/',
            }]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Terminology (inline usage)</h2></summary>
          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
          }}
          >
            {'Envoy uses a '}
            <Terminology title="relay pipeline declaration file">
              relay manifest
            </Terminology>
            {' to define every integration pipeline. Each incoming message is authenticated by the '}
            <Terminology title="authentication gateway">
              Cipher
            </Terminology>
            {' gateway before reaching the transformation stage. When delivery fails, the '}
            <Terminology title="guaranteed-delivery retry engine">
              Courier
            </Terminology>
            {' engine handles retries automatically.'}
          </p>
          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
          }}
          >
            {'With the '}
            <Terminology title="payload transformation pipeline" color>
              Parcel
            </Terminology>
            {' pipeline, sources and destinations never need to agree on a format. '}
            <Terminology title="intelligent routing engine" color>
              Dispatch
            </Terminology>
            {' handles routing, and '}
            <Terminology title="append-only audit trail">
              Ledger
            </Terminology>
            {' records the full transaction history.'}
          </p>
        </Details>

        <Details open={expanded}>
          <summary><h2>AppMarketDownload (both stores)</h2></summary>
          <AppMarketDownload
            label="Download the companion app"
            appStoreUrl="#"
            googlePlayUrl="#"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>AppMarketDownload (App Store only)</h2></summary>
          <AppMarketDownload
            label="Available on iOS"
            appStoreUrl="#"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>AppMarketDownload (Google Play only)</h2></summary>
          <AppMarketDownload
            label="Available on Android"
            googlePlayUrl="#"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>AppMarketDownload (no label)</h2></summary>
          <AppMarketDownload
            appStoreUrl="#"
            googlePlayUrl="#"
          />
        </Details>
      </main>
    </Layout>
  );
}

export default Showcase;
