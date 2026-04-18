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
    <Layout description="Sentinel component showcase demonstrating every component from docusaurus-preset-nova.">
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
            Every component from the Sentinel preset, rendered with sample data.
          </p>
        </div>
        <Details open={expanded}>
          <summary><h2>Hero (full)</h2></summary>
          <Hero
            eyebrow="Component Showcase"
            heading="Every Sentinel component, demonstrated in one place."
            tagline="This page renders each component from @cbnventures/docusaurus-preset-nova/components with Sentinel-world data so you can see how they look and behave."
            ctaLabel="Read the Docs"
            ctaLink="/docs/platform-overview/"
            secondaryCtaLabel="View on Threadbare"
            secondaryCtaLink="https://nova.cbnventures.io"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Hero (minimal)</h2></summary>
          <Hero
            heading="Trust is earned continuously."
            tagline="Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends."
            ctaLabel="Explore the Platform"
            ctaLink="/docs/platform-overview/"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: icon)</h2></summary>
          <InstallStrip
            label="Install with Spark"
            command="spark install sentinel-agent"
            copyTarget="icon"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: block)</h2></summary>
          <InstallStrip
            label="Or use a Vial container"
            command="vial pull sentinel/agent:latest"
            copyTarget="block"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (no label)</h2></summary>
          <InstallStrip command="sentinel parapet dry-run --scope all-devices" />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: text)</h2></summary>
          <InstallStrip
            label="Quick install"
            command="spark install sentinel-agent"
            copyTarget="text"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (with icons)</h2></summary>
          <Features
            heading="Why Teams Choose Sentinel"
            items={[
              {
                icon: 'lucide:eye',
                title: 'Watchtower',
                description: 'Continuous posture assessment. Evaluates device health, location, and behavior every 90 seconds.',
              },
              {
                icon: 'lucide:door-open',
                title: 'Drawbridge',
                description: 'Adaptive access gateway. Grants, narrows, or revokes access in real time based on trust evaluation.',
              },
              {
                icon: 'lucide:shield-check',
                title: 'Garrison',
                description: 'Endpoint compliance engine. Enforces policy on every connected device before access is granted.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (without icons, without heading)</h2></summary>
          <Features
            items={[
              {
                title: 'Rampart',
                description: 'Micro-segmentation layer. Isolates workloads so lateral movement between zones is impossible.',
              },
              {
                title: 'Spyglass',
                description: 'Audit and forensics. Full session reconstruction with 7-year immutable log retention.',
              },
              {
                title: 'Parapet',
                description: 'Policy simulation sandbox. Test access rules against real traffic before enforcing them.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (six items, mixed icons)</h2></summary>
          <Features
            heading="The Complete Trust Engine"
            items={[
              {
                icon: 'lucide:eye',
                title: 'Watchtower',
                description: 'Evaluates device posture, user identity, network context, and behavioral signals on a continuous 90-second cycle.',
              },
              {
                icon: 'lucide:door-open',
                title: 'Drawbridge',
                description: 'Translates Watchtower evaluations into concrete access decisions — grant, narrow, or revoke.',
              },
              {
                title: 'Garrison',
                description: 'Manages device enrollment, posture baselines, and compliance profiles for every endpoint.',
              },
              {
                icon: 'lucide:brick-wall',
                title: 'Rampart',
                description: 'Divides infrastructure into isolated zones. Zone crossings require policy evaluation.',
              },
              {
                title: 'Spyglass',
                description: 'Records every access decision, policy evaluation, and zone crossing in an immutable audit chain.',
              },
              {
                icon: 'lucide:shield',
                title: 'Parapet',
                description: 'Replays real traffic against draft policies to show the exact access impact before enforcement.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Stats (with heading and description)</h2></summary>
          <Stats
            heading="Platform Metrics"
            description="Key performance indicators across the Sentinel trust engine."
            items={[
              {
                value: '90s',
                label: 'Re-evaluation cycle',
                color: 'primary',
              },
              {
                value: '12ms',
                label: 'Policy latency',
                color: 'accent',
              },
              {
                value: '99.97%',
                label: 'Evaluation uptime',
                color: 'primary',
              },
              {
                value: '7yr',
                label: 'Audit retention',
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
                value: '10K',
                label: 'Concurrent tunnels',
              },
              {
                value: '6',
                label: 'Components',
              },
              {
                value: '4',
                label: 'Zone types',
              },
              {
                value: '0',
                label: 'Implicit trust',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with code)</h2></summary>
          <Spotlight heading="Quick Start">
            <pre className="nova-code-snippet">
              {[
                'spark install sentinel-agent',
                'sentinel-agent register --control-plane sentinel.internal',
                'sentinel policy apply policies/access.grain',
              ].join('\n')}
            </pre>
            <p className="nova-section-description">
              Three commands to go from zero to continuous trust evaluation.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with text)</h2></summary>
          <Spotlight heading="How It Works">
            <p className="nova-section-description">
              Sentinel evaluates trust continuously. Watchtower computes a posture score
              every 90 seconds. Drawbridge enforces the result in real time. Spyglass records
              every decision immutably. The output is always evidence — not assumption.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (with description)</h2></summary>
          <BlogPreview
            heading="Security Bulletin"
            description="Threat research, posture advisories, and the philosophy of continuous trust."
            posts={[
              {
                title: 'The Day We Stopped Trusting the Network',
                date: '2025-04-01',
                description: 'The perimeter dissolved and the industry pretended it had not. We built Sentinel because every VPN is a trust assumption.',
                permalink: '/blog/2025/04/01/trusting-the-network/',
              },
              {
                title: 'Simulating a Breach We Never Had',
                date: '2025-06-18',
                description: 'How Parapet caught a lateral movement path in staging before it reached production.',
                permalink: '/blog/2025/06/18/simulating-a-breach/',
              },
              {
                title: 'Why Compliance Is Not Security (But You Still Need Both)',
                date: '2025-09-05',
                description: 'Passing an audit and being secure are not the same thing. Spyglass bridges the gap.',
                permalink: '/blog/2025/09/05/compliance-vs-security/',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (without description)</h2></summary>
          <BlogPreview
            heading="Recent Updates"
            posts={[{
              title: 'Sentinel 3.4: Parapet Traffic Replay and Rampart Zone Quarantine',
              date: '2025-10-01',
              description: 'Parapet now supports full traffic replay against draft policies, and Rampart can automatically quarantine devices that fail posture checks.',
              permalink: '/blog/2025/04/01/trusting-the-network/',
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
            {'Sentinel uses a '}
            <Terminology title="access control declaration">
              trust policy
            </Terminology>
            {' to drive all access decisions. Every enrolled device is monitored by the '}
            <Terminology title="endpoint compliance agent">
              Garrison
            </Terminology>
            {' agent, which reports posture data to '}
            <Terminology title="continuous trust evaluation engine">
              Watchtower
            </Terminology>
            {' for scoring.'}
          </p>
          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
          }}
          >
            {'With the '}
            <Terminology title="micro-segmentation layer" color>
              Rampart
            </Terminology>
            {' zone system, workloads are isolated so that even a compromised segment cannot affect '}
            <Terminology title="encrypted tunnel protocol" color>
              Filament
            </Terminology>
            {' tunnels in adjacent zones. Every decision is recorded in '}
            <Terminology title="audit and forensics engine">
              Spyglass
            </Terminology>
            {' for immutable audit retention.'}
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
