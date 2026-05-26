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
      message: 'Foundry reads your intent and forges your entire development environment from a single manifest.',
      description: 'Front page layout description (meta description for SEO)',
    })}
    >
      <Head>
        <title>
          {translate({
            id: 'home.head.title',
            message: 'Foundry - Every Tool Starts as Raw Metal',
            description: 'Front page browser tab title',
          })}
        </title>
      </Head>
      <Hero
        eyebrow={translate({
          id: 'home.hero.eyebrow',
          message: 'Developer Tooling',
          description: 'Front page hero eyebrow above the heading',
        })}
        heading={translate({
          id: 'home.hero.heading',
          message: 'Every tool starts as raw metal.',
          description: 'Front page hero main heading',
        })}
        tagline={translate({
          id: 'home.hero.tagline',
          message: 'Foundry reads your intent and forges your entire development environment from a single manifest. Stop configuring. Start describing.',
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
        <InstallStrip command="spark install foundry" copyTarget="block" />
        <Features
          items={[
            {
              icon: 'lucide:anvil',
              title: translate({
                id: 'home.features.anvil.title',
                message: 'Anvil',
                description: 'Front page Features card title for Anvil',
              }),
              description: translate({
                id: 'home.features.anvil.description',
                message: 'The core CLI. Reads a single Blueprint manifest and forges your entire workspace — directory structure, dependency graph, build config, and linting rules. One file in, a full environment out.',
                description: 'Front page Features card description for Anvil',
              }),
            },
            {
              icon: 'lucide:git-fork',
              title: translate({
                id: 'home.features.tongs.title',
                message: 'Tongs',
                description: 'Front page Features card title for Tongs',
              }),
              description: translate({
                id: 'home.features.tongs.description',
                message: 'Dependency graph resolver and visualizer. Maps every relationship between workspace packages and renders the full tree so you can see what depends on what before you change anything.',
                description: 'Front page Features card description for Tongs',
              }),
            },
            {
              icon: 'lucide:zap',
              title: translate({
                id: 'home.features.quench.title',
                message: 'Quench',
                description: 'Front page Features card title for Quench',
              }),
              description: translate({
                id: 'home.features.quench.description',
                message: 'Incremental build cache that tracks file hashes and only rebuilds what actually changed. Cold forges take 14 seconds. Warm forges take under two.',
                description: 'Front page Features card description for Quench',
              }),
            },
            {
              icon: 'lucide:layers',
              title: translate({
                id: 'home.features.bellows.title',
                message: 'Bellows',
                description: 'Front page Features card title for Bellows',
              }),
              description: translate({
                id: 'home.features.bellows.description',
                message: 'Parallel task runner that fans work across every workspace package simultaneously. Respects the dependency graph from Tongs so nothing runs before its prerequisites finish.',
                description: 'Front page Features card description for Bellows',
              }),
            },
            {
              icon: 'lucide:flask-conical',
              title: translate({
                id: 'home.features.crucible.title',
                message: 'Crucible',
                description: 'Front page Features card title for Crucible',
              }),
              description: translate({
                id: 'home.features.crucible.description',
                message: 'Test harness generator that reads your type signatures and writes the test scaffold for you. Snapshot testing, assertion templates, and fixture files — all derived from the types you already wrote.',
                description: 'Front page Features card description for Crucible',
              }),
            },
            {
              icon: 'lucide:trash-2',
              title: translate({
                id: 'home.features.slag.title',
                message: 'Slag',
                description: 'Front page Features card title for Slag',
              }),
              description: translate({
                id: 'home.features.slag.description',
                message: 'Dead code and unused dependency detector. Scans every import, every export, and every entry in your Blueprint to find what is no longer referenced. Remove the slag, keep the steel.',
                description: 'Front page Features card description for Slag',
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
              value: '1',
              label: translate({
                id: 'home.stats.manifest.label',
                message: 'Manifest',
                description: 'Front page Stats label for manifest count',
              }),
              color: 'primary',
            },
            {
              value: '0',
              label: translate({
                id: 'home.stats.configFiles.label',
                message: 'Config files',
                description: 'Front page Stats label for config file count',
              }),
              color: 'accent',
            },
            {
              value: '14s',
              label: translate({
                id: 'home.stats.coldForge.label',
                message: 'Cold forge',
                description: 'Front page Stats label for cold forge time',
              }),
              color: 'primary',
            },
            {
              value: '380+',
              label: translate({
                id: 'home.stats.wardenRules.label',
                message: 'Warden rules',
                description: 'Front page Stats label for Warden rule count',
              }),
              color: 'accent',
            },
          ]}
        />
        <Spotlight
          surface="alt"
          heading={translate({
            id: 'home.spotlight.heading',
            message: 'One Manifest, Everything Wired',
            description: 'Front page Spotlight section heading',
          })}
        >
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
              '→ Forging 3 packages from project.grain',
              '→ Resolved dependency graph (core → api, core → web)',
              '→ Generated 380 Warden rules across 2 presets',
              '→ Crucible scaffolded 12 test files from type signatures',
              '→ Done in 14.2s',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'home.spotlight.description',
              message: 'Describe what you mean. Foundry figures out the rest.',
              description: 'Front page Spotlight description paragraph below the code snippet',
            })}
          </p>
        </Spotlight>
        <AppMarketDownload
          label={translate({
            id: 'home.appMarket.label',
            message: 'Manage your forge on the go',
            description: 'Front page AppMarketDownload label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
        <BlogPreview
          heading={translate({
            id: 'home.blogPreview.heading',
            message: 'Dispatches from the Forge',
            description: 'Front page BlogPreview section heading',
          })}
          description={translate({
            id: 'home.blogPreview.description',
            message: 'Philosophy, benchmarks, and the opinions we shipped.',
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
