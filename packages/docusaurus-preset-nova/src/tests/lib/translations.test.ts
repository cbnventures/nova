import {
  deepStrictEqual,
  notStrictEqual,
  ok,
  strictEqual,
} from 'node:assert/strict';

import { describe, it } from 'vitest';

import { Runner as Translations } from '../../lib/translations.js';

import type {
  Tests_Lib_Translations_ApplyResult,
  Tests_Lib_Translations_ApplyThemeConfig,
  Tests_Lib_Translations_ExtractResult,
} from '../../types/tests/lib/translations.test.d.ts';

/**
 * Tests - Lib - Translations - Extract.
 *
 * @since 0.18.0
 */
describe('Translations.extract', async () => {
  it('returns an empty array when themeConfig is empty', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({ themeConfig: {} });

    deepStrictEqual(result, []);

    return;
  });

  it('returns an empty array when no translatable areas are populated', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        colorMode: { defaultMode: 'system' },
      },
    });

    deepStrictEqual(result, []);

    return;
  });

  it('extracts navbar item labels into a navbar file', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        navbar: {
          items: [
            {
              label: 'Docs', to: '/docs/',
            },
            {
              label: 'Blog', to: '/blog/',
            },
          ],
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'navbar',
      content: {
        'item.0.label': {
          message: 'Docs', description: 'Label of navbar item 1',
        },
        'item.1.label': {
          message: 'Blog', description: 'Label of navbar item 2',
        },
      },
    }]);

    return;
  });

  it('extracts nested dropdown child labels', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        navbar: {
          items: [
            {
              label: 'Docs', to: '/docs/',
            },
            {
              label: 'Resources',
              type: 'dropdown',
              items: [
                {
                  label: 'Guide', to: '/guide/',
                },
                {
                  label: 'Reference', to: '/ref/',
                },
              ],
            },
          ],
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'navbar',
      content: {
        'item.0.label': {
          message: 'Docs', description: 'Label of navbar item 1',
        },
        'item.1.label': {
          message: 'Resources', description: 'Label of navbar item 2',
        },
        'item.1.items.0.label': {
          message: 'Guide', description: 'Label of dropdown child 1 under navbar item 2',
        },
        'item.1.items.1.label': {
          message: 'Reference', description: 'Label of dropdown child 2 under navbar item 2',
        },
      },
    }]);

    return;
  });

  it('skips navbar items that have no label (e.g., localeDropdown)', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        navbar: {
          items: [
            {
              label: 'Docs', to: '/docs/',
            },
            {
              type: 'localeDropdown', position: 'right',
            },
          ],
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'navbar',
      content: {
        'item.0.label': {
          message: 'Docs', description: 'Label of navbar item 1',
        },
      },
    }]);

    return;
  });

  it('skips navbar entirely when no item has a label', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        navbar: {
          items: [{
            type: 'localeDropdown', position: 'right',
          }],
        },
      },
    });

    deepStrictEqual(result, []);

    return;
  });

  it('extracts blog layout heading and description', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        blog: {
          layout: {
            heading: 'Our Blog',
            description: 'Updates from the team',
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'blog',
      content: {
        'layout.heading': {
          message: 'Our Blog', description: 'The blog list page heading',
        },
        'layout.description': {
          message: 'Updates from the team', description: 'The blog list page description below the heading',
        },
      },
    }]);

    return;
  });

  it('skips blog when layout is missing', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        blog: {
          sidebar: { groupByYear: true },
        },
      },
    });

    deepStrictEqual(result, []);

    return;
  });

  it('extracts announcement bar content', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        announcementBar: {
          id: 'banner-1',
          content: 'Black Friday sale!',
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'announcementBar',
      content: {
        content: {
          message: 'Black Friday sale!', description: 'The announcement bar content (may contain HTML)',
        },
      },
    }]);

    return;
  });

  it('preserves HTML in announcement bar content as-is', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        announcementBar: {
          id: 'banner-1',
          content: 'Read our <a href="/blog/">latest post</a>',
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'announcementBar',
      content: {
        content: {
          message: 'Read our <a href="/blog/">latest post</a>', description: 'The announcement bar content (may contain HTML)',
        },
      },
    }]);

    return;
  });

  it('extracts errorPages.notFound title, description, and backHomeLabel', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        errorPages: {
          notFound: {
            title: 'Lost in deployment.',
            description: 'This route did not roll out.',
            backHomeLabel: 'Back to projects',
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'errorPages',
      content: {
        'notFound.title': {
          message: 'Lost in deployment.',
          description: 'The 404 page heading set by the consumer in themeConfig.errorPages.notFound.title',
        },
        'notFound.description': {
          message: 'This route did not roll out.',
          description: 'The 404 page description set by the consumer in themeConfig.errorPages.notFound.description',
        },
        'notFound.backHomeLabel': {
          message: 'Back to projects',
          description: 'The 404 page "Back to home" CTA label set by the consumer in themeConfig.errorPages.notFound.backHomeLabel',
        },
      },
    }]);

    return;
  });

  it('extracts errorPages.errorPageContent title and retryLabel', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        errorPages: {
          errorPageContent: {
            title: 'Pipeline interrupted.',
            retryLabel: 'Re-run',
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'errorPages',
      content: {
        'errorPageContent.title': {
          message: 'Pipeline interrupted.',
          description: 'The per-page crash heading set by the consumer in themeConfig.errorPages.errorPageContent.title',
        },
        'errorPageContent.retryLabel': {
          message: 'Re-run',
          description: 'The per-page crash retry button label set by the consumer in themeConfig.errorPages.errorPageContent.retryLabel',
        },
      },
    }]);

    return;
  });

  it('extracts errorPages.error retryLabel', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        errorPages: {
          error: { retryLabel: 'Restart' },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'errorPages',
      content: {
        'error.retryLabel': {
          message: 'Restart',
          description: 'The top-level error boundary retry button label set by the consumer in themeConfig.errorPages.error.retryLabel',
        },
      },
    }]);

    return;
  });

  it('skips errorPages when no override fields are populated', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        errorPages: {
          notFound: {},
          errorPageContent: {},
          error: {},
        },
      },
    });

    deepStrictEqual(result, []);

    return;
  });

  it('extracts footer layout slot titles', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: {
          layout: {
            company: {
              title: 'Company', section: 'company',
            },
            legal: {
              title: 'Legal', section: 'legal',
            },
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'footer',
      content: {
        'layout.company.title': {
          message: 'Company', description: 'Title of footer column "company"',
        },
        'layout.legal.title': {
          message: 'Legal', description: 'Title of footer column "legal"',
        },
      },
    }]);

    return;
  });

  it('extracts footer section link labels', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: {
          sections: {
            legal: [
              {
                label: 'Terms of Use', href: '/terms/',
              },
              {
                label: 'Privacy Policy', href: '/privacy/',
              },
            ],
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'footer',
      content: {
        'sections.legal.0.label': {
          message: 'Terms of Use', description: 'Label of link 1 in footer section "legal"',
        },
        'sections.legal.1.label': {
          message: 'Privacy Policy', description: 'Label of link 2 in footer section "legal"',
        },
      },
    }]);

    return;
  });

  it('extracts footer copyright', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: {
          copyright: 'Copyright 2025 Acme LLC.',
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'footer',
      content: {
        copyright: {
          message: 'Copyright 2025 Acme LLC.', description: 'The footer copyright text',
        },
      },
    }]);

    return;
  });

  it('extracts footer cta as a bare string', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: {
          cta: 'Ready to deploy?',
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'footer',
      content: {
        cta: {
          message: 'Ready to deploy?', description: 'The footer call-to-action text',
        },
      },
    }]);

    return;
  });

  it('extracts footer cta label when cta is an object', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: {
          cta: {
            label: 'Get started',
            href: 'https://example.com',
          },
        },
      },
    });

    deepStrictEqual(result, [{
      path: 'footer',
      content: {
        'cta.label': {
          message: 'Get started', description: 'The footer call-to-action link label',
        },
      },
    }]);

    return;
  });

  it('skips footer entirely when set to false', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        footer: false,
      },
    });

    deepStrictEqual(result, []);

    return;
  });

  it('returns one file per populated area when all five are present', () => {
    const result: Tests_Lib_Translations_ExtractResult = Translations.extract({
      themeConfig: {
        navbar: { items: [{ label: 'Docs' }] },
        announcementBar: {
          id: 'b', content: 'Hi',
        },
        footer: { copyright: '2025' },
        blog: { layout: { heading: 'Blog' } },
        errorPages: {
          notFound: { title: 'Lost.' },
        },
      },
    });

    strictEqual(result.length, 5);
    ok(result.find((file) => file['path'] === 'navbar') !== undefined);
    ok(result.find((file) => file['path'] === 'blog') !== undefined);
    ok(result.find((file) => file['path'] === 'announcementBar') !== undefined);
    ok(result.find((file) => file['path'] === 'errorPages') !== undefined);
    ok(result.find((file) => file['path'] === 'footer') !== undefined);

    return;
  });

  return;
});

