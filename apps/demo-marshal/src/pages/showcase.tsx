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
        message: 'Marshal block showcase demonstrating every block from docusaurus-preset-nova.',
        description: 'Showcase page layout description (meta description for SEO)',
      })}
      description={translate({
        id: 'showcase.description',
        message: 'Every block from the Marshal preset, rendered with sample data.',
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
            message: 'Every Marshal block, demonstrated in one place.',
            description: 'Showcase Hero (full) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroFull.tagline',
            message: 'This page renders each block from @cbnventures/docusaurus-preset-nova/blocks with Marshal-world data so you can see how they look and behave.',
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
            message: 'Filed, sealed, automated.',
            description: 'Showcase Hero (minimal) main heading',
          })}
          tagline={translate({
            id: 'showcase.heroMinimal.tagline',
            message: 'Marshal is the Department of Repository Affairs — automated stewardship for projects that prefer paperwork to drama.',
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
          command="spark install marshal"
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
          command="loom add --dev marshal"
          copyTarget="block"
        />
      </Showcase.Item>

      <Showcase.Item title={translate({
        id: 'showcase.item.installStripNoLabel.title',
        message: 'InstallStrip (no label)',
        description: 'Showcase item title for InstallStrip (no label variant)',
      })}
      >
        <InstallStrip command="marshal status --policies" />
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
          command="spark install marshal"
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
            message: 'Why Repositories Choose Marshal',
            description: 'Showcase Features (with icons) section heading',
          })}
          items={[
            {
              icon: 'lucide:file-text',
              title: translate({
                id: 'showcase.featuresIcons.policies.title',
                message: 'Policies',
                description: 'Showcase Features (with icons) card title for Policies',
              }),
              description: translate({
                id: 'showcase.featuresIcons.policies.description',
                message: 'Write a YAML block describing how Marshal handles a class of events. Marshal reads only what is filed and stamps only what is sealed.',
                description: 'Showcase Features (with icons) card description for Policies',
              }),
            },
            {
              icon: 'lucide:inbox',
              title: translate({
                id: 'showcase.featuresIcons.dockets.title',
                message: 'Dockets',
                description: 'Showcase Features (with icons) card title for Dockets',
              }),
              description: translate({
                id: 'showcase.featuresIcons.dockets.description',
                message: 'Every action Marshal takes writes a line in the public record. Closed threads, stamped approvals, scheduled rollovers — all append-only.',
                description: 'Showcase Features (with icons) card description for Dockets',
              }),
            },
            {
              icon: 'lucide:layers',
              title: translate({
                id: 'showcase.featuresIcons.accessTiers.title',
                message: 'Access Tiers',
                description: 'Showcase Features (with icons) card title for Access Tiers',
              }),
              description: translate({
                id: 'showcase.featuresIcons.accessTiers.description',
                message: 'Route incoming work by sponsor, contributor, or public. The label is stamped, not negotiated.',
                description: 'Showcase Features (with icons) card description for Access Tiers',
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
                id: 'showcase.featuresNoIcons.scheduledStewardship.title',
                message: 'Scheduled Stewardship',
                description: 'Showcase Features (no icons) card title for Scheduled Stewardship',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.scheduledStewardship.description',
                message: 'Run cleanups, audits, and rollovers on a cron. Marshal acts at the top of the hour and files a record.',
                description: 'Showcase Features (no icons) card description for Scheduled Stewardship',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.threadArchival.title',
                message: 'Thread Archival',
                description: 'Showcase Features (no icons) card title for Thread Archival',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.threadArchival.description',
                message: 'Close and seal threads inactive for N days — with a paper trail for each, and a path to reopen.',
                description: 'Showcase Features (no icons) card description for Thread Archival',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresNoIcons.automatedStamps.title',
                message: 'Automated Stamps',
                description: 'Showcase Features (no icons) card title for Automated Stamps',
              }),
              description: translate({
                id: 'showcase.featuresNoIcons.automatedStamps.description',
                message: 'Every action carries a timestamp, an author of record, and a reference to the policy that triggered it.',
                description: 'Showcase Features (no icons) card description for Automated Stamps',
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
            message: 'Everything in One Department',
            description: 'Showcase Features (six items) section heading',
          })}
          items={[
            {
              icon: 'lucide:file-text',
              title: translate({
                id: 'showcase.featuresSix.policies.title',
                message: 'Policies',
                description: 'Showcase Features (six items) card title for Policies',
              }),
              description: translate({
                id: 'showcase.featuresSix.policies.description',
                message: 'Describe the rules in YAML. Marshal reads, acts, and files. Nothing is negotiated at runtime.',
                description: 'Showcase Features (six items) card description for Policies',
              }),
            },
            {
              icon: 'lucide:inbox',
              title: translate({
                id: 'showcase.featuresSix.dockets.title',
                message: 'Dockets',
                description: 'Showcase Features (six items) card title for Dockets',
              }),
              description: translate({
                id: 'showcase.featuresSix.dockets.description',
                message: 'Append-only public record of every action. Closed threads, routing decisions, scheduled passes — all stamped.',
                description: 'Showcase Features (six items) card description for Dockets',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.accessTiers.title',
                message: 'Access Tiers',
                description: 'Showcase Features (six items) card title for Access Tiers',
              }),
              description: translate({
                id: 'showcase.featuresSix.accessTiers.description',
                message: 'Sponsor, contributor, public — three tiers, one queue, one clerk. The label is assigned at receipt.',
                description: 'Showcase Features (six items) card description for Access Tiers',
              }),
            },
            {
              icon: 'lucide:clock',
              title: translate({
                id: 'showcase.featuresSix.scheduledStewardship.title',
                message: 'Scheduled Stewardship',
                description: 'Showcase Features (six items) card title for Scheduled Stewardship',
              }),
              description: translate({
                id: 'showcase.featuresSix.scheduledStewardship.description',
                message: 'Cron-driven cleanups and audits. Marshal acts on schedule and does not wait for a human to remember.',
                description: 'Showcase Features (six items) card description for Scheduled Stewardship',
              }),
            },
            {
              title: translate({
                id: 'showcase.featuresSix.threadArchival.title',
                message: 'Thread Archival',
                description: 'Showcase Features (six items) card title for Thread Archival',
              }),
              description: translate({
                id: 'showcase.featuresSix.threadArchival.description',
                message: 'Inactive threads are closed and sealed by policy, with a stamped notice and a reopen path on every case.',
                description: 'Showcase Features (six items) card description for Thread Archival',
              }),
            },
            {
              icon: 'lucide:stamp',
              title: translate({
                id: 'showcase.featuresSix.automatedStamps.title',
                message: 'Automated Stamps',
                description: 'Showcase Features (six items) card title for Automated Stamps',
              }),
              description: translate({
                id: 'showcase.featuresSix.automatedStamps.description',
                message: 'Every Marshal action references the policy that authorized it. The authorization is filed before the act.',
                description: 'Showcase Features (six items) card description for Automated Stamps',
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
            message: 'Marshal Metrics',
            description: 'Showcase Stats (full) section heading',
          })}
          description={translate({
            id: 'showcase.statsFull.description',
            message: 'Key numbers across a typical repository stewardship cycle.',
            description: 'Showcase Stats (full) section description',
          })}
          items={[
            {
              value: '2,108',
              label: translate({
                id: 'showcase.statsFull.threadsArchived.label',
                message: 'Threads archived',
                description: 'Showcase Stats (full) label for threads archived',
              }),
              color: 'primary',
            },
            {
              value: '3',
              label: translate({
                id: 'showcase.statsFull.accessTiers.label',
                message: 'Access tiers',
                description: 'Showcase Stats (full) label for access tiers',
              }),
              color: 'accent',
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsFull.manualClosures.label',
                message: 'Manual closures',
                description: 'Showcase Stats (full) label for manual closures',
              }),
              color: 'primary',
            },
            {
              value: '1',
              label: translate({
                id: 'showcase.statsFull.policyFile.label',
                message: 'Policy file',
                description: 'Showcase Stats (full) label for policy file',
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
                id: 'showcase.statsNoHeading.policyFile.label',
                message: 'Policy file',
                description: 'Showcase Stats (no heading) label for policy file',
              }),
            },
            {
              value: '0',
              label: translate({
                id: 'showcase.statsNoHeading.manualActions.label',
                message: 'Manual actions',
                description: 'Showcase Stats (no heading) label for manual actions',
              }),
            },
            {
              value: '∞',
              label: translate({
                id: 'showcase.statsNoHeading.docketEntries.label',
                message: 'Docket entries',
                description: 'Showcase Stats (no heading) label for docket entries',
              }),
            },
            {
              value: '3',
              label: translate({
                id: 'showcase.statsNoHeading.accessTiers.label',
                message: 'Access tiers',
                description: 'Showcase Stats (no heading) label for access tiers',
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
              'spark install marshal',
              'marshal init',
              'marshal status --policies',
            ].join('\n')}
          </pre>
          <p className="nova-section-description">
            {translate({
              id: 'showcase.spotlightCode.description',
              message: 'Three commands to go from zero to a stewarded repository.',
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
              message: 'Marshal reads your policy file, queues each applicable workflow at the top of the next hour, and stamps a docket entry for every action taken. The docket is append-only. Nothing closes silently.',
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
            message: 'Dispatches from the Department',
            description: 'Showcase BlogPreview (with description) section heading',
          })}
          description={translate({
            id: 'showcase.blogPreviewWithDesc.description',
            message: 'Policies filed, dockets stamped, stewardship on the record.',
            description: 'Showcase BlogPreview (with description) section description',
          })}
          posts={[
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post1.title',
                message: 'Filing the unfileable',
                description: 'Showcase BlogPreview sample post 1 title',
              }),
              date: '2026-02-26',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post1.description',
                message: 'Some incoming work does not fit any policy. A misfiled bug, a request from outside the tier system, a duplicate of a duplicate. Marshal files them under unclassified.',
                description: 'Showcase BlogPreview sample post 1 description',
              }),
              permalink: '/blog/2026/02/26/filing-the-unfileable/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post2.title',
                message: 'One year of stale threads, archived in a single afternoon',
                description: 'Showcase BlogPreview sample post 2 title',
              }),
              date: '2026-04-12',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post2.description',
                message: 'The repository had 2,184 issues older than a year. Marshal closed and sealed 2,108 in a single overnight pass.',
                description: 'Showcase BlogPreview sample post 2 description',
              }),
              permalink: '/blog/2026/04/12/stale-thread-archival/',
            },
            {
              title: translate({
                id: 'showcase.blogPreviewWithDesc.post3.title',
                message: 'Three tiers of support, one queue, one clerk',
                description: 'Showcase BlogPreview sample post 3 title',
              }),
              date: '2026-04-22',
              description: translate({
                id: 'showcase.blogPreviewWithDesc.post3.description',
                message: 'Marshal now routes incoming support tickets by access tier into a single queue with three labels. The label is stamped, not negotiated.',
                description: 'Showcase BlogPreview sample post 3 description',
              }),
              permalink: '/blog/2026/04/22/sponsor-gated-support/',
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
              message: 'Marshal 2.4: Auditor Auto-fix Tiers and Clerk Dependency Graphs',
              description: 'Showcase BlogPreview (no description) sample post title',
            }),
            date: '2026-04-29',
            description: translate({
              id: 'showcase.blogPreviewNoDesc.post1.description',
              message: 'Auditor now applies automatic fixes across the conventions and formatting tiers, and Clerk renders a dependency graph across all dockets in the workspace.',
              description: 'Showcase BlogPreview (no description) sample post description',
            }),
            permalink: '/blog/2026/04/12/stale-thread-archival/',
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
            message: 'Marshal uses a ',
            description: 'Showcase Terminology paragraph 1 intro fragment',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.policy.title',
            message: 'written rule about how Marshal handles a class of events',
            description: 'Showcase Terminology hover title for policy',
          })}
          >
            {translate({
              id: 'showcase.terminology.policy.label',
              message: 'policy',
              description: 'Showcase Terminology displayed text for policy',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterPolicy',
            message: ' to govern its actions on a repository. Each action is recorded in the ',
            description: 'Showcase Terminology paragraph 1 fragment after policy',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.docket.title',
            message: 'append-only public record of every action taken',
            description: 'Showcase Terminology hover title for docket',
          })}
          >
            {translate({
              id: 'showcase.terminology.docket.label',
              message: 'docket',
              description: 'Showcase Terminology displayed text for docket',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterDocket',
            message: ', where every entry carries a ',
            description: 'Showcase Terminology paragraph 1 fragment after docket',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.stamp.title',
            message: 'timestamped authorization mark applied to a completed action',
            description: 'Showcase Terminology hover title for stamp',
          })}
          >
            {translate({
              id: 'showcase.terminology.stamp.label',
              message: 'stamp',
              description: 'Showcase Terminology displayed text for stamp',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph1.afterStamp',
            message: ' referencing the policy that authorized it.',
            description: 'Showcase Terminology paragraph 1 fragment after stamp',
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
            message: 'Incoming work is routed by ',
            description: 'Showcase Terminology paragraph 2 intro fragment',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.accessTier.title',
              message: 'classification of incoming work by sponsorship or contribution status',
              description: 'Showcase Terminology hover title for access tier',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.accessTier.label',
              message: 'access tier',
              description: 'Showcase Terminology displayed text for access tier',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterAccessTier',
            message: ' into the ',
            description: 'Showcase Terminology paragraph 2 fragment after access tier',
          })}
          <Terminology
            title={translate({
              id: 'showcase.terminology.queue.title',
              message: 'single ordered list of all incoming work',
              description: 'Showcase Terminology hover title for queue',
            })}
            color
          >
            {translate({
              id: 'showcase.terminology.queue.label',
              message: 'queue',
              description: 'Showcase Terminology displayed text for queue',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterQueue',
            message: '. Inactive threads are closed by ',
            description: 'Showcase Terminology paragraph 2 fragment after queue',
          })}
          <Terminology title={translate({
            id: 'showcase.terminology.threadArchival.title',
            message: 'policy-driven closure of threads inactive beyond a threshold',
            description: 'Showcase Terminology hover title for thread archival',
          })}
          >
            {translate({
              id: 'showcase.terminology.threadArchival.label',
              message: 'thread archival',
              description: 'Showcase Terminology displayed text for thread archival',
            })}
          </Terminology>
          {translate({
            id: 'showcase.terminology.paragraph2.afterThreadArchival',
            message: ' with a paper trail on every case.',
            description: 'Showcase Terminology paragraph 2 fragment after thread archival',
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
          message: 'Brand mark filed inside a Frame block, ready for citation.',
          description: 'Showcase Frame (with caption) caption text',
        })}
        >
          <img
            src="/thumbnails/brand.png"
            alt={translate({
              id: 'showcase.frame.imageAlt',
              message: 'Marshal brand thumbnail.',
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
              message: 'Marshal brand thumbnail.',
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
