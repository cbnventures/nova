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
    <Layout description="Signal component showcase demonstrating every component from docusaurus-preset-nova.">
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
            Every component from the Signal preset, rendered with sample data.
          </p>
        </div>
        <Details open={expanded}>
          <summary><h2>Hero (full)</h2></summary>
          <Hero
            eyebrow="Component Showcase"
            heading="Every Signal component, demonstrated in one place."
            tagline="This page renders each component from @cbnventures/docusaurus-preset-nova/components with Signal-world data so you can see how they look and behave."
            ctaLabel="Read the Docs"
            ctaLink="/docs/overview/"
            secondaryCtaLabel="View on Threadbare"
            secondaryCtaLink="https://nova.cbnventures.io"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Hero (minimal)</h2></summary>
          <Hero
            heading="Find the signal."
            tagline="Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked. And what almost was."
            ctaLabel="Get Started"
            ctaLink="/docs/overview/"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: icon)</h2></summary>
          <InstallStrip
            label="Install with Spark"
            command="spark install signal-cli"
            copyTarget="icon"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: block)</h2></summary>
          <InstallStrip
            label="Or use the Loom Registry"
            command="loom add --global signal-cli"
            copyTarget="block"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (no label)</h2></summary>
          <InstallStrip command="signal beacon create --url https://example.com" />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: text)</h2></summary>
          <InstallStrip
            label="Quick install"
            command="spark install signal-cli"
            copyTarget="text"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (with icons)</h2></summary>
          <Features
            heading="Why Teams Choose Signal"
            items={[
              {
                icon: 'lucide:radio',
                title: 'Beacon',
                description: 'Link minting engine. Branded short links with embedded attribution metadata that survives where UTM parameters fail.',
              },
              {
                icon: 'lucide:triangle',
                title: 'Prism',
                description: 'Multi-touch attribution modeler. Traces conversion paths across channels and assigns weighted credit to every touchpoint.',
              },
              {
                icon: 'lucide:activity',
                title: 'Pulse',
                description: 'Real-time click stream. Live feed of interactions with geo, device, referrer, and attribution data.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (without icons, without heading)</h2></summary>
          <Features
            items={[
              {
                title: 'Aperture',
                description: 'Campaign snapshots. Point-in-time performance captures with comparison overlays across time windows.',
              },
              {
                title: 'Resonance',
                description: 'Audience overlap detector. Finds where audiences bleed into each other across campaigns and segments.',
              },
              {
                title: 'Flare',
                description: 'QR and deep link generator. Physical-to-digital bridge with full attribution chain on every scan.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (six items, mixed icons)</h2></summary>
          <Features
            heading="The Full Attribution Stack"
            items={[
              {
                icon: 'lucide:radio',
                title: 'Beacon',
                description: 'Mints branded links with embedded trace metadata. Every link is a sensor in the attribution network.',
              },
              {
                icon: 'lucide:triangle',
                title: 'Prism',
                description: 'Reconstructs the full conversion path. Supports linear, decay, position, and custom attribution models.',
              },
              {
                title: 'Pulse',
                description: 'Streams click events in real time. Filter by campaign, channel, geo, or device.',
              },
              {
                icon: 'lucide:aperture',
                title: 'Aperture',
                description: 'Captures immutable campaign snapshots. Compare any two points in time to see what changed.',
              },
              {
                title: 'Resonance',
                description: 'Measures audience overlap across segments. Detects when campaigns compete for the same visitors.',
              },
              {
                icon: 'lucide:flame',
                title: 'Flare',
                description: 'Generates QR codes and deep links with full attribution. Bridges print, events, and digital.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Stats (with heading and description)</h2></summary>
          <Stats
            heading="Attribution Metrics"
            description="Key performance indicators across the Signal platform."
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
                label: 'Uptime SLA',
                color: 'primary',
              },
              {
                value: '180+',
                label: 'Regions served',
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
                value: '6',
                label: 'Sub-tools',
              },
              {
                value: '4',
                label: 'Attribution models',
              },
              {
                value: '8',
                label: 'Segment operators',
              },
              {
                value: '0',
                label: 'Tracking pixels required',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with code)</h2></summary>
          <Spotlight heading="Quick Start">
            <pre className="nova-code-snippet">
              {[
                'spark install signal-cli',
                'signal auth login --key sk_live_...',
                'signal beacon create --url https://example.com --campaign launch',
              ].join('\n')}
            </pre>
            <p className="nova-section-description">
              Three commands to go from zero to a fully attributed link.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with text)</h2></summary>
          <Spotlight heading="How It Works">
            <p className="nova-section-description">
              Signal embeds attribution metadata in the link itself — not in query
              parameters that get stripped, not in referrer headers that disappear.
              When a click happens, Pulse captures it. When a conversion happens,
              Prism reconstructs the full path. No tracking pixels. No page-side scripts.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (with description)</h2></summary>
          <BlogPreview
            heading="Attribution Insights"
            description="Case studies, campaign forensics, and the patterns hiding in your click streams."
            posts={[
              {
                title: 'We Traced a Viral Campaign to a Single Link in a Tuesday Newsletter',
                date: '2025-02-20',
                description: 'A 40% conversion spike traced to a sidebar link nobody flagged as important.',
                permalink: '/blog/2025/02/20/tuesday-newsletter/',
              },
              {
                title: 'Dark Traffic: The Clicks You Cannot See',
                date: '2025-05-10',
                description: 'When someone copies a URL into a messaging app, the referrer disappears. Beacon metadata survives.',
                permalink: '/blog/2025/05/10/dark-traffic/',
              },
              {
                title: 'The Death of Last-Click Attribution',
                date: '2025-07-28',
                description: 'Crediting the final touchpoint is a lie. Prism distributes credit across the full path.',
                permalink: '/blog/2025/07/28/last-click-attribution/',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (without description)</h2></summary>
          <BlogPreview
            heading="Recent Updates"
            posts={[{
              title: 'Signal 2.1: Resonance Overlap Maps and Flare Bulk Generation',
              date: '2025-09-15',
              description: 'Resonance now visualizes audience overlap across unlimited segments, and Flare supports bulk QR generation from CSV.',
              permalink: '/blog/2025/02/20/tuesday-newsletter/',
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
            {'Signal uses '}
            <Terminology title="branded attribution link">
              Beacon links
            </Terminology>
            {' to instrument the path from impression to conversion. Each click is captured by '}
            <Terminology title="real-time click stream">
              Pulse
            </Terminology>
            {' and fed into '}
            <Terminology title="multi-touch attribution engine">
              Prism
            </Terminology>
            {' for full-path attribution.'}
          </p>
          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
          }}
          >
            {'With '}
            <Terminology title="point-in-time campaign snapshot" color>
              Aperture snapshots
            </Terminology>
            {', teams track campaign performance over time. The '}
            <Terminology title="audience overlap detector" color>
              Resonance engine
            </Terminology>
            {' reveals where audiences overlap, and '}
            <Terminology title="QR and deep link generator">
              Flare
            </Terminology>
            {' extends attribution into the physical world.'}
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
