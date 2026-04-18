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
    <Layout description="Foundry reads your intent and forges your entire development environment from a single manifest.">
      <Head>
        <title>Foundry - Every Tool Starts as Raw Metal</title>
      </Head>
      <Hero
        eyebrow="Developer Tooling"
        heading="Every tool starts as raw metal."
        tagline="Foundry reads your intent and forges your entire development environment from a single manifest. Stop configuring. Start describing."
        ctaLabel="Get Started"
        ctaLink="/docs/getting-started/"
        secondaryCtaLabel="View on Threadbare"
        secondaryCtaLink="https://nova.cbnventures.io"
      />
      <main>
        <InstallStrip command="spark install foundry" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:anvil',
              title: 'Anvil',
              description: 'The core CLI. Reads a single Blueprint manifest and forges your entire workspace — directory structure, dependency graph, build config, and linting rules. One file in, a full environment out.',
            },
            {
              icon: 'lucide:git-fork',
              title: 'Tongs',
              description: 'Dependency graph resolver and visualizer. Maps every relationship between workspace packages and renders the full tree so you can see what depends on what before you change anything.',
            },
            {
              icon: 'lucide:zap',
              title: 'Quench',
              description: 'Incremental build cache that tracks file hashes and only rebuilds what actually changed. Cold forges take 14 seconds. Warm forges take under two.',
            },
            {
              icon: 'lucide:layers',
              title: 'Bellows',
              description: 'Parallel task runner that fans work across every workspace package simultaneously. Respects the dependency graph from Tongs so nothing runs before its prerequisites finish.',
            },
            {
              icon: 'lucide:flask-conical',
              title: 'Crucible',
              description: 'Test harness generator that reads your type signatures and writes the test scaffold for you. Snapshot testing, assertion templates, and fixture files — all derived from the types you already wrote.',
            },
            {
              icon: 'lucide:trash-2',
              title: 'Slag',
              description: 'Dead code and unused dependency detector. Scans every import, every export, and every entry in your Blueprint to find what is no longer referenced. Remove the slag, keep the steel.',
            },
          ]}
        />
        <Stats
          heading="By the Numbers"
          items={[
            {
              value: '1',
              label: 'Manifest',
              color: 'primary',
            },
            {
              value: '0',
              label: 'Config files',
              color: 'accent',
            },
            {
              value: '14s',
              label: 'Cold forge',
              color: 'primary',
            },
            {
              value: '380+',
              label: 'Warden rules',
              color: 'accent',
            },
          ]}
        />
        <Spotlight surface="alt" heading="One Manifest, Everything Wired">
          <pre className="nova-code-snippet">
            {[
              '# project.grain',
              'workspace "my-app" {',
              '  lang    = "alloy"',
              '  target  = "arcline"',
              '  warden  = ["strict", "conventions"]',
              '  crucible = auto',
              '',
              '  packages {',
              '    core   { type = "library" }',
              '    api    { type = "service", depends = ["core"] }',
              '    web    { type = "app", depends = ["core"] }',
              '  }',
              '}',
              '',
              '$ foundry ignite',
              '\u2192 Forging 3 packages from project.grain',
              '\u2192 Resolved dependency graph (core \u2192 api, core \u2192 web)',
              '\u2192 Generated 380 Warden rules across 2 presets',
              '\u2192 Crucible scaffolded 12 test files from type signatures',
              '\u2192 Done in 14.2s',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            Describe what you mean. Foundry figures out the rest.
          </p>
        </Spotlight>
        <AppMarketDownload
          label="Manage your forge on the go"
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading="Dispatches from the Forge"
          description="Philosophy, benchmarks, and the opinions we shipped."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