/**
 * Tests - Lib - Translations - Apply.
 *
 * @since 0.18.0
 */
describe('Translations.apply', async () => {
  it('returns themeConfig unchanged when translationFiles is empty', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        navbar: { items: [{ label: 'Docs' }] },
      },
      translationFiles: [],
    });

    deepStrictEqual(result, {
      navbar: { items: [{ label: 'Docs' }] },
    });

    return;
  });

  it('does not mutate the input themeConfig', () => {
    const themeConfig: Tests_Lib_Translations_ApplyThemeConfig = {
      navbar: { items: [{ label: 'Docs' }] },
    };

    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig,
      translationFiles: [{
        path: 'navbar',
        content: {
          'item.0.label': { message: '文档' },
        },
      }],
    });

    notStrictEqual(result, themeConfig);
    deepStrictEqual(themeConfig, {
      navbar: { items: [{ label: 'Docs' }] },
    });
    deepStrictEqual(result, {
      navbar: { items: [{ label: '文档' }] },
    });

    return;
  });

  it('applies navbar item label translations', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        navbar: {
          items: [
            {
              label: 'Docs', to: '/docs/',
            },
            {
              label: 'Blog', to: '/blog/',
            },
          ],
        },
      },
      translationFiles: [{
        path: 'navbar',
        content: {
          'item.0.label': { message: '文档' },
          'item.1.label': { message: '博客' },
        },
      }],
    });

    deepStrictEqual(result, {
      navbar: {
        items: [
          {
            label: '文档', to: '/docs/',
          },
          {
            label: '博客', to: '/blog/',
          },
        ],
      },
    });

    return;
  });

  it('falls back to source string when translation key is missing', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        navbar: {
          items: [
            {
              label: 'Docs', to: '/docs/',
            },
            {
              label: 'Blog', to: '/blog/',
            },
          ],
        },
      },
      translationFiles: [{
        path: 'navbar',
        content: {
          'item.0.label': { message: '文档' },
        },
      }],
    });

    deepStrictEqual(result, {
      navbar: {
        items: [
          {
            label: '文档', to: '/docs/',
          },
          {
            label: 'Blog', to: '/blog/',
          },
        ],
      },
    });

    return;
  });

  it('applies nested dropdown child label translations', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        navbar: {
          items: [{
            label: 'Resources',
            type: 'dropdown',
            items: [{
              label: 'Guide', to: '/guide/',
            }],
          }],
        },
      },
      translationFiles: [{
        path: 'navbar',
        content: {
          'item.0.label': { message: '资源' },
          'item.0.items.0.label': { message: '指南' },
        },
      }],
    });

    deepStrictEqual(result, {
      navbar: {
        items: [{
          label: '资源',
          type: 'dropdown',
          items: [{
            label: '指南', to: '/guide/',
          }],
        }],
      },
    });

    return;
  });

  it('applies blog layout heading and description', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        blog: {
          layout: {
            heading: 'Our Blog',
            description: 'Updates from the team',
          },
        },
      },
      translationFiles: [{
        path: 'blog',
        content: {
          'layout.heading': { message: '博客' },
          'layout.description': { message: '团队更新' },
        },
      }],
    });

    deepStrictEqual(result, {
      blog: {
        layout: {
          heading: '博客',
          description: '团队更新',
        },
      },
    });

    return;
  });

  it('applies announcement bar content translation', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        announcementBar: {
          id: 'b',
          content: 'Sale',
        },
      },
      translationFiles: [{
        path: 'announcementBar',
        content: {
          content: { message: '促销' },
        },
      }],
    });

    deepStrictEqual(result, {
      announcementBar: {
        id: 'b',
        content: '促销',
      },
    });

    return;
  });

  it('applies errorPages.notFound title, description, and backHomeLabel', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        errorPages: {
          notFound: {
            title: 'Lost in deployment.',
            description: 'This route did not roll out.',
            backHomeLabel: 'Back to projects',
          },
        },
      },
      translationFiles: [{
        path: 'errorPages',
        content: {
          'notFound.title': { message: '部署中迷失。' },
          'notFound.description': { message: '此路由未发布。' },
          'notFound.backHomeLabel': { message: '返回项目' },
        },
      }],
    });

    deepStrictEqual(result, {
      errorPages: {
        notFound: {
          title: '部署中迷失。',
          description: '此路由未发布。',
          backHomeLabel: '返回项目',
        },
      },
    });

    return;
  });

  it('applies errorPages.errorPageContent title and retryLabel', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        errorPages: {
          errorPageContent: {
            title: 'Pipeline interrupted.',
            retryLabel: 'Re-run',
          },
        },
      },
      translationFiles: [{
        path: 'errorPages',
        content: {
          'errorPageContent.title': { message: '管线中断。' },
          'errorPageContent.retryLabel': { message: '重新运行' },
        },
      }],
    });

    deepStrictEqual(result, {
      errorPages: {
        errorPageContent: {
          title: '管线中断。',
          retryLabel: '重新运行',
        },
      },
    });

    return;
  });

  it('applies errorPages.error retryLabel', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        errorPages: {
          error: { retryLabel: 'Restart' },
        },
      },
      translationFiles: [{
        path: 'errorPages',
        content: {
          'error.retryLabel': { message: '重启' },
        },
      }],
    });

    deepStrictEqual(result, {
      errorPages: {
        error: { retryLabel: '重启' },
      },
    });

    return;
  });

  it('falls back to source string when an errorPages translation key is missing', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        errorPages: {
          notFound: {
            title: 'Lost in deployment.',
            description: 'This route did not roll out.',
            backHomeLabel: 'Back to projects',
          },
        },
      },
      translationFiles: [{
        path: 'errorPages',
        content: {
          'notFound.title': { message: '部署中迷失。' },
        },
      }],
    });

    deepStrictEqual(result, {
      errorPages: {
        notFound: {
          title: '部署中迷失。',
          description: 'This route did not roll out.',
          backHomeLabel: 'Back to projects',
        },
      },
    });

    return;
  });

  it('applies footer layout titles, section labels, and copyright', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        footer: {
          layout: {
            legal: {
              title: 'Legal', section: 'legal',
            },
          },
          sections: {
            legal: [{
              label: 'Terms', href: '/terms/',
            }],
          },
          copyright: 'Copyright 2025',
        },
      },
      translationFiles: [{
        path: 'footer',
        content: {
          'layout.legal.title': { message: '法律' },
          'sections.legal.0.label': { message: '条款' },
          'copyright': { message: '版权 2025' },
        },
      }],
    });

    deepStrictEqual(result, {
      footer: {
        layout: {
          legal: {
            title: '法律', section: 'legal',
          },
        },
        sections: {
          legal: [{
            label: '条款', href: '/terms/',
          }],
        },
        copyright: '版权 2025',
      },
    });

    return;
  });

  it('applies footer cta translation when cta is a bare string', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        footer: {
          cta: 'Ready to deploy?',
        },
      },
      translationFiles: [{
        path: 'footer',
        content: {
          cta: { message: '准备部署？' },
        },
      }],
    });

    deepStrictEqual(result, {
      footer: {
        cta: '准备部署？',
      },
    });

    return;
  });

  it('applies footer cta.label translation when cta is an object', () => {
    const result: Tests_Lib_Translations_ApplyResult = Translations.apply({
      themeConfig: {
        footer: {
          cta: {
            label: 'Get started', href: 'https://example.com',
          },
        },
      },
      translationFiles: [{
        path: 'footer',
        content: {
          'cta.label': { message: '开始使用' },
        },
      }],
    });

    deepStrictEqual(result, {
      footer: {
        cta: {
          label: '开始使用', href: 'https://example.com',
        },
      },
    });

    return;
  });

  return;
});
