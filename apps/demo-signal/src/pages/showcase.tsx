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
        message: 'Signal block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Signal preset, rendered with sample data.',
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
            message: 'Every Signal block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Signal-world data so you can see how they look and behave.',
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
            message: 'Find the signal.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Signal traces how intent travels — from first impression to final action. Not just what was clicked. Why it was clicked. And what almost was.',
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
          command="spark install signal-cli"
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
          command="loom add --global signal-cli"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="signal beacon create --url https://example.com" />
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
          command="spark install signal-cli"
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
            message: 'Why Teams Choose Signal',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:radio',
              title: translate({
                id: 'showcase.featuresIcons.beacon.title',
                message: 'Beacon',
                description: 'Showcase Features (with icons) card title for Beacon',
              }),
              description: translate({
                id: 'showcase.featuresIcons.beacon.description',
                message: 'Link minting engine. Branded short links with embedded attribution metadata that survives where UTM parameters fail.',
                description: 'Showcase Features (with icons) card description for Beacon',
              }),
            },
            {
              icon: 'lucide:triangle',
              title: translate({
                id: 'showcase.featuresIcons.prism.title',
                message: 'Prism',
                description: 'Showcase Features (with icons) card title for Prism',
              }),
              description: translate({
                id: 'showcase.featuresIcons.prism.description',
                message: 'Multi-touch attribution modeler. Traces conversion paths across channels and assigns weighted credit to every touchpoint.',
                description: 'Showcase Features (with icons) card description for Prism',
              }),
            },
            {
              icon: 'lucide:activity',
              title: translate({
                id: 'showcase.featuresIcons.pulse.title',
                message: 'Pulse',
                description: 'Showcase Features (with icons) card title for Pulse',
              }),
              description: translate({
                id: 'showcase.featuresIcons.pulse.description',
                message: 'Real-time click stream. Live feed of interactions with geo, device, referrer, and attribution data.',
                description: 'Showcase Features (with icons) card description for Pulse',
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
                id: 'showcase.featuresNoIcons.aperture.title',
                message: 'Aperture',
                description: 'Showcase Features (no icons) card title for Aperture',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.aperture.description',
                message: 'Campaign snapshots. Point-in-time performance captures with comparison overlays across time windows.',
                description: 'Showcase Features (no icons) card description for Aperture',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.resonance.title',
                message: 'Resonance',
                description: 'Showcase Features (no icons) card title for Resonance',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.resonance.description',
                message: 'Audience overlap detector. Finds where audiences bleed into each other across campaigns and segments.',
                description: 'Showcase Features (no icons) card description for Resonance',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.flare.title',
                message: 'Flare',
                description: 'Showcase Features (no icons) card title for Flare',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.flare.description',
                message: 'QR and deep link generator. Physical-to-digital bridge with full attribution chain on every scan.',
                description: 'Showcase Features (no icons) card description for Flare',
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
            message: 'The Full Attribution Stack',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:radio',
              title: translate({
                id: 'showcase.featuresSix.beacon.title',
                message: 'Beacon',
                description: 'Showcase Features (six items) card title for Beacon',
              }),
              description: translate({
                id: 'showcase.featuresSix.beacon.description',
                message: 'Mints branded links with embedded trace metadata. Every link is a sensor in the attribution network.',
                description: 'Showcase Features (six items) card description for Beacon',
              }),
            },
            {
              icon: 'lucide:triangle',
              title: translate({
                id: 'showcase.featuresSix.prism.title',
                message: 'Prism',
                description: 'Showcase Features (six items) card title for Prism',
              }),
              description: translate({
                id: 'showcase.featuresSix.prism.description',
                message: 'Reconstructs the full conversion path. Supports linear, decay, position, and custom attribution models.',
                description: 'Showcase Features (six items) card description for Prism',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.pulse.title',
                message: 'Pulse',
                description: 'Showcase Features (six items) card title for Pulse',
              }),
              description: translate({
                id: 'showcase.featuresSix.pulse.description',
                message: 'Streams click events in real time. Filter by campaign, channel, geo, or device.',
                description: 'Showcase Features (six items) card description for Pulse',
              }),
            },
            {
              icon: 'lucide:aperture',
              title: translate({
                id: 'showcase.featuresSix.aperture.title',
                message: 'Aperture',
                description: 'Showcase Features (six items) card title for Aperture',
              }),
              description: translate({
                id: 'showcase.featuresSix.aperture.description',
                message: 'Captures immutable campaign snapshots. Compare any two points in time to see what changed.',
                description: 'Showcase Features (six items) card description for Aperture',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.resonance.title',
                message: 'Resonance',
                description: 'Showcase Features (six items) card title for Resonance',
              }),
              description: translate({
                id: 'showcase.featuresSix.resonance.description',
                message: 'Measures audience overlap across segments. Detects when campaigns compete for the same visitors.',
                description: 'Showcase Features (six items) card description for Resonance',
              }),
            },
            {
              icon: 'lucide:flame',
              title: translate({
                id: 'showcase.featuresSix.flare.title',
                message: 'Flare',
                description: 'Showcase Features (six items) card title for Flare',
              }),
              description: translate({
                id: 'showcase.featuresSix.flare.description',
                message: 'Generates QR codes and deep links with full attribution. Bridges print, events, and digital.',
                description: 'Showcase Features (six items) card description for Flare',
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
            message: 'Attribution Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key performance indicators across the Signal platform.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '2ms',
              label: translate({
                id: 'showcase.statsFull.latency.label',
                message: 'Redirect latency',
                description: 'Showcase Stats (full) label for redirect latency',
              }),
              color: 'primary',
            },
            {
              value: '50M',
              label: translate({
                id: 'showcase.statsFull.links.label',
                message: 'Links traced',
                description: 'Showcase Stats (full) label for links traced',
              }),
              color: 'accent',
            },
            {
              value: '99.99%',
              label: translate({
                id: 'showcase.statsFull.uptime.label',
                message: 'Uptime SLA',
                description: 'Showcase Stats (full) label for uptime SLA',
              }),
              color: 'primary',
            },
            {
              value: '180+',
              label: translate({
                id: 'showcase.statsFull.regions.label',
                message: 'Regions served',
                description: 'Showcase Stats (full) label for regions served',
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
              value: '6',
              label: translate({
                id: 'showcase.statsNoHeading.subtools.label',
                message: 'Sub-tools',
                description: 'Showcase Stats (no heading) label for sub-tools',
              }),
            },
            {
              value: '4',
              label: translate({
                id: 'showcase.statsNoHeading.models.label',
                message: 'Attribution models',
                description: 'Showcase Stats (no heading) label for attribution models',
              }),
            },
            {
              value: '8',
              label: translate({
                id: 'showcase.statsNoHeading.operators.label',
                message: 'Segment operators',
                description: 'Showcase Stats (no heading) label for segment operators',
              }),
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsNoHeading.pixels.label',
                message: 'Tracking pixels required',
                description: 'Showcase Stats (no heading) label for tracking pixels required',
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
              'spark install signal-cli',
              'signal auth login --key sk_live_...',
              'signal beacon create --url https://example.com --campaign launch',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to a fully attributed link.',
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
              message: 'Signal embeds attribution metadata in the link itself — not in query parameters that get stripped, not in referrer headers that disappear. When a click happens, Pulse captures it. When a conversion happens, Prism reconstructs the full path. No tracking pixels. No page-side scripts.',
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
            message: 'Attribution Insights',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Case studies, campaign forensics, and the patterns hiding in your click streams.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'We Traced a Viral Campaign to a Single Link in a Tuesday Newsletter',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2025-02-20',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'A 40% conversion spike traced to a sidebar link nobody flagged as important.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2025/02/20/tuesday-newsletter/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'Dark Traffic: The Clicks You Cannot See',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2025-05-10',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'When someone copies a URL into a messaging app, the referrer disappears. Beacon metadata survives.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2025/05/10/dark-traffic/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'The Death of Last-Click Attribution',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2025-07-28',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'Crediting the final touchpoint is a lie. Prism distributes credit across the full path.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2025/07/28/last-click-attribution/',
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
              message: 'Signal 2.1: Resonance Overlap Maps and Flare Bulk Generation',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2025-09-15',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Resonance now visualizes audience overlap across unlimited segments, and Flare supports bulk QR generation from CSV.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2025/02/20/tuesday-newsletter/',
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
            message: 'Signal uses ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.beaconLinks.title',
            message: 'branded attribution link',
            description: 'Showcase Terminology hover title for Beacon links',
          })}
          >
            {translate({
              id: 'showcase.terminology.beaconLinks.label',
              message: 'Beacon links',
              description: 'Showcase Terminology displayed text for Beacon links',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterBeacon',
            message: ' to instrument the path from impression to conversion. Each click is captured by ',
            description: 'Showcase Terminology paragraph 1 fragment after Beacon links',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.pulse.title',
            message: 'real-time click stream',
            description: 'Showcase Terminology hover title for Pulse',
          })}
          >
            Pulse
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterPulse',
            message: ' and fed into ',
            description: 'Showcase Terminology paragraph 1 fragment after Pulse',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.prism.title',
            message: 'multi-touch attribution engine',
            description: 'Showcase Terminology hover title for Prism',
          })}
          >
            Prism
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterPrism',
            message: ' for full-path attribution.',
            description: 'Showcase Terminology paragraph 1 fragment after Prism',
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
            message: 'With ',
            description: 'Showcase Terminology paragraph 2 intro fragment',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.aperture.title',
              message: 'point-in-time campaign snapshot',
              description: 'Showcase Terminology hover title for Aperture snapshots',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.aperture.label',
              message: 'Aperture snapshots',
              description: 'Showcase Terminology displayed text for Aperture snapshots',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterAperture',
            message: ', teams track campaign performance over time. The ',
            description: 'Showcase Terminology paragraph 2 fragment after Aperture',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.resonance.title',
              message: 'audience overlap detector',
              description: 'Showcase Terminology hover title for Resonance engine',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.resonance.label',
              message: 'Resonance engine',
              description: 'Showcase Terminology displayed text for Resonance engine',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterResonance',
            message: ' reveals where audiences overlap, and ',
            description: 'Showcase Terminology paragraph 2 fragment after Resonance',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.flare.title',
            message: 'QR and deep link generator',
            description: 'Showcase Terminology hover title for Flare',
          })}
          >
            Flare
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterFlare',
            message: ' extends attribution into the physical world.',
            description: 'Showcase Terminology paragraph 2 fragment after Flare',
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
          message: 'Brand mark amplified through a Frame block, captioned for attribution.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Signal brand thumbnail.',
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
              message: 'Signal brand thumbnail.',
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
