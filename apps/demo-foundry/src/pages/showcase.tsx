import {
  AppMarketDownload,
  BlogPreview,
  Features,
  Frame,
  Hero,
  InstallStrip,
  Spotlight,
  Stats,
  Terminology,
  Typewriter,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import { translate } from '@docusaurus/Translate';
import Showcase from '@theme/Showcase';

function ShowcasePage() {
  return (
    <Showcase
      layoutDescription={translate({
        id: 'showcase.layout.description',
        message: 'Foundry block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Foundry preset, rendered with sample data.',
        description: 'Showcase page sub-description below the title',
      })}
    >
      <Showcase.Item title={translate({
        id: 'showcase.item.heroFull.title',
        message: 'Hero (full)',
        description: 'Showcase item title for Hero (full variant)',
      })}
      >
        <Hero
          eyebrow={translate({
            id: 'showcase.heroFull.eyebrow',
            message: 'Block Showcase',
            description: 'Showcase Hero (full) eyebrow text',
          })}
          heading={translate({
            id: 'showcase.heroFull.heading',
            message: 'Every Foundry block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Foundry-world data so you can see how they look and behave.',
            description: 'Showcase Hero (full) tagline',
          })}
          ctaLabel={translate({
            id: 'showcase.heroFull.ctaLabel',
            message: 'Read the Docs',
            description: 'Showcase Hero (full) primary CTA button label',
          })}
          ctaLink="/docs/overview/"
          secondaryCtaLabel={translate({
            id: 'showcase.heroFull.secondaryCtaLabel',
            message: 'View on Threadbare',
            description: 'Showcase Hero (full) secondary CTA button label',
          })}
          secondaryCtaLink="https://nova.cbnventures.io"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.heroMinimal.title',
        message: 'Hero (minimal)',
        description: 'Showcase item title for Hero (minimal variant)',
      })}
      >
        <Hero
          heading={translate({
            id: 'showcase.heroMinimal.heading',
            message: 'Shape what ships.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Foundry reads your intent and forges your entire development environment from a single manifest. Stop configuring. Start describing.',
            description: 'Showcase Hero (minimal) tagline',
          })}
          ctaLabel={translate({
            id: 'showcase.heroMinimal.ctaLabel',
            message: 'Get Started',
            description: 'Showcase Hero (minimal) primary CTA button label',
          })}
          ctaLink="/docs/overview/"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.typewriterDefault.title',
        message: 'Typewriter (default)',
        description: 'Showcase item title for Typewriter (default variant)',
      })}
      >
        <Typewriter>
          <Typewriter.Prefix>
            {translate({
              id: 'showcase.typewriterDefault.prefix',
              message: 'I love ',
              description: 'Showcase Typewriter (default) prefix text',
            })}
          </Typewriter.Prefix>
          <Typewriter.Word>React</Typewriter.Word>
          <Typewriter.Word>TypeScript</Typewriter.Word>
          <Typewriter.Word>Nova</Typewriter.Word>
        </Typewriter>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.typewriterNoPrefix.title',
        message: 'Typewriter (no prefix)',
        description: 'Showcase item title for Typewriter (no prefix variant)',
      })}
      >
        <Typewriter>
          <Typewriter.Word>
            {translate({
              id: 'showcase.typewriterNoPrefix.fast',
              message: 'Fast',
              description: 'Showcase Typewriter (no prefix) word 1',
            })}
          </Typewriter.Word>
          <Typewriter.Word>
            {translate({
              id: 'showcase.typewriterNoPrefix.flexible',
              message: 'Flexible',
              description: 'Showcase Typewriter (no prefix) word 2',
            })}
          </Typewriter.Word>
          <Typewriter.Word>
            {translate({
              id: 'showcase.typewriterNoPrefix.free',
              message: 'Free',
              description: 'Showcase Typewriter (no prefix) word 3',
            })}
          </Typewriter.Word>
        </Typewriter>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.typewriterSlow.title',
        message: 'Typewriter (slow timing)',
        description: 'Showcase item title for Typewriter (slow timing variant)',
      })}
      >
        <Typewriter typeSpeed={120} deleteSpeed={80} pauseDuration={2000}>
          <Typewriter.Prefix>
            {translate({
              id: 'showcase.typewriterSlow.prefix',
              message: 'Built for ',
              description: 'Showcase Typewriter (slow timing) prefix text',
            })}
          </Typewriter.Prefix>
          <Typewriter.Word>
            {translate({
              id: 'showcase.typewriterSlow.developers',
              message: 'developers',
              description: 'Showcase Typewriter (slow timing) word 1',
            })}
          </Typewriter.Word>
          <Typewriter.Word>
            {translate({
              id: 'showcase.typewriterSlow.designers',
              message: 'designers',
              description: 'Showcase Typewriter (slow timing) word 2',
            })}
          </Typewriter.Word>
        </Typewriter>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.typewriterNoLoop.title',
        message: 'Typewriter (no loop)',
        description: 'Showcase item title for Typewriter (no loop variant)',
      })}
      >
        <Typewriter loop={false}>
          <Typewriter.Prefix>
            {translate({
              id: 'showcase.typewriterNoLoop.prefix',
              message: 'Welcome to ',
              description: 'Showcase Typewriter (no loop) prefix text',
            })}
          </Typewriter.Prefix>
          <Typewriter.Word>Nova</Typewriter.Word>
        </Typewriter>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripIcon.title',
        message: 'InstallStrip (copyTarget: icon)',
        description: 'Showcase item title for InstallStrip (icon copyTarget variant)',
      })}
      >
        <InstallStrip
          label={translate({
            id: 'showcase.installStripIcon.label',
            message: 'Install with Spark',
            description: 'Showcase InstallStrip (icon) label',
          })}
          command="spark install foundry"
          copyTarget="icon"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripBlock.title',
        message: 'InstallStrip (copyTarget: block)',
        description: 'Showcase item title for InstallStrip (block copyTarget variant)',
      })}
      >
        <InstallStrip
          label={translate({
            id: 'showcase.installStripBlock.label',
            message: 'Or use the Loom Registry',
            description: 'Showcase InstallStrip (block) label',
          })}
          command="loom add --dev foundry"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="foundry ignite --dry-run" />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripText.title',
        message: 'InstallStrip (copyTarget: text)',
        description: 'Showcase item title for InstallStrip (text copyTarget variant)',
      })}
      >
        <InstallStrip
          label={translate({
            id: 'showcase.installStripText.label',
            message: 'Quick install',
            description: 'Showcase InstallStrip (text) label',
          })}
          command="spark install foundry"
          copyTarget="text"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.featuresIcons.title',
        message: 'Features (with icons)',
        description: 'Showcase item title for Features (with icons variant)',
      })}
      >
        <Features
          heading={translate({
            id: 'showcase.featuresIcons.heading',
            message: 'Why Teams Choose Foundry',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:anvil',
              title: translate({
                id: 'showcase.featuresIcons.anvil.title',
                message: 'Anvil',
                description: 'Showcase Features (with icons) card title for Anvil',
              }),
              description: translate({
                id: 'showcase.featuresIcons.anvil.description',
                message: 'The core CLI. Reads a Blueprint manifest and forges your workspace — directory structure, dependency graph, build config, and linting rules.',
                description: 'Showcase Features (with icons) card description for Anvil',
              }),
            },
            {
              icon: 'lucide:git-fork',
              title: translate({
                id: 'showcase.featuresIcons.tongs.title',
                message: 'Tongs',
                description: 'Showcase Features (with icons) card title for Tongs',
              }),
              description: translate({
                id: 'showcase.featuresIcons.tongs.description',
                message: 'Dependency graph resolver and visualizer. Maps every relationship between packages and renders the full tree.',
                description: 'Showcase Features (with icons) card description for Tongs',
              }),
            },
            {
              icon: 'lucide:zap',
              title: translate({
                id: 'showcase.featuresIcons.quench.title',
                message: 'Quench',
                description: 'Showcase Features (with icons) card title for Quench',
              }),
              description: translate({
                id: 'showcase.featuresIcons.quench.description',
                message: 'Incremental build cache that tracks file hashes and only rebuilds what changed. Cold forges take 14 seconds. Warm forges take under two.',
                description: 'Showcase Features (with icons) card description for Quench',
              }),
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.featuresNoIcons.title',
        message: 'Features (without icons, without heading)',
        description: 'Showcase item title for Features (no icons, no heading variant)',
      })}
      >
        <Features
          items={[
            {
              title: translate({
                id: 'showcase.featuresNoIcons.bellows.title',
                message: 'Bellows',
                description: 'Showcase Features (no icons) card title for Bellows',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.bellows.description',
                message: 'Parallel task runner that fans work across every workspace package simultaneously. Respects the Tongs dependency graph.',
                description: 'Showcase Features (no icons) card description for Bellows',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.crucible.title',
                message: 'Crucible',
                description: 'Showcase Features (no icons) card title for Crucible',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.crucible.description',
                message: 'Test harness generator that reads your type signatures and writes the test scaffold. Snapshot testing and assertion templates included.',
                description: 'Showcase Features (no icons) card description for Crucible',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.slag.title',
                message: 'Slag',
                description: 'Showcase Features (no icons) card title for Slag',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.slag.description',
                message: 'Dead code and unused dependency detector. Scans every import and export to find what is no longer referenced.',
                description: 'Showcase Features (no icons) card description for Slag',
              }),
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.featuresSix.title',
        message: 'Features (six items, mixed icons)',
        description: 'Showcase item title for Features (six items variant)',
      })}
      >
        <Features
          heading={translate({
            id: 'showcase.featuresSix.heading',
            message: 'Everything in One Forge',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:terminal',
              title: translate({
                id: 'showcase.featuresSix.anvil.title',
                message: 'Anvil',
                description: 'Showcase Features (six items) card title for Anvil',
              }),
              description: translate({
                id: 'showcase.featuresSix.anvil.description',
                message: 'Reads your manifest and generates every configuration artifact your workspace needs. One file in, everything out.',
                description: 'Showcase Features (six items) card description for Anvil',
              }),
            },
            {
              icon: 'lucide:git-fork',
              title: translate({
                id: 'showcase.featuresSix.tongs.title',
                message: 'Tongs',
                description: 'Showcase Features (six items) card title for Tongs',
              }),
              description: translate({
                id: 'showcase.featuresSix.tongs.description',
                message: 'Resolves the dependency graph, detects cycles, and provides query tools for scripting and pipeline integration.',
                description: 'Showcase Features (six items) card description for Tongs',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.quench.title',
                message: 'Quench',
                description: 'Showcase Features (six items) card title for Quench',
              }),
              description: translate({
                id: 'showcase.featuresSix.quench.description',
                message: 'Content-addressable build cache. If the inputs have not changed, the build is skipped entirely.',
                description: 'Showcase Features (six items) card description for Quench',
              }),
            },
            {
              icon: 'lucide:layers',
              title: translate({
                id: 'showcase.featuresSix.bellows.title',
                message: 'Bellows',
                description: 'Showcase Features (six items) card title for Bellows',
              }),
              description: translate({
                id: 'showcase.featuresSix.bellows.description',
                message: 'Schedules build tasks in waves based on the dependency graph. Independent packages build in parallel.',
                description: 'Showcase Features (six items) card description for Bellows',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.crucible.title',
                message: 'Crucible',
                description: 'Showcase Features (six items) card title for Crucible',
              }),
              description: translate({
                id: 'showcase.featuresSix.crucible.description',
                message: 'Generates test scaffolds from type signatures. Snapshot tests, assertion templates, and fixture files.',
                description: 'Showcase Features (six items) card description for Crucible',
              }),
            },
            {
              icon: 'lucide:trash-2',
              title: translate({
                id: 'showcase.featuresSix.slag.title',
                message: 'Slag',
                description: 'Showcase Features (six items) card title for Slag',
              }),
              description: translate({
                id: 'showcase.featuresSix.slag.description',
                message: 'Finds dead code and orphaned dependencies. Remove the slag, keep the steel.',
                description: 'Showcase Features (six items) card description for Slag',
              }),
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.statsFull.title',
        message: 'Stats (with heading and description)',
        description: 'Showcase item title for Stats (full variant)',
      })}
      >
        <Stats
          heading={translate({
            id: 'showcase.statsFull.heading',
            message: 'Forge Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key performance indicators across a 200-package workspace.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '14s',
              label: translate({
                id: 'showcase.statsFull.coldForge.label',
                message: 'Cold forge time',
                description: 'Showcase Stats (full) label for cold forge time',
              }),
              color: 'primary',
            },
            {
              value: '3.4s',
              label: translate({
                id: 'showcase.statsFull.warmForge.label',
                message: 'Warm forge time',
                description: 'Showcase Stats (full) label for warm forge time',
              }),
              color: 'accent',
            },
            {
              value: '97%',
              label: translate({
                id: 'showcase.statsFull.cacheHit.label',
                message: 'Cache hit rate',
                description: 'Showcase Stats (full) label for cache hit rate',
              }),
              color: 'primary',
            },
            {
              value: '380+',
              label: translate({
                id: 'showcase.statsFull.wardenRules.label',
                message: 'Warden rules',
                description: 'Showcase Stats (full) label for Warden rule count',
              }),
              color: 'accent',
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.statsNoHeading.title',
        message: 'Stats (without heading)',
        description: 'Showcase item title for Stats (no heading variant)',
      })}
      >
        <Stats
          items={[
            {
              value: '1',
              label: translate({
                id: 'showcase.statsNoHeading.manifest.label',
                message: 'Manifest',
                description: 'Showcase Stats (no heading) label for manifest',
              }),
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsNoHeading.configFiles.label',
                message: 'Config files',
                description: 'Showcase Stats (no heading) label for config files',
              }),
            },
            {
              value: '6',
              label: translate({
                id: 'showcase.statsNoHeading.subtools.label',
                message: 'Sub-tools',
                description: 'Showcase Stats (no heading) label for sub-tools',
              }),
            },
            {
              value: '200',
              label: translate({
                id: 'showcase.statsNoHeading.maxPackages.label',
                message: 'Max packages tested',
                description: 'Showcase Stats (no heading) label for max packages tested',
              }),
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.spotlightCode.title',
        message: 'Spotlight (with code)',
        description: 'Showcase item title for Spotlight (with code variant)',
      })}
      >
        <Spotlight heading={translate({
          id: 'showcase.spotlightCode.heading',
          message: 'Quick Start',
          description: 'Showcase Spotlight (with code) section heading',
        })}
        >
          <pre className="nova-code-snippet">
            {[
              'spark install foundry',
              'foundry ignite',
              'foundry warden check',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to a fully forged workspace.',
              description: 'Showcase Spotlight (with code) description paragraph',
            })}
          </p>
        </Spotlight>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.spotlightText.title',
        message: 'Spotlight (with text)',
        description: 'Showcase item title for Spotlight (with text variant)',
      })}
      >
        <Spotlight heading={translate({
          id: 'showcase.spotlightText.heading',
          message: 'How It Works',
          description: 'Showcase Spotlight (with text) section heading',
        })}
        >
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightText.description',
              message: 'Foundry reads your manifest, resolves the dependency graph with Tongs, and generates every configuration artifact deterministically. The output is always the same for the same input — no side effects, no hidden state.',
              description: 'Showcase Spotlight (with text) description paragraph',
            })}
          </p>
        </Spotlight>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.blogPreviewWithDesc.title',
        message: 'BlogPreview (with description)',
        description: 'Showcase item title for BlogPreview (with description variant)',
      })}
      >
        <BlogPreview
          heading={translate({
            id: 'showcase.blogPreviewWithDesc.heading',
            message: 'Dispatches from the Forge',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Philosophy, benchmarks, and the opinions we shipped.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'Why We Stopped Writing Configuration Files',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2025-03-15',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'Configuration drift is the silent killer of workspaces. We built Foundry because we believed intent should be declarative.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2025/03/15/configuration-files/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'Forging a Monorepo with 200 Packages in 14 Seconds',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2025-05-22',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'How Quench caching and Bellows parallelism turned a twelve-minute build into a fourteen-second forge.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2025/05/22/monorepo-performance/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'The Warden Rules We Almost Did Not Ship',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2025-08-10',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'We wrote 380 linting rules and threw away 60. Here is what survived and the arguments that almost split the team.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2025/08/10/warden-rules/',
            },
          ]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.blogPreviewNoDesc.title',
        message: 'BlogPreview (without description)',
        description: 'Showcase item title for BlogPreview (no description variant)',
      })}
      >
        <BlogPreview
          heading={translate({
            id: 'showcase.blogPreviewNoDesc.heading',
            message: 'Recent Updates',
            description: 'Showcase BlogPreview (no description) section heading',
          })}
          posts={[{
            title: translate({
              id: 'showcase.blogPreviewNoDesc.post1.title',
              message: 'Foundry 2.4: Crucible Auto-Mode and Slag Detection',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2025-10-01',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Crucible now regenerates test scaffolds automatically on every forge, and Slag detects unused dependencies across the full workspace graph.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2025/03/15/configuration-files/',
          }]}
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.terminology.title',
        message: 'Terminology (inline usage)',
        description: 'Showcase item title for Terminology inline usage variant',
      })}
      >
        <p style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '1rem',
        }}
        >
          {translate({
            id: 'showcase.terminology.paragraph1.intro',
            message: 'Foundry uses a ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.manifest.title',
            message: 'workspace configuration file',
            description: 'Showcase Terminology hover title for manifest',
          })}
          >
            {translate({
              id: 'showcase.terminology.manifest.label',
              message: 'manifest',
              description: 'Showcase Terminology displayed text for manifest',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterManifest',
            message: ' to drive all code generation and configuration. Each workspace package is managed by the ',
            description: 'Showcase Terminology paragraph 1 fragment after manifest',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.forge.title',
            message: 'configuration generation process',
            description: 'Showcase Terminology hover title for forge',
          })}
          >
            {translate({
              id: 'showcase.terminology.forge.label',
              message: 'forge',
              description: 'Showcase Terminology displayed text for forge',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterForge',
            message: ' process that keeps every artifact in sync. When you need to validate code quality, the ',
            description: 'Showcase Terminology paragraph 1 fragment after forge',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.warden.title',
            message: 'static analysis engine',
            description: 'Showcase Terminology hover title for Warden',
          })}
          >
            Warden
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterWarden',
            message: ' engine runs every rule without additional configuration.',
            description: 'Showcase Terminology paragraph 1 fragment after Warden',
          })}
        </p>
        <p style={{
          maxWidth: '720px',
          margin: '0 auto',
          padding: '1rem',
        }}
        >
          {translate({
            id: 'showcase.terminology.paragraph2.intro',
            message: 'With the ',
            description: 'Showcase Terminology paragraph 2 intro fragment',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.presetSystem.title',
              message: 'rule collection preset',
              description: 'Showcase Terminology hover title for preset system',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.presetSystem.label',
              message: 'preset system',
              description: 'Showcase Terminology displayed text for preset system',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterPreset',
            message: ', teams share a single source of truth for ',
            description: 'Showcase Terminology paragraph 2 fragment after preset system',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.lintingRules.title',
              message: 'static analysis rules',
              description: 'Showcase Terminology hover title for linting rules',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.lintingRules.label',
              message: 'linting rules',
              description: 'Showcase Terminology displayed text for linting rules',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterLinting',
            message: ' and ',
            description: 'Showcase Terminology paragraph 2 fragment after linting rules',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.alloySettings.title',
            message: 'compiler configuration',
            description: 'Showcase Terminology hover title for Alloy settings',
          })}
          >
            {translate({
              id: 'showcase.terminology.alloySettings.label',
              message: 'Alloy settings',
              description: 'Showcase Terminology displayed text for Alloy settings',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterAlloy',
            message: ' without duplicating configuration files.',
            description: 'Showcase Terminology paragraph 2 fragment after Alloy settings',
          })}
        </p>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.frameWithCaption.title',
        message: 'Frame (with caption)',
        description: 'Showcase item title for Frame (with caption variant)',
      })}
      >
        <Frame caption={translate({
          id: 'showcase.frameWithCaption.caption',
          message: 'Brand mark stamped into a Frame — sharp border, monospace caption.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Foundry brand thumbnail.',
              description: 'Showcase Frame image alt text',
            })}
          />
        </Frame>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.frameNoCaption.title',
        message: 'Frame (no caption)',
        description: 'Showcase item title for Frame (no caption variant)',
      })}
      >
        <Frame>
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Foundry brand thumbnail.',
              description: 'Showcase Frame image alt text',
            })}
          />
        </Frame>
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.appMarketBoth.title',
        message: 'AppMarketDownload (both stores)',
        description: 'Showcase item title for AppMarketDownload (both stores variant)',
      })}
      >
        <AppMarketDownload
          label={translate({
            id: 'showcase.appMarketBoth.label',
            message: 'Download the companion app',
            description: 'Showcase AppMarketDownload (both) label',
          })}
          appStoreUrl="#"
          googlePlayUrl="#"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.appMarketAppStore.title',
        message: 'AppMarketDownload (App Store only)',
        description: 'Showcase item title for AppMarketDownload (App Store only variant)',
      })}
      >
        <AppMarketDownload
          label={translate({
            id: 'showcase.appMarketAppStore.label',
            message: 'Available on iOS',
            description: 'Showcase AppMarketDownload (App Store only) label',
          })}
          appStoreUrl="#"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.appMarketGooglePlay.title',
        message: 'AppMarketDownload (Google Play only)',
        description: 'Showcase item title for AppMarketDownload (Google Play only variant)',
      })}
      >
        <AppMarketDownload
          label={translate({
            id: 'showcase.appMarketGooglePlay.label',
            message: 'Available on Android',
            description: 'Showcase AppMarketDownload (Google Play only) label',
          })}
          googlePlayUrl="#"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.appMarketNoLabel.title',
        message: 'AppMarketDownload (no label)',
        description: 'Showcase item title for AppMarketDownload (no label variant)',
      })}
      >
        <AppMarketDownload
          appStoreUrl="#"
          googlePlayUrl="#"
        />
      </Showcase.Item>
    </Showcase>
  );
}

export default ShowcasePage;
