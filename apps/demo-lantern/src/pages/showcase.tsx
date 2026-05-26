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
        message: 'Lantern block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Lantern preset, rendered with sample data.',
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
            message: 'Every Lantern block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Lantern-world data so you can see how they look and behave.',
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
            message: 'Watchful, warm, always home.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Lantern watches your whole house — zones, motion, arm/disarm — without ever raising its voice.',
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
          command="spark install lantern"
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
          command="loom add --dev lantern"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="lantern status --zones" />
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
          command="spark install lantern"
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
            message: 'Why Households Choose Lantern',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:home',
              title: translate({
                id: 'showcase.featuresIcons.zones.title',
                message: 'Zones',
                description: 'Showcase Features (with icons) card title for Zones',
              }),
              description: translate({
                id: 'showcase.featuresIcons.zones.description',
                message: 'Group devices by where they live — perimeter, interior, sleeping areas. Arm any zone independently, disarm gently by name.',
                description: 'Showcase Features (with icons) card description for Zones',
              }),
            },
            {
              icon: 'lucide:activity',
              title: translate({
                id: 'showcase.featuresIcons.motionEvents.title',
                message: 'Motion Events',
                description: 'Showcase Features (with icons) card title for Motion Events',
              }),
              description: translate({
                id: 'showcase.featuresIcons.motionEvents.description',
                message: 'Every motion passes through the event stream with direction and an optional confidence band. Replay, filter, hand off to a hub.',
                description: 'Showcase Features (with icons) card description for Motion Events',
              }),
            },
            {
              icon: 'lucide:shield-check',
              title: translate({
                id: 'showcase.featuresIcons.armDisarm.title',
                message: 'Arm / Disarm',
                description: 'Showcase Features (with icons) card title for Arm / Disarm',
              }),
              description: translate({
                id: 'showcase.featuresIcons.armDisarm.description',
                message: 'Arm or disarm by zone, user, or schedule. Hand off control to someone you trust by name, passphrase, or HomeKit presence.',
                description: 'Showcase Features (with icons) card description for Arm / Disarm',
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
                id: 'showcase.featuresNoIcons.contactSensors.title',
                message: 'Contact Sensors',
                description: 'Showcase Features (no icons) card title for Contact Sensors',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.contactSensors.description',
                message: 'Door opened, window held, gate closed — each contact event is timestamped and stored in a quiet ledger.',
                description: 'Showcase Features (no icons) card description for Contact Sensors',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.deviceDiscovery.title',
                message: 'Device Discovery',
                description: 'Showcase Features (no icons) card title for Device Discovery',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.deviceDiscovery.description',
                message: 'Lantern finds every sensor and contact device on your hub automatically. No manual pairing, no configuration files.',
                description: 'Showcase Features (no icons) card description for Device Discovery',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.sensorHistory.title',
                message: 'Sensor History',
                description: 'Showcase Features (no icons) card title for Sensor History',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.sensorHistory.description',
                message: 'A quiet ledger of everything that happened — motion, contact, arm states — sorted by zone and time.',
                description: 'Showcase Features (no icons) card description for Sensor History',
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
            message: 'Everything in One House',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:home',
              title: translate({
                id: 'showcase.featuresSix.zones.title',
                message: 'Zones',
                description: 'Showcase Features (six items) card title for Zones',
              }),
              description: translate({
                id: 'showcase.featuresSix.zones.description',
                message: 'Group by room, hallway, exterior, or appliance group. Arm independently. Disarm gently by name.',
                description: 'Showcase Features (six items) card description for Zones',
              }),
            },
            {
              icon: 'lucide:activity',
              title: translate({
                id: 'showcase.featuresSix.motionEvents.title',
                message: 'Motion Events',
                description: 'Showcase Features (six items) card title for Motion Events',
              }),
              description: translate({
                id: 'showcase.featuresSix.motionEvents.description',
                message: 'Directional motion with optional confidence band. Replay, filter, and hand off to a hub without dropping events.',
                description: 'Showcase Features (six items) card description for Motion Events',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.contactSensors.title',
                message: 'Contact Sensors',
                description: 'Showcase Features (six items) card title for Contact Sensors',
              }),
              description: translate({
                id: 'showcase.featuresSix.contactSensors.description',
                message: 'Door, window, gate — each contact event is timestamped and stored in the sensor history ledger.',
                description: 'Showcase Features (six items) card description for Contact Sensors',
              }),
            },
            {
              icon: 'lucide:shield-check',
              title: translate({
                id: 'showcase.featuresSix.armDisarm.title',
                message: 'Arm / Disarm',
                description: 'Showcase Features (six items) card title for Arm / Disarm',
              }),
              description: translate({
                id: 'showcase.featuresSix.armDisarm.description',
                message: 'By zone, user, or schedule. Handoff by name, passphrase, or HomeKit Home Hub presence.',
                description: 'Showcase Features (six items) card description for Arm / Disarm',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.deviceDiscovery.title',
                message: 'Device Discovery',
                description: 'Showcase Features (six items) card title for Device Discovery',
              }),
              description: translate({
                id: 'showcase.featuresSix.deviceDiscovery.description',
                message: 'Autodiscovery of every sensor and contact device on your hub. No manual pairing.',
                description: 'Showcase Features (six items) card description for Device Discovery',
              }),
            },
            {
              icon: 'lucide:history',
              title: translate({
                id: 'showcase.featuresSix.sensorHistory.title',
                message: 'Sensor History',
                description: 'Showcase Features (six items) card title for Sensor History',
              }),
              description: translate({
                id: 'showcase.featuresSix.sensorHistory.description',
                message: 'Motion, contact, and arm states in a quiet ledger. Scroll back a week without leaving the dashboard.',
                description: 'Showcase Features (six items) card description for Sensor History',
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
            message: 'Lantern Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key numbers across a typical four-zone household setup.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '4',
              label: translate({
                id: 'showcase.statsFull.zones.label',
                message: 'Default zones',
                description: 'Showcase Stats (full) label for default zones',
              }),
              color: 'primary',
            },
            {
              value: '12',
              label: translate({
                id: 'showcase.statsFull.devices.label',
                message: 'Devices discovered',
                description: 'Showcase Stats (full) label for devices discovered',
              }),
              color: 'accent',
            },
            {
              value: '2am',
              label: translate({
                id: 'showcase.statsFull.handoff.label',
                message: 'Handoff ready',
                description: 'Showcase Stats (full) label for handoff readiness',
              }),
              color: 'primary',
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsFull.configFiles.label',
                message: 'Config files',
                description: 'Showcase Stats (full) label for config files',
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
              value: '4',
              label: translate({
                id: 'showcase.statsNoHeading.zones.label',
                message: 'Zones',
                description: 'Showcase Stats (no heading) label for zones',
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
              value: '∞',
              label: translate({
                id: 'showcase.statsNoHeading.sensorHistory.label',
                message: 'Sensor history',
                description: 'Showcase Stats (no heading) label for sensor history',
              }),
            },
            {
              value: '1',
              label: translate({
                id: 'showcase.statsNoHeading.manifest.label',
                message: 'Manifest',
                description: 'Showcase Stats (no heading) label for manifest',
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
              'spark install lantern',
              'lantern status',
              'lantern zones arm perimeter',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to a watched house.',
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
              message: 'Lantern discovers every device on your hub, groups them by zone, and streams every motion and contact event to the event log. Arm states are persistent — power off, power on, the zone remembers.',
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
            message: 'From the Porch Light',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Updates, patterns, and quiet notes from the house.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'Watching from another room without the house knowing',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2026-02-23',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'A household member upstairs should know the front door is closed without sending the dog a notification. Lantern routes events by audience, not by event type.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2026/02/23/watching-from-another-room/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'Six months of perimeter motion, in one picture',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2026-04-10',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'A motion sensor on the front porch fires forty times a day. Most of those are squirrels. Lantern\'s history view is where the squirrels become a pattern.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2026/04/10/perimeter-history/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'Handing off arm/disarm to someone you trust',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2026-04-21',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'A trusted user can disarm any zone Lantern watches without your phone in their hand. By name, passphrase, or HomeKit presence.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2026/04/21/arm-disarm-handoff/',
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
              message: 'Lantern 2.4: Lens Floor-Plan Overlay and Beacon Incremental Runs',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2026-04-28',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Lens now renders the household zone graph onto a floor plan, and Beacon supports incremental runs that re-evaluate only the sensors that changed.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2026/04/10/perimeter-history/',
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
            message: 'Lantern uses a ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.zone.title',
            message: 'named room, hallway, or exterior group',
            description: 'Showcase Terminology hover title for zone',
          })}
          >
            {translate({
              id: 'showcase.terminology.zone.label',
              message: 'zone',
              description: 'Showcase Terminology displayed text for zone',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterZone',
            message: ' to group devices by where they live. Each zone is managed by an ',
            description: 'Showcase Terminology paragraph 1 fragment after zone',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.armState.title',
            message: 'arm/disarm control',
            description: 'Showcase Terminology hover title for arm state',
          })}
          >
            {translate({
              id: 'showcase.terminology.armState.label',
              message: 'arm state',
              description: 'Showcase Terminology displayed text for arm state',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterArmState',
            message: ' that persists across power cycles. When a sensor fires, the event passes through the ',
            description: 'Showcase Terminology paragraph 1 fragment after arm state',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.eventStream.title',
            message: 'real-time notification stream',
            description: 'Showcase Terminology hover title for event stream',
          })}
          >
            {translate({
              id: 'showcase.terminology.eventStream.label',
              message: 'event stream',
              description: 'Showcase Terminology displayed text for event stream',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterEventStream',
            message: ' without being dropped.',
            description: 'Showcase Terminology paragraph 1 fragment after event stream',
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
              id: 'showcase.terminology.handoffSystem.title',
              message: 'trusted person handoff',
              description: 'Showcase Terminology hover title for handoff system',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.handoffSystem.label',
              message: 'handoff system',
              description: 'Showcase Terminology displayed text for handoff system',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterHandoff',
            message: ', households share control of ',
            description: 'Showcase Terminology paragraph 2 fragment after handoff system',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.zoneAccess.title',
              message: 'zone arm/disarm access',
              description: 'Showcase Terminology hover title for zone access',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.zoneAccess.label',
              message: 'zone access',
              description: 'Showcase Terminology displayed text for zone access',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterZoneAccess',
            message: ' and ',
            description: 'Showcase Terminology paragraph 2 fragment after zone access',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.sensorHistory.title',
            message: 'historical sensor data',
            description: 'Showcase Terminology hover title for sensor history',
          })}
          >
            {translate({
              id: 'showcase.terminology.sensorHistory.label',
              message: 'sensor history',
              description: 'Showcase Terminology displayed text for sensor history',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterSensorHistory',
            message: ' without exchanging credentials.',
            description: 'Showcase Terminology paragraph 2 fragment after sensor history',
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
          message: 'Brand mark glowing inside a Frame — warm paper card with figure + caption.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Lantern brand thumbnail.',
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
              message: 'Lantern brand thumbnail.',
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
