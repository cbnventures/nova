import {
  BlogPreview,
  Canvas,
  Features,
  InstallStrip,
  Stats,
  Typewriter,
} from '@cbnventures/docusaurus-preset-nova/blocks';
import Head from '@docusaurus/Head';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Heading from '@theme/Heading';
import Layout from '@theme/Layout';

import styles from './index.module.css';

import type {
  PagesConfigSnippets,
  PagesContext,
  PagesCustomFields,
  PagesFeatureItems,
  PagesIncludedItems,
  PagesSiteConfig,
  PagesStatItems,
} from '@site/src/types/pages/index.d.ts';

/**
 * Pages - Home.
 *
 * Root landing page that composes the hero header, install strip, feature grid,
 * stats, and blog preview using theme components.
 *
 * @constructor
 *
 * @since 0.11.0
 */
function Home() {
  const context: PagesContext = useDocusaurusContext();
  const siteConfig: PagesSiteConfig = context.siteConfig;
  const customFields: PagesCustomFields = siteConfig.customFields as PagesCustomFields;
  const statItems: PagesStatItems = customFields['statItems'];

  /**
   * Pages - Home - Feature Items.
   *
   * Hero-adjacent cards that highlight why Nova exists - config
   * fatigue, strict defaults, and shipping faster.
   *
   * @since 0.15.0
   */
  const featureItems: PagesFeatureItems = [
    {
      icon: 'lucide:package',
      title: 'One Package. Generate and Go.',
      description: 'ESLint presets, TypeScript configs, scaffolds, and maintenance recipes. One install. Generate. Ship.',
    },
    {
      icon: 'lucide:shield-check',
      title: 'Locked Down Until You Say Otherwise',
      description: 'Every preset ships strict. Override what you need — everything else stays enforced. No surprises.',
    },
    {
      icon: 'lucide:rocket',
      title: 'Focus on Your Project. Not the Plumbing.',
      description: 'Generators scaffold. Recipes sync. Utilities diagnose. Nova handles the infrastructure you\'d rather not think about.',
    },
  ];

  /**
   * Pages - Home - Included Items.
   *
   * Secondary feature cards that detail the concrete capabilities
   * bundled with Nova - presets, generators, toolkit, and more.
   *
   * @since 0.15.0
   */
  const includedItems: PagesIncludedItems = [
    {
      icon: 'lucide:layers',
      title: 'Presets That Stack',
      description: 'ESLint and TSConfig layers in a defined order — language, environment, framework, platform. Custom rules enforce the rest.',
    },
    {
      icon: 'lucide:file-plus',
      title: 'Generate It. Forget It.',
      description: (
        <>
          {'Licenses, '}
          <code>.env</code>
          {', '}
          <code>.gitignore</code>
          , workflows, agent conventions — generated from the CLI. Recipes normalize and sync workspace files automatically.
        </>
      ),
    },
    {
      icon: 'lucide:wrench',
      title: 'Batteries You Actually Use',
      description: 'Structured logging, CLI headers, markdown tables, environment bootstrapping. Small modules. Import what you need.',
    },
    {
      icon: 'lucide:palette',
      title: 'Docs Site in a Preset',
      description: 'Color tokens, navbar, footer, search, analytics, progress bar. One config. No manual theme wiring.',
    },
    {
      icon: 'lucide:layout-grid',
      title: 'Every Workspace Has a Role',
      description: 'App, package, docs, tool — each workspace knows what it is and how it ships. No ambiguity.',
    },
    {
      icon: 'lucide:bot',
      title: 'Your AI Agents Follow Rules Too',
      description: 'Generate convention files for Claude Code, Codex, and other agents. Project rules, coding standards, directives — from the CLI.',
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
              <Link className="nova-cta-primary" to="/docs/quickstart/">Get Started</Link>
              <Link className="nova-cta-secondary" to="https://github.com/cbnventures/nova">View on GitHub</Link>
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
        <Features heading="What's Inside" items={includedItems} />
        <Stats heading="The Receipts" items={statItems} />
        <BlogPreview
          heading="From the Blog"
          description="Release notes, tooling insights, and automation patterns for JavaScript and TypeScript monorepos."
          auto={true}
          limit={3}
        />
      </main>
    </Layout>
  );
}

export default Home;
