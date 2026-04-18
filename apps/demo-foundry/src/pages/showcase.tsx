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
    <Layout description="Foundry component showcase demonstrating every component from docusaurus-preset-nova.">
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
            Every component from the Foundry preset, rendered with sample data.
          </p>
        </div>
        <Details open={expanded}>
          <summary><h2>Hero (full)</h2></summary>
          <Hero
            eyebrow="Component Showcase"
            heading="Every Foundry component, demonstrated in one place."
            tagline="This page renders each component from @cbnventures/docusaurus-preset-nova/components with Foundry-world data so you can see how they look and behave."
            ctaLabel="Read the Docs"
            ctaLink="/docs/getting-started/"
            secondaryCtaLabel="View on Threadbare"
            secondaryCtaLink="https://nova.cbnventures.io"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Hero (minimal)</h2></summary>
          <Hero
            heading="Shape what ships."
            tagline="Foundry reads your intent and forges your entire development environment from a single manifest. Stop configuring. Start describing."
            ctaLabel="Get Started"
            ctaLink="/docs/getting-started/"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: icon)</h2></summary>
          <InstallStrip
            label="Install with Spark"
            command="spark install foundry"
            copyTarget="icon"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: block)</h2></summary>
          <InstallStrip
            label="Or use the Loom Registry"
            command="loom add --dev foundry"
            copyTarget="block"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (no label)</h2></summary>
          <InstallStrip command="foundry ignite --dry-run" />
        </Details>

        <Details open={expanded}>
          <summary><h2>InstallStrip (copyTarget: text)</h2></summary>
          <InstallStrip
            label="Quick install"
            command="spark install foundry"
            copyTarget="text"
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (with icons)</h2></summary>
          <Features
            heading="Why Teams Choose Foundry"
            items={[
              {
                icon: 'lucide:anvil',
                title: 'Anvil',
                description: 'The core CLI. Reads a Blueprint manifest and forges your workspace — directory structure, dependency graph, build config, and linting rules.',
              },
              {
                icon: 'lucide:git-fork',
                title: 'Tongs',
                description: 'Dependency graph resolver and visualizer. Maps every relationship between packages and renders the full tree.',
              },
              {
                icon: 'lucide:zap',
                title: 'Quench',
                description: 'Incremental build cache that tracks file hashes and only rebuilds what changed. Cold forges take 14 seconds. Warm forges take under two.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (without icons, without heading)</h2></summary>
          <Features
            items={[
              {
                title: 'Bellows',
                description: 'Parallel task runner that fans work across every workspace package simultaneously. Respects the Tongs dependency graph.',
              },
              {
                title: 'Crucible',
                description: 'Test harness generator that reads your type signatures and writes the test scaffold. Snapshot testing and assertion templates included.',
              },
              {
                title: 'Slag',
                description: 'Dead code and unused dependency detector. Scans every import and export to find what is no longer referenced.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Features (six items, mixed icons)</h2></summary>
          <Features
            heading="Everything in One Forge"
            items={[
              {
                icon: 'lucide:terminal',
                title: 'Anvil',
                description: 'Reads your manifest and generates every configuration artifact your workspace needs. One file in, everything out.',
              },
              {
                icon: 'lucide:git-fork',
                title: 'Tongs',
                description: 'Resolves the dependency graph, detects cycles, and provides query tools for scripting and pipeline integration.',
              },
              {
                title: 'Quench',
                description: 'Content-addressable build cache. If the inputs have not changed, the build is skipped entirely.',
              },
              {
                icon: 'lucide:layers',
                title: 'Bellows',
                description: 'Schedules build tasks in waves based on the dependency graph. Independent packages build in parallel.',
              },
              {
                title: 'Crucible',
                description: 'Generates test scaffolds from type signatures. Snapshot tests, assertion templates, and fixture files.',
              },
              {
                icon: 'lucide:trash-2',
                title: 'Slag',
                description: 'Finds dead code and orphaned dependencies. Remove the slag, keep the steel.',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Stats (with heading and description)</h2></summary>
          <Stats
            heading="Forge Metrics"
            description="Key performance indicators across a 200-package workspace."
            items={[
              {
                value: '14s',
                label: 'Cold forge time',
                color: 'primary',
              },
              {
                value: '3.4s',
                label: 'Warm forge time',
                color: 'accent',
              },
              {
                value: '97%',
                label: 'Cache hit rate',
                color: 'primary',
              },
              {
                value: '380+',
                label: 'Warden rules',
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
                value: '1',
                label: 'Manifest',
              },
              {
                value: '0',
                label: 'Config files',
              },
              {
                value: '6',
                label: 'Sub-tools',
              },
              {
                value: '200',
                label: 'Max packages tested',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with code)</h2></summary>
          <Spotlight heading="Quick Start">
            <pre className="nova-code-snippet">
              {[
                'spark install foundry',
                'foundry ignite',
                'foundry warden check',
              ].join('\n')}
            </pre>
            <p className="nova-section-description">
              Three commands to go from zero to a fully forged workspace.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>Spotlight (with text)</h2></summary>
          <Spotlight heading="How It Works">
            <p className="nova-section-description">
              Foundry reads your manifest, resolves the dependency graph with Tongs,
              and generates every configuration artifact deterministically. The output is
              always the same for the same input — no side effects, no hidden state.
            </p>
          </Spotlight>
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (with description)</h2></summary>
          <BlogPreview
            heading="Dispatches from the Forge"
            description="Philosophy, benchmarks, and the opinions we shipped."
            posts={[
              {
                title: 'Why We Stopped Writing Configuration Files',
                date: '2025-03-15',
                description: 'Configuration drift is the silent killer of workspaces. We built Foundry because we believed intent should be declarative.',
                permalink: '/blog/2025/03/15/configuration-files/',
              },
              {
                title: 'Forging a Monorepo with 200 Packages in 14 Seconds',
                date: '2025-05-22',
                description: 'How Quench caching and Bellows parallelism turned a twelve-minute build into a fourteen-second forge.',
                permalink: '/blog/2025/05/22/monorepo-performance/',
              },
              {
                title: 'The Warden Rules We Almost Did Not Ship',
                date: '2025-08-10',
                description: 'We wrote 380 linting rules and threw away 60. Here is what survived and the arguments that almost split the team.',
                permalink: '/blog/2025/08/10/warden-rules/',
              },
            ]}
          />
        </Details>

        <Details open={expanded}>
          <summary><h2>BlogPreview (without description)</h2></summary>
          <BlogPreview
            heading="Recent Updates"
            posts={[{
              title: 'Foundry 2.4: Crucible Auto-Mode and Slag Detection',
              date: '2025-10-01',
              description: 'Crucible now regenerates test scaffolds automatically on every forge, and Slag detects unused dependencies across the full workspace graph.',
              permalink: '/blog/2025/03/15/configuration-files/',
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
            {'Foundry uses a '}
            <Terminology title="workspace configuration file">
              manifest
            </Terminology>
            {' to drive all code generation and configuration. Each workspace package is managed by the '}
            <Terminology title="configuration generation process">
              forge
            </Terminology>
            {' process that keeps every artifact in sync. When you need to validate code quality, the '}
            <Terminology title="static analysis engine">
              Warden
            </Terminology>
            {' engine runs every rule without additional configuration.'}
          </p>
          <p style={{
            maxWidth: '720px',
            margin: '0 auto',
            padding: '1rem',
          }}
          >
            {'With the '}
            <Terminology title="rule collection preset" color>
              preset system
            </Terminology>
            {', teams share a single source of truth for '}
            <Terminology title="static analysis rules" color>
              linting rules
            </Terminology>
            {' and '}
            <Terminology title="compiler configuration">
              Alloy settings
            </Terminology>
            {' without duplicating configuration files.'}
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
