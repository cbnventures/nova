import Head from '@docusaurus/Head';
import { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';

import { useSearchHighlight } from '../../lib/search/use-search-highlight.js';
import { useSearchWorker } from '../../lib/search/use-search-worker.js';

import type {
  ThemeSearchPageSearchPageBaseUrl,
  ThemeSearchPageSearchPageDebounceTimerRef,
  ThemeSearchPageSearchPageDocusaurusContext,
  ThemeSearchPageSearchPageHandleInputChangeFunction,
  ThemeSearchPageSearchPageInitialQuery,
  ThemeSearchPageSearchPageInputChangeEvent,
  ThemeSearchPageSearchPageInputValue,
  ThemeSearchPageSearchPageLoading,
  ThemeSearchPageSearchPageManifestUrl,
  ThemeSearchPageSearchPageNewUrl,
  ThemeSearchPageSearchPageNoResults,
  ThemeSearchPageSearchPageProps,
  ThemeSearchPageSearchPageQuery,
  ThemeSearchPageSearchPageQueryState,
  ThemeSearchPageSearchPageResultItem,
  ThemeSearchPageSearchPageResultUrl,
  ThemeSearchPageSearchPageSearchParams,
  ThemeSearchPageSearchPageSearchWorker,
  ThemeSearchPageSearchPageSetQuery,
  ThemeSearchPageSearchPageTitle,
  ThemeSearchPageSearchPageWorkerUrl,
} from '../../types/theme/SearchPage/index.d.ts';

/**
 * Theme - Search Page - Search Page.
 *
 * Full-page search interface wrapped in the site Layout that reads the initial
 * query from the URL, dispatches debounced searches to the worker thread,
 * displays result links with snippet previews, and activates term highlighting.
 *
 * @param {ThemeSearchPageSearchPageProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchPage(_props: ThemeSearchPageSearchPageProps) {
  const docusaurusContext: ThemeSearchPageSearchPageDocusaurusContext = useDocusaurusContext();
  const baseUrl: ThemeSearchPageSearchPageBaseUrl = docusaurusContext['siteConfig']['baseUrl'];

  const workerUrl: ThemeSearchPageSearchPageWorkerUrl = `${baseUrl}search-worker.js`;
  const manifestUrl: ThemeSearchPageSearchPageManifestUrl = `${baseUrl}search-manifest.json`;

  const searchWorker: ThemeSearchPageSearchPageSearchWorker = useSearchWorker({
    workerUrl, manifestUrl,
  });

  const searchParams: ThemeSearchPageSearchPageSearchParams = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialQuery: ThemeSearchPageSearchPageInitialQuery = searchParams.get('q') ?? '';

  const queryState: ThemeSearchPageSearchPageQueryState = useState<ThemeSearchPageSearchPageQuery>(initialQuery);
  const query: ThemeSearchPageSearchPageQuery = queryState[0];
  const setQuery: ThemeSearchPageSearchPageSetQuery = queryState[1];

  const debounceTimerRef: ThemeSearchPageSearchPageDebounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useSearchHighlight({ enabled: true });

  // Trigger search when worker becomes ready and query is pre-filled.
  useEffect(() => {
    if (searchWorker['isReady'] === true && query !== '') {
      searchWorker.search(query);
    }

    return;
  }, [searchWorker['isReady']]);

  // Debounced search and URL update on input change.
  const handleInputChange: ThemeSearchPageSearchPageHandleInputChangeFunction = useCallback((event: ThemeSearchPageSearchPageInputChangeEvent) => {
    const inputValue: ThemeSearchPageSearchPageInputValue = event.target.value;

    setQuery(inputValue);

    if (debounceTimerRef.current !== undefined) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (inputValue !== '') {
        searchWorker.search(inputValue);

        const newUrl: ThemeSearchPageSearchPageNewUrl = `${window.location.pathname}?q=${encodeURIComponent(inputValue)}`;

        window.history.replaceState(null, '', newUrl);
      } else {
        window.history.replaceState(null, '', window.location.pathname);
      }

      return;
    }, 200);

    return;
  }, [searchWorker['search']]);

  const searchTitle: ThemeSearchPageSearchPageTitle = translate({
    id: 'theme.SearchPage.title',
    message: 'Search',
    description: 'The title, heading, placeholder, and ARIA label for the search page',
  });
  const searchLoading: ThemeSearchPageSearchPageLoading = translate({
    id: 'theme.SearchPage.loading',
    message: 'Loading search index...',
    description: 'The message displayed while the search index is being loaded',
  });
  const searchNoResults: ThemeSearchPageSearchPageNoResults = translate({
    id: 'theme.SearchPage.noResults',
    message: 'No results found.',
    description: 'The message displayed when a search query returns no results',
  });

  return (
    <Layout title={searchTitle}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div className="nova-search-page nova-container">
        <div className="nova-search-page-header">
          <h1>{searchTitle}</h1>
          <input
            type="search"
            placeholder={searchTitle}
            value={query}
            onChange={handleInputChange}
            className="nova-search-page-input"
            aria-label={searchTitle}
          />
        </div>

        <div className="nova-search-page-results">
          {(
            searchWorker['isReady'] === false
            && searchWorker['error'] === undefined
          ) && (
            <p className="nova-search-page-loading">{searchLoading}</p>
          )}

          {(searchWorker['error'] !== undefined) && (
            <p className="nova-search-page-error">{searchWorker['error']}</p>
          )}

          {(
            searchWorker['isReady'] === true
            && searchWorker['results'].length === 0
            && query !== ''
          ) && (
            <p className="nova-search-page-empty">{searchNoResults}</p>
          )}

          {(searchWorker['results'].length > 0) && (
            <ul className="nova-search-page-list">
              {searchWorker['results'].map((resultItem: ThemeSearchPageSearchPageResultItem) => {
                const resultUrl: ThemeSearchPageSearchPageResultUrl = `${resultItem['path']}?_highlight=${encodeURIComponent(query)}`;

                return (
                  <li key={resultItem['path']} className="nova-search-page-item">
                    <a href={resultUrl}>
                      <span className="nova-search-page-item-title">{resultItem['title']}</span>
                      <span className="nova-search-page-item-snippet">{resultItem['snippet']}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </Layout>
  );
}

export default SearchPage;
