import {
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Showcase,
  Spotlight,
  TerminalFrame,
  Typewriter,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import type {
  Pages_Index_FrameMarkers,
  Pages_Index_PromptMarkers,
  Pages_Index_TerminalLineTone_FirstCharacter,
  Pages_Index_TerminalLineTone_Line,
  Pages_Index_TerminalLineTone_Returns,
  PagesConfigSnippets,
  PagesContext,
  PagesFeatureItems,
  PagesShots,
  PagesSiteConfig,
} from '@site/src/types/pages/index.d.ts';

/**
 * Pages - Prompt Markers.
 *
 * First characters that the prompts library prints before a question, a
 * selected choice, or an answered question, colored like a prompt.
 *
 * @since 0.11.0
 */
const promptMarkers: Pages_Index_PromptMarkers = [
  '❯',
  '?',
  '✔',
];

/**
 * Pages - Frame Markers.
 *
 * First characters of the CLI banner box, colored as muted frame lines so
 * the banner sits behind the output.
 *
 * @since 0.11.0
 */
const frameMarkers: Pages_Index_FrameMarkers = [
  '╭',
  '│',
  '╰',
];

/**
 * Pages - Terminal Line Tone.
 *
 * Picks the color class for one line of captured CLI output, so the terminal
 * window reads like the real thing without an ANSI parser.
 *
 * @param {Pages_Index_TerminalLineTone_Line} line - Line.
 *
 * @returns {Pages_Index_TerminalLineTone_Returns}
 *
 * @since 0.11.0
 */
function terminalLineTone(line: Pages_Index_TerminalLineTone_Line): Pages_Index_TerminalLineTone_Returns {
  if (line.startsWith('INFO') === true || line.startsWith('CURRENTLY RUNNING') === true) {
    return 'terminalLineInfo';
  }

  const firstCharacter: Pages_Index_TerminalLineTone_FirstCharacter = line.slice(0, 1);

  if (promptMarkers.includes(firstCharacter) === true) {
    return 'terminalLinePrompt';
  }

  if (frameMarkers.includes(firstCharacter) === true) {
    return 'terminalLineFrame';
  }

  if (line.endsWith(':') === true) {
    return 'terminalLineHeading';
  }

  return 'terminalLineBody';
}

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * and blog preview using theme components.
 *
 * @constructor
 *
 * @returns {JSX.Element}
 *
 * @since 0.11.0
 */
function Home() {
  const context: PagesContext = useDocusaurusContext();
  const siteConfig: PagesSiteConfig = context.siteConfig;

  /**
   * Pages - Home - Feature Items.
   *
   * The cards under the install strip, one for each part of Nova:
   * presets, rules, scaffolds, generators and recipes, utilities, and the docs preset.
   *
   * @since 0.15.0
   */
  const featureItems: PagesFeatureItems = [
    {
      icon: 'lucide:layers',
      title: 'Presets That Stack',
      description: 'ESLint and TSConfig presets layer by language, runtime, framework, and tool, so each workspace gets exactly the rules it needs. Every preset ships strict.',
    },
    {
      icon: 'lucide:shield-check',
      title: 'Rules Plain ESLint Doesn\'t Have',
      description: 'Dozens of custom rules enforce the conventions linters usually leave to code review, from import order to documentation comments. Override what you need and the rest stays enforced.',
    },
    {
      icon: 'lucide:package',
      title: 'Scaffolds for Every Workspace',
      description: 'Start a monorepo, then add apps, packages, docs, and tools from Next.js and Astro to Apple, Android, Discord bots, and pfSense packages. Each workspace knows its role and how it ships.',
    },
    {
      icon: 'lucide:file-plus',
      title: 'Generators and Recipes',
      description: 'Generate agent conventions, environment files, ignore files, licenses, and READMEs. Recipes then keep package.json, GitHub, and Docker Hub settings in sync.',
    },
    {
      icon: 'lucide:wrench',
      title: 'Utilities and Toolkit',
      description: 'Record changelogs, run scripts across workspaces, and type-check from the CLI. The toolkit adds structured logging, CLI headers, and Markdown tables you import as needed.',
    },
    {
      icon: 'lucide:palette',
      title: 'A Docs Site in One Preset',
      description: 'Six ready-made Docusaurus presets with color tokens, navbar, footer, search, and analytics set in one config. This site runs on it.',
    },
  ];

  /**
   * Pages - Home - Shots.
   *
   * Terminal views of the Nova CLI shown in the showcase, captured from
   * the real commands in a stand-in project.
   *
   * @since 0.11.0
   */
  const shots: PagesShots = [
    {
      key: 'scaffold',
      label: 'Scaffold',
      heading: 'A new monorepo in one command',
      description: (
        <>
          Scaffolds write the workspace layout, presets, and config for you,
          install the dependencies, and tell you what to run next.
        </>
      ),
      linkTo: '/docs/cli/scaffolding/starter/base/',
      linkLabel: 'Scaffold a Starter',
      alt: 'Scaffolding a base monorepo with the Nova CLI',
      terminalTitle: 'projects — nova scaffold starter base — 80×24',
      output: [
        '╭────────────────────────────────────────────────╮',
        '│                      Nova                      │',
        '│          CLI for the Common Developer          │',
        '╰────────────────────────────────────────────────╯',
        '',
        'CURRENTLY RUNNING: nova scaffold starter base',
        '',
        '✔ Project name (slug): … my-project',
        '',
        'Nova × Base Monorepo',
        '',
        '  Mode          New monorepo',
        '  Project       my-project',
        '  Destination   my-project',
        '  Dependencies  Install with npm',
        '',
        '✔ Create this scaffold? … yes',
        '✔ [████████████████████] 2/2 Base Monorepo scaffold ready',
        '',
        'Next:',
        '  1. cd "my-project"',
        '  2. nova utility configure',
        '  3. npm run check',
      ].join('\n'),
    },
    {
      key: 'changelog',
      label: 'Changelog',
      heading: 'Changelogs without the busywork',
      description: (
        <>
          Record each change as you go, then fold or release them into
          versioned changelog sections with one command.
        </>
      ),
      linkTo: '/docs/cli/utilities/changelog/',
      linkLabel: 'Record a Change',
      alt: 'Recording a changelog entry with the Nova CLI',
      terminalTitle: 'my-project — nova utility changelog — 80×24',
      output: [
        '╭────────────────────────────────────────────────╮',
        '│                      Nova                      │',
        '│          CLI for the Common Developer          │',
        '╰────────────────────────────────────────────────╯',
        '',
        'CURRENTLY RUNNING: nova utility changelog --record',
        '',
        '✔ Select a package. › my-project',
        '✔ Select a category. › Added',
        '✔ Describe the change. … Dark mode follows the system setting.',
        '✔ Select version bump type. › Minor',
        '',
        'INFO Recorded change to "my-project/.changelog/quiet-lamps-shine.md".',
      ].join('\n'),
    },
    {
      key: 'generators',
      label: 'Generators',
      heading: 'The files every repo needs',
      description: (
        <>
          Generate agent conventions, a
          {' '}
          <code>.env</code>
          , an
          {' '}
          <code>.editorconfig</code>
          , ignore files, a license, and a README, each with a short alias
          and its own help menu.
        </>
      ),
      linkTo: '/docs/cli/',
      linkLabel: 'Read the CLI Reference',
      alt: 'The Nova must-haves generator help menu',
      terminalTitle: 'my-project — nova generate must-haves --help — 80×24',
      output: [
        'Nova',
        'CLI for the Common Developer',
        'Usage: nova generate must-haves <subcommand> [options]',
        '       nova gen must <subcommand> [options]',
        '',
        'Options:',
        '  -h, --help                         Display the help menu',
        '',
        'Subcommands:',
        '  agent-conventions|agent [options]  Create agent convention files for coding',
        '                                     assistants',
        '  dotenv|env [options]               Create a .env file for managing local',
        '                                     environment secrets',
        '  editorconfig [options]             Create a .editorconfig file for consistent',
        '                                     coding styles',
        '  ignore-files [options]             Create configured physical ignore files',
        '                                     from Nova bundles',
        '  license|lic [options]              Create a LICENSE file for project license',
        '                                     agreements',
        '  read-me|read [options]             Create a baseline README.md file for your',
        '                                     project',
      ].join('\n'),
    },
  ];

  const configSnippets: PagesConfigSnippets = [
    {
      content: [
        '// .eslintrc.json',
        '{',
        '  "extends": "next/core-web-vitals",',
        '  "rules": { "semi": "error" }',
        '}',
      ].join('\n'),
      style: {
        top: '6%',
        left: '5%',
        transform: 'rotate(-2deg)',
      },
    },
    {
      content: [
        '// tsconfig.json',
        '{',
        '  "compilerOptions": {',
        '    "target": "ES2022",',
        '    "strict": true',
        '  }',
        '}',
      ].join('\n'),
      style: {
        top: '4%',
        left: '50%',
        transform: 'rotate(1.5deg)',
      },
    },
    {
      content: [
        '// .prettierrc',
        '{',
        '  "semi": true,',
        '  "singleQuote": true,',
        '  "tabWidth": 2,',
        '  "trailingComma": "all"',
        '}',
      ].join('\n'),
      style: {
        top: '30%',
        left: '12%',
        transform: 'rotate(-1deg)',
      },
    },
    {
      content: [
        '// jest.config.js',
        'module.exports = {',
        '  preset: \'ts-jest\',',
        '  testEnvironment: \'node\'',
        '};',
      ].join('\n'),
      style: {
        top: '35%',
        left: '54%',
        transform: 'rotate(2deg)',
      },
    },
    {
      content: [
        '// .env.local',
        'API_KEY=sk_live_xxxx',
        'DATABASE_URL=postgres://',
        'REDIS_HOST=127.0.0.1',
        'NODE_ENV=production',
      ].join('\n'),
      style: {
        top: '56%',
        left: '6%',
        transform: 'rotate(1deg)',
      },
    },
    {
      content: [
        '// .lintstagedrc',
        '{',
        '  "*.{ts,tsx}": "eslint --fix",',
        '  "*.css": "prettier --write"',
        '}',
      ].join('\n'),
      style: {
        top: '62%',
        left: '46%',
        transform: 'rotate(-1.5deg)',
      },
    },
    {
      content: [
        '// commitlint.config.js',
        'module.exports = {',
        '  extends: [\'@commitlint/conventional\'],',
        '  rules: {}',
        '};',
      ].join('\n'),
      style: {
        top: '80%',
        left: '20%',
        transform: 'rotate(0.5deg)',
      },
    },
    {
      content: [
        '// ci.yml',
        'name: CI',
        'on: [push, pull_request]',
        'jobs:',
        '  build:',
      ].join('\n'),
      style: {
        top: '76%',
        left: '58%',
        transform: 'rotate(-2.5deg)',
      },
    },
  ];

  /**
   * Pages - Home - Blog Posts.
   *
   * Curated entries displayed in the blog preview strip
   * at the bottom of the landing page.
   *
   * @since 0.15.0
   */
  return (
    <Layout description={siteConfig.tagline}>
      <Head>
        <title>Nova - Your Config Is Technical Debt</title>
      </Head>
      <Canvas container="full" className={styles['hero']}>
        <div className={styles['heroInner']}>
          <div className={styles['heroContent']}>
            <p className="nova-hero-eyebrow">Developer Toolkit</p>
            <Heading as="h1" className={`nova-hero-heading ${styles['heroHeading']}`}>
              <Typewriter>
                <Typewriter.Prefix>
                  Your config is
                  <br />
                </Typewriter.Prefix>
                <Typewriter.Word>technical debt.</Typewriter.Word>
                <Typewriter.Word>a liability.</Typewriter.Word>
                <Typewriter.Word>slowing you down.</Typewriter.Word>
                <Typewriter.Word>yesterday&apos;s problem.</Typewriter.Word>
              </Typewriter>
            </Heading>
            <p className="nova-hero-tagline">
              Every hand-wired ESLint rule, every copied TSConfig, every scaffold you&apos;ll forget to update. Nova replaces all of it with one opinionated package.
            </p>
            <div className={`nova-hero-actions ${styles['heroActions']}`}>
              <Link className="nova-cta-primary" to="/docs/quickstart/setup/">Get Started</Link>
              <Link className="nova-cta-secondary" to="/docs/quickstart/">Learn More</Link>
            </div>
          </div>
          <div className={styles['heroConfigs']} aria-hidden="true">
            {configSnippets.map((snippet, index) => (
              <div key={index} className={styles['configSnippet']} style={snippet['style']}>
                {snippet['content']}
              </div>
            ))}
          </div>
        </div>
      </Canvas>
      <main>
        <InstallStrip command="npm install -g @cbnventures/nova" copyTarget="block" />
        <Features items={featureItems} />
        <Spotlight heading="A closer look" surface="alt">
          <Showcase
            tabsLabel="Nova CLI views"
            items={shots.map((shot) => ({
              label: shot['label'],
              heading: shot['heading'],
              description: shot['description'],
              link: {
                label: shot['linkLabel'],
                to: shot['linkTo'],
              },
              content: (
                <TerminalFrame title={shot['terminalTitle']} label={shot['alt']}>
                  {shot['output'].split('\n').map((line, index) => (
                    <span key={`${shot['key']}-${String(index)}`} className={styles[terminalLineTone(line)]}>
                      {(line === '') ? ' ' : line}
                    </span>
                  ))}
                </TerminalFrame>
              ),
            }))}
          />
        </Spotlight>
        <BlogPreview
          heading="From the Blog"
          description="Launches, milestones, and what's new in Nova."
          auto={true}
          limit={3}
          sort="newest"
        />
      </main>
    </Layout>
  );
}

export default Home;
