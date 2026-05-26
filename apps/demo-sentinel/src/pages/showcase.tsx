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
        message: 'Sentinel block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Sentinel preset, rendered with sample data.',
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
            message: 'Every Sentinel block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Sentinel-world data so you can see how they look and behave.',
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
            message: 'Trust is earned continuously.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Sentinel evaluates every user, every device, every connection — continuously. Access is not a door. It is a conversation that never ends.',
            description: 'Showcase Hero (minimal) tagline',
          })}
          ctaLabel={translate({
            id: 'showcase.heroMinimal.ctaLabel',
            message: 'Explore the Platform',
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
          command="spark install sentinel-agent"
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
            message: 'Or use a Vial container',
            description: 'Showcase InstallStrip (block) label',
          })}
          command="vial pull sentinel/agent:latest"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="sentinel parapet dry-run --scope all-devices" />
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
          command="spark install sentinel-agent"
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
            message: 'Why Teams Choose Sentinel',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:eye',
              title: translate({
                id: 'showcase.featuresIcons.watchtower.title',
                message: 'Watchtower',
                description: 'Showcase Features (with icons) card title for Watchtower',
              }),
              description: translate({
                id: 'showcase.featuresIcons.watchtower.description',
                message: 'Continuous posture assessment. Evaluates device health, location, and behavior every 90 seconds.',
                description: 'Showcase Features (with icons) card description for Watchtower',
              }),
            },
            {
              icon: 'lucide:door-open',
              title: translate({
                id: 'showcase.featuresIcons.drawbridge.title',
                message: 'Drawbridge',
                description: 'Showcase Features (with icons) card title for Drawbridge',
              }),
              description: translate({
                id: 'showcase.featuresIcons.drawbridge.description',
                message: 'Adaptive access gateway. Grants, narrows, or revokes access in real time based on trust evaluation.',
                description: 'Showcase Features (with icons) card description for Drawbridge',
              }),
            },
            {
              icon: 'lucide:shield-check',
              title: translate({
                id: 'showcase.featuresIcons.garrison.title',
                message: 'Garrison',
                description: 'Showcase Features (with icons) card title for Garrison',
              }),
              description: translate({
                id: 'showcase.featuresIcons.garrison.description',
                message: 'Endpoint compliance engine. Enforces policy on every connected device before access is granted.',
                description: 'Showcase Features (with icons) card description for Garrison',
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
                id: 'showcase.featuresNoIcons.rampart.title',
                message: 'Rampart',
                description: 'Showcase Features (no icons) card title for Rampart',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.rampart.description',
                message: 'Micro-segmentation layer. Isolates workloads so lateral movement between zones is impossible.',
                description: 'Showcase Features (no icons) card description for Rampart',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.spyglass.title',
                message: 'Spyglass',
                description: 'Showcase Features (no icons) card title for Spyglass',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.spyglass.description',
                message: 'Audit and forensics. Full session reconstruction with 7-year immutable log retention.',
                description: 'Showcase Features (no icons) card description for Spyglass',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.parapet.title',
                message: 'Parapet',
                description: 'Showcase Features (no icons) card title for Parapet',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.parapet.description',
                message: 'Policy simulation sandbox. Test access rules against real traffic before enforcing them.',
                description: 'Showcase Features (no icons) card description for Parapet',
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
            message: 'The Complete Trust Engine',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:eye',
              title: translate({
                id: 'showcase.featuresSix.watchtower.title',
                message: 'Watchtower',
                description: 'Showcase Features (six items) card title for Watchtower',
              }),
              description: translate({
                id: 'showcase.featuresSix.watchtower.description',
                message: 'Evaluates device posture, user identity, network context, and behavioral signals on a continuous 90-second cycle.',
                description: 'Showcase Features (six items) card description for Watchtower',
              }),
            },
            {
              icon: 'lucide:door-open',
              title: translate({
                id: 'showcase.featuresSix.drawbridge.title',
                message: 'Drawbridge',
                description: 'Showcase Features (six items) card title for Drawbridge',
              }),
              description: translate({
                id: 'showcase.featuresSix.drawbridge.description',
                message: 'Translates Watchtower evaluations into concrete access decisions — grant, narrow, or revoke.',
                description: 'Showcase Features (six items) card description for Drawbridge',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.garrison.title',
                message: 'Garrison',
                description: 'Showcase Features (six items) card title for Garrison',
              }),
              description: translate({
                id: 'showcase.featuresSix.garrison.description',
                message: 'Manages device enrollment, posture baselines, and compliance profiles for every endpoint.',
                description: 'Showcase Features (six items) card description for Garrison',
              }),
            },
            {
              icon: 'lucide:brick-wall',
              title: translate({
                id: 'showcase.featuresSix.rampart.title',
                message: 'Rampart',
                description: 'Showcase Features (six items) card title for Rampart',
              }),
              description: translate({
                id: 'showcase.featuresSix.rampart.description',
                message: 'Divides infrastructure into isolated zones. Zone crossings require policy evaluation.',
                description: 'Showcase Features (six items) card description for Rampart',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.spyglass.title',
                message: 'Spyglass',
                description: 'Showcase Features (six items) card title for Spyglass',
              }),
              description: translate({
                id: 'showcase.featuresSix.spyglass.description',
                message: 'Records every access decision, policy evaluation, and zone crossing in an immutable audit chain.',
                description: 'Showcase Features (six items) card description for Spyglass',
              }),
            },
            {
              icon: 'lucide:shield',
              title: translate({
                id: 'showcase.featuresSix.parapet.title',
                message: 'Parapet',
                description: 'Showcase Features (six items) card title for Parapet',
              }),
              description: translate({
                id: 'showcase.featuresSix.parapet.description',
                message: 'Replays real traffic against draft policies to show the exact access impact before enforcement.',
                description: 'Showcase Features (six items) card description for Parapet',
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
            message: 'Platform Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key performance indicators across the Sentinel trust engine.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '90s',
              label: translate({
                id: 'showcase.statsFull.cycle.label',
                message: 'Re-evaluation cycle',
                description: 'Showcase Stats (full) label for re-evaluation cycle',
              }),
              color: 'primary',
            },
            {
              value: '12ms',
              label: translate({
                id: 'showcase.statsFull.latency.label',
                message: 'Policy latency',
                description: 'Showcase Stats (full) label for policy latency',
              }),
              color: 'accent',
            },
            {
              value: '99.97%',
              label: translate({
                id: 'showcase.statsFull.uptime.label',
                message: 'Evaluation uptime',
                description: 'Showcase Stats (full) label for evaluation uptime',
              }),
              color: 'primary',
            },
            {
              value: '7yr',
              label: translate({
                id: 'showcase.statsFull.retention.label',
                message: 'Audit retention',
                description: 'Showcase Stats (full) label for audit retention',
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
              value: '10K',
              label: translate({
                id: 'showcase.statsNoHeading.tunnels.label',
                message: 'Concurrent tunnels',
                description: 'Showcase Stats (no heading) label for concurrent tunnels',
              }),
            },
            {
              value: '6',
              label: translate({
                id: 'showcase.statsNoHeading.components.label',
                message: 'Components',
                description: 'Showcase Stats (no heading) label for components',
              }),
            },
            {
              value: '4',
              label: translate({
                id: 'showcase.statsNoHeading.zoneTypes.label',
                message: 'Zone types',
                description: 'Showcase Stats (no heading) label for zone types',
              }),
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsNoHeading.implicitTrust.label',
                message: 'Implicit trust',
                description: 'Showcase Stats (no heading) label for implicit trust',
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
              'spark install sentinel-agent',
              'sentinel-agent register --control-plane sentinel.internal',
              'sentinel policy apply policies/access.grain',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to continuous trust evaluation.',
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
              message: 'Sentinel evaluates trust continuously. Watchtower computes a posture score every 90 seconds. Drawbridge enforces the result in real time. Spyglass records every decision immutably. The output is always evidence — not assumption.',
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
            message: 'Security Bulletin',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Threat research, posture advisories, and the philosophy of continuous trust.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'The Day We Stopped Trusting the Network',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2025-04-01',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'The perimeter dissolved and the industry pretended it had not. We built Sentinel because every VPN is a trust assumption.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2025/04/01/trusting-the-network/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'Simulating a Breach We Never Had',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2025-06-18',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'How Parapet caught a lateral movement path in staging before it reached production.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2025/06/18/simulating-a-breach/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'Why Compliance Is Not Security (But You Still Need Both)',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2025-09-05',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'Passing an audit and being secure are not the same thing. Spyglass bridges the gap.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2025/09/05/compliance-vs-security/',
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
              message: 'Sentinel 3.4: Parapet Traffic Replay and Rampart Zone Quarantine',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2025-10-01',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Parapet now supports full traffic replay against draft policies, and Rampart can automatically quarantine devices that fail posture checks.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2025/04/01/trusting-the-network/',
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
            message: 'Sentinel uses a ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.trustPolicy.title',
            message: 'access control declaration',
            description: 'Showcase Terminology hover title for trust policy',
          })}
          >
            {translate({
              id: 'showcase.terminology.trustPolicy.label',
              message: 'trust policy',
              description: 'Showcase Terminology displayed text for trust policy',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterTrustPolicy',
            message: ' to drive all access decisions. Every enrolled device is monitored by the ',
            description: 'Showcase Terminology paragraph 1 fragment after trust policy',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.garrison.title',
            message: 'endpoint compliance agent',
            description: 'Showcase Terminology hover title for Garrison',
          })}
          >
            Garrison
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterGarrison',
            message: ' agent, which reports posture data to ',
            description: 'Showcase Terminology paragraph 1 fragment after Garrison',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.watchtower.title',
            message: 'continuous trust evaluation engine',
            description: 'Showcase Terminology hover title for Watchtower',
          })}
          >
            Watchtower
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterWatchtower',
            message: ' for scoring.',
            description: 'Showcase Terminology paragraph 1 fragment after Watchtower',
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
              id: 'showcase.terminology.rampart.title',
              message: 'micro-segmentation layer',
              description: 'Showcase Terminology hover title for Rampart',
            })}
            color
          >
            Rampart
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterRampart',
            message: ' zone system, workloads are isolated so that even a compromised segment cannot affect ',
            description: 'Showcase Terminology paragraph 2 fragment after Rampart',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.filament.title',
              message: 'encrypted tunnel protocol',
              description: 'Showcase Terminology hover title for Filament',
            })}
            color
          >
            Filament
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterFilament',
            message: ' tunnels in adjacent zones. Every decision is recorded in ',
            description: 'Showcase Terminology paragraph 2 fragment after Filament',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.spyglass.title',
            message: 'audit and forensics engine',
            description: 'Showcase Terminology hover title for Spyglass',
          })}
          >
            Spyglass
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterSpyglass',
            message: ' for immutable audit retention.',
            description: 'Showcase Terminology paragraph 2 fragment after Spyglass',
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
          message: 'Brand mark posted on a Frame — solid border, watch-tower steady.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Sentinel brand thumbnail.',
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
              message: 'Sentinel brand thumbnail.',
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
