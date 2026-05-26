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
        message: 'Envoy block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Envoy preset, rendered with sample data.',
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
            message: 'Every Envoy block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Envoy-world data so you can see how they look and behave.',
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
            message: 'Deliver without ceremony.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Envoy translates between systems that were never designed to understand each other. No shared format. No shared protocol. Just delivery.',
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
            message: 'Install with Vial',
            description: 'Showcase InstallStrip (icon) label',
          })}
          command="vial pull envoy:latest"
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
            message: 'Or use the Spark CLI',
            description: 'Showcase InstallStrip (block) label',
          })}
          command="spark install envoy"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="envoy start --config relay.grain" />
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
          command="vial pull envoy"
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
            message: 'Why Teams Choose Envoy',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:route',
              title: translate({
                id: 'showcase.featuresIcons.dispatch.title',
                message: 'Dispatch',
                description: 'Showcase Features (with icons) card title for Dispatch',
              }),
              description: translate({
                id: 'showcase.featuresIcons.dispatch.description',
                message: 'Intelligent routing engine. Inspects payloads and routes by content, source, severity, or custom rules.',
                description: 'Showcase Features (with icons) card description for Dispatch',
              }),
            },
            {
              icon: 'lucide:repeat',
              title: translate({
                id: 'showcase.featuresIcons.courier.title',
                message: 'Courier',
                description: 'Showcase Features (with icons) card title for Courier',
              }),
              description: translate({
                id: 'showcase.featuresIcons.courier.description',
                message: 'Guaranteed-delivery retry engine. Exponential backoff, dead-letter queues, and delivery receipts.',
                description: 'Showcase Features (with icons) card description for Courier',
              }),
            },
            {
              icon: 'lucide:package',
              title: translate({
                id: 'showcase.featuresIcons.parcel.title',
                message: 'Parcel',
                description: 'Showcase Features (with icons) card title for Parcel',
              }),
              description: translate({
                id: 'showcase.featuresIcons.parcel.description',
                message: 'Payload transformation pipeline. Rewrites messages between formats — JSON, XML, plaintext, form-data.',
                description: 'Showcase Features (with icons) card description for Parcel',
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
                id: 'showcase.featuresNoIcons.cipher.title',
                message: 'Cipher',
                description: 'Showcase Features (no icons) card title for Cipher',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.cipher.description',
                message: 'Authentication gateway. HMAC signatures, bearer tokens, and IP allowlists. Verifies source identity before processing.',
                description: 'Showcase Features (no icons) card description for Cipher',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.ledger.title',
                message: 'Ledger',
                description: 'Showcase Features (no icons) card title for Ledger',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.ledger.description',
                message: 'Append-only delivery audit trail. Every message received, transformed, routed, and delivered is recorded.',
                description: 'Showcase Features (no icons) card description for Ledger',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.embassy.title',
                message: 'Embassy',
                description: 'Showcase Features (no icons) card title for Embassy',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.embassy.description',
                message: 'Origin-masking reverse proxy. Keeps internal services off the public internet entirely.',
                description: 'Showcase Features (no icons) card description for Embassy',
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
            message: 'Everything in One Relay',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:route',
              title: translate({
                id: 'showcase.featuresSix.dispatch.title',
                message: 'Dispatch',
                description: 'Showcase Features (six items) card title for Dispatch',
              }),
              description: translate({
                id: 'showcase.featuresSix.dispatch.description',
                message: 'Routes messages by content, source, severity, or schedule. First matching relay wins.',
                description: 'Showcase Features (six items) card description for Dispatch',
              }),
            },
            {
              icon: 'lucide:repeat',
              title: translate({
                id: 'showcase.featuresSix.courier.title',
                message: 'Courier',
                description: 'Showcase Features (six items) card title for Courier',
              }),
              description: translate({
                id: 'showcase.featuresSix.courier.description',
                message: 'Exponential backoff with jitter. Dead-letter queues. Delivery receipts. Guaranteed delivery.',
                description: 'Showcase Features (six items) card description for Courier',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.parcel.title',
                message: 'Parcel',
                description: 'Showcase Features (six items) card title for Parcel',
              }),
              description: translate({
                id: 'showcase.featuresSix.parcel.description',
                message: 'Transforms payloads between any two formats. Lossy and lossless modes. Field mapping and template rendering.',
                description: 'Showcase Features (six items) card description for Parcel',
              }),
            },
            {
              icon: 'lucide:lock',
              title: translate({
                id: 'showcase.featuresSix.cipher.title',
                message: 'Cipher',
                description: 'Showcase Features (six items) card title for Cipher',
              }),
              description: translate({
                id: 'showcase.featuresSix.cipher.description',
                message: 'Authenticates every incoming request. HMAC, bearer, and IP allowlist modes. Zero-downtime token rotation.',
                description: 'Showcase Features (six items) card description for Cipher',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.ledger.title',
                message: 'Ledger',
                description: 'Showcase Features (six items) card title for Ledger',
              }),
              description: translate({
                id: 'showcase.featuresSix.ledger.description',
                message: 'Records every state transition. Append-only. Configurable retention. Exportable via Spoke API.',
                description: 'Showcase Features (six items) card description for Ledger',
              }),
            },
            {
              icon: 'lucide:shield',
              title: translate({
                id: 'showcase.featuresSix.embassy.title',
                message: 'Embassy',
                description: 'Showcase Features (six items) card title for Embassy',
              }),
              description: translate({
                id: 'showcase.featuresSix.embassy.description',
                message: 'Reverse proxy that hides internal topology. TLS termination. Header stripping. Origin masking.',
                description: 'Showcase Features (six items) card description for Embassy',
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
            message: 'Relay Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key performance indicators across all active relay pipelines.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '<5ms',
              label: translate({
                id: 'showcase.statsFull.latency.label',
                message: 'Relay latency (p99)',
                description: 'Showcase Stats (full) label for relay latency',
              }),
              color: 'primary',
            },
            {
              value: '3MB',
              label: translate({
                id: 'showcase.statsFull.image.label',
                message: 'Vial image size',
                description: 'Showcase Stats (full) label for Vial image size',
              }),
              color: 'accent',
            },
            {
              value: '100%',
              label: translate({
                id: 'showcase.statsFull.delivery.label',
                message: 'Delivery rate',
                description: 'Showcase Stats (full) label for delivery rate',
              }),
              color: 'primary',
            },
            {
              value: '8',
              label: translate({
                id: 'showcase.statsFull.translators.label',
                message: 'Protocol translators',
                description: 'Showcase Stats (full) label for protocol translator count',
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
              value: '8',
              label: translate({
                id: 'showcase.statsNoHeading.translators.label',
                message: 'Translators',
                description: 'Showcase Stats (no heading) label for translators',
              }),
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsNoHeading.dependencies.label',
                message: 'Dependencies',
                description: 'Showcase Stats (no heading) label for dependencies',
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
              value: '200ms',
              label: translate({
                id: 'showcase.statsNoHeading.coldStart.label',
                message: 'Cold start',
                description: 'Showcase Stats (no heading) label for cold start',
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
              'vial pull envoy',
              'envoy start --config relay.grain',
              'curl http://localhost:8090/api/health',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to a working relay.',
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
              message: 'Envoy reads your relay manifest, initializes Cipher for authentication, compiles Parcel transformation rules, and registers Dispatch routes. Messages flow through the pipeline in under five milliseconds.',
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
            message: 'Dispatches from the Relay Room',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Release notes, integration deep dives, and the occasional dispatch from the relay room.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'What Happens When a Webhook Fails at 3 AM',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2025-03-01',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'A Glassboard alert fired at 3:47 AM. The webhook to Canary failed silently. Nobody woke up. That is the problem that started Envoy.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2025/03/01/webhook-fails-at-3am/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'Retry Logic Is Harder Than You Think',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2025-06-05',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'Naive retry is easy. Reliable retry under load, with backoff, jitter, and dead-letter queues, is a different discipline.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2025/06/05/retry-logic/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'The 3MB Container That Replaced Our Entire Integration Layer',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2025-08-22',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'Twelve services, nine cron jobs, and a shared database — replaced by a single 3MB Vial image.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2025/08/22/3mb-container/',
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
            message: 'Recent Dispatches',
            description: 'Showcase BlogPreview (no description) section heading',
          })}
          posts={[{
            title: translate({
              id: 'showcase.blogPreviewNoDesc.post1.title',
              message: 'Envoy 2.2: Fanout Routing and Ledger Export',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2025-10-15',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Dispatch now supports fanout to multiple destinations from a single relay. Ledger entries are exportable to any Spoke endpoint on a configurable schedule.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2025/03/01/webhook-fails-at-3am/',
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
            message: 'Envoy uses a ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.relayManifest.title',
            message: 'relay pipeline declaration file',
            description: 'Showcase Terminology hover title for relay manifest',
          })}
          >
            {translate({
              id: 'showcase.terminology.relayManifest.label',
              message: 'relay manifest',
              description: 'Showcase Terminology displayed text for relay manifest',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterRelay',
            message: ' to define every integration pipeline. Each incoming message is authenticated by the ',
            description: 'Showcase Terminology paragraph 1 fragment after relay manifest',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.cipher.title',
            message: 'authentication gateway',
            description: 'Showcase Terminology hover title for Cipher',
          })}
          >
            Cipher
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterCipher',
            message: ' gateway before reaching the transformation stage. When delivery fails, the ',
            description: 'Showcase Terminology paragraph 1 fragment after Cipher',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.courier.title',
            message: 'guaranteed-delivery retry engine',
            description: 'Showcase Terminology hover title for Courier',
          })}
          >
            Courier
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterCourier',
            message: ' engine handles retries automatically.',
            description: 'Showcase Terminology paragraph 1 fragment after Courier',
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
              id: 'showcase.terminology.parcel.title',
              message: 'payload transformation pipeline',
              description: 'Showcase Terminology hover title for Parcel',
            })}
            color
          >
            Parcel
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterParcel',
            message: ' pipeline, sources and destinations never need to agree on a format. ',
            description: 'Showcase Terminology paragraph 2 fragment after Parcel',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.dispatch.title',
              message: 'intelligent routing engine',
              description: 'Showcase Terminology hover title for Dispatch',
            })}
            color
          >
            Dispatch
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterDispatch',
            message: ' handles routing, and ',
            description: 'Showcase Terminology paragraph 2 fragment after Dispatch',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.ledger.title',
            message: 'append-only audit trail',
            description: 'Showcase Terminology hover title for Ledger',
          })}
          >
            Ledger
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterLedger',
            message: ' records the full transaction history.',
            description: 'Showcase Terminology paragraph 2 fragment after Ledger',
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
          message: 'Brand mark routed through the Frame block — figure + caption, no ceremony.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Envoy brand thumbnail.',
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
              message: 'Envoy brand thumbnail.',
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
