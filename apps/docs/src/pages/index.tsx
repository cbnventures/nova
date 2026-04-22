import {
  BlogPreview,
  Features,
  Hero,
  InstallStrip,
  Stats,
  Typewriter,
} from '@cbnventures/docusaurus-preset-nova/components';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';

import type {
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
   * Hero-adjacent cards that highlight why Nova exists — config
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
   * bundled with Nova — presets, generators, toolkit, and more.
   *
   * @since 0.15.0
   */
  const includedItems: PagesIncludedItems = [
    {
      icon: 'lucide:layers',
      title: 'Presets That Stack',
      description: 'ESLint and TSConfig layers in a defined order — language, environment, framework, platform. 50+ custom rules enforce the rest.',
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
      description: 'Generate convention files for Claude Code, Cursor, and other agents. Project rules, coding standards, directives — from the CLI.',
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
      <Hero
        eyebrow="ESM and Beyond"
        heading={(
          <Typewriter>
            <Typewriter.Prefix>Your config is </Typewriter.Prefix>
            <Typewriter.Word>technical debt.</Typewriter.Word>
            <Typewriter.Word>a liability.</Typewriter.Word>
            <Typewriter.Word>slowing you down.</Typewriter.Word>
            <Typewriter.Word>yesterday&apos;s problem.</Typewriter.Word>
          </Typewriter>
        )}
        tagline="Every hand-wired ESLint rule, every copied TSConfig, every scaffold you'll forget to update. Nova replaces all of it with one opinionated package."
        ctaLabel="Get Started"
        ctaLink="/docs/quickstart/"
        secondaryCtaLabel="View on GitHub"
        secondaryCtaLink="https://github.com/cbnventures/nova"
      />
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
