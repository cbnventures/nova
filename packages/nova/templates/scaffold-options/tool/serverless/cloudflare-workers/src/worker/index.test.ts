import {
  describe,
  expect,
  it,
} from 'vitest';

import handler from './index.js';
import { landingPage } from './landing-page.js';

import type {
  Worker_IndexTest_WorkerHandler_EscapesProjectNamesBeforeRendering_Html,
  Worker_IndexTest_WorkerHandler_EscapesProjectNamesBeforeRendering_Response,
  Worker_IndexTest_WorkerHandler_OmitsTheRepositoryButtonWithoutARepository_Html,
  Worker_IndexTest_WorkerHandler_OmitsTheRepositoryButtonWithoutARepository_Response,
  Worker_IndexTest_WorkerHandler_ReturnsHeadersForHEADRequests_Response,
  Worker_IndexTest_WorkerHandler_ReturnsJsonForUnknownPaths_Response,
  Worker_IndexTest_WorkerHandler_ReturnsJsonForUnsupportedRootMethods_Response,
  Worker_IndexTest_WorkerHandler_ReturnsTheHomepage_Html,
  Worker_IndexTest_WorkerHandler_ReturnsTheHomepage_Response,
} from '../types/worker/index.test.d.ts';

describe('Worker handler', () => {
  it('returns the homepage', async () => {
    const response: Worker_IndexTest_WorkerHandler_ReturnsTheHomepage_Response = await handler.fetch(new Request('https://example.com/'));
    const html: Worker_IndexTest_WorkerHandler_ReturnsTheHomepage_Html = await response.text();

    expect(response.status).toBe(200);

    expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');

    expect(response.headers.get('Content-Security-Policy')).toContain('frame-ancestors \'none\'');

    expect(response.headers.get('Permissions-Policy')).toBe('camera=(), geolocation=(), microphone=()');

    expect(response.headers.get('Referrer-Policy')).toBe('no-referrer');

    expect(response.headers.get('X-Content-Type-Options')).toBe('nosniff');

    expect(response.headers.get('X-Frame-Options')).toBe('DENY');

    expect(html).toContain('<title>[__PROJECT_SLUG__]</title>');

    expect(html).toContain('Your Worker is running. Edit src/worker/index.ts to make it yours.');

    expect(html).toContain('>Running</span>');

    expect(html).toContain('https://nova.cbnventures.io/docs/quickstart/');

    expect(html).toContain('class="button ghost" href="[__PROJECT_REPOSITORY__]" target="_blank" rel="noopener noreferrer"');

    expect(html).toContain('aria-hidden="true"');

    expect(html).toContain('>GitHub</a>');

    expect(html).toContain('A CBN Ventures project');

    return;
  });

  it('returns headers for HEAD requests', async () => {
    const response: Worker_IndexTest_WorkerHandler_ReturnsHeadersForHEADRequests_Response = await handler.fetch(new Request('https://example.com/', {
      method: 'HEAD',
    }));

    expect(response.status).toBe(200);

    expect(response.headers.get('Content-Type')).toBe('text/html; charset=utf-8');

    expect(await response.text()).toBe('');

    return;
  });

  it('returns JSON for unsupported root methods', async () => {
    const response: Worker_IndexTest_WorkerHandler_ReturnsJsonForUnsupportedRootMethods_Response = await handler.fetch(new Request('https://example.com/', {
      method: 'POST',
    }));

    expect(response.status).toBe(405);

    expect(response.headers.get('Allow')).toBe('GET, HEAD');

    expect(response.headers.get('Content-Type')).toContain('application/json');

    expect(await response.json()).toEqual({
      status: 'error',
      message: 'Method not allowed',
    });

    return;
  });

  it('returns JSON for unknown paths', async () => {
    const response: Worker_IndexTest_WorkerHandler_ReturnsJsonForUnknownPaths_Response = await handler.fetch(new Request('https://example.com/missing'));

    expect(response.status).toBe(404);

    expect(response.headers.get('Content-Type')).toContain('application/json');

    expect(await response.json()).toEqual({
      status: 'error',
      message: 'Not found',
    });

    return;
  });

  it('escapes project names before rendering', async () => {
    const response: Worker_IndexTest_WorkerHandler_EscapesProjectNamesBeforeRendering_Response = landingPage(
      '<script>alert("unsafe")</script>',
      'https://example.com/?query="<unsafe>"',
    );
    const html: Worker_IndexTest_WorkerHandler_EscapesProjectNamesBeforeRendering_Html = await response.text();

    expect(html).toContain('&lt;script&gt;alert(&quot;unsafe&quot;)&lt;/script&gt;');

    expect(html).not.toContain('<script>alert("unsafe")</script>');

    expect(html).toContain('href="https://example.com/?query=&quot;&lt;unsafe&gt;&quot;"');

    expect(html).not.toContain('href="https://example.com/?query="<unsafe>""');

    return;
  });

  it('omits the repository button without a repository', async () => {
    const response: Worker_IndexTest_WorkerHandler_OmitsTheRepositoryButtonWithoutARepository_Response = landingPage('example');
    const html: Worker_IndexTest_WorkerHandler_OmitsTheRepositoryButtonWithoutARepository_Html = await response.text();

    expect(html).toContain('>Documentation</a>');

    expect(html).not.toContain('>GitHub</a>');

    return;
  });

  return;
});
