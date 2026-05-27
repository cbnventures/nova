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
  Theme_SearchPage_Index_SearchPage_BaseUrl,
  Theme_SearchPage_Index_SearchPage_DebounceTimerRef,
  Theme_SearchPage_Index_SearchPage_DispatchedQueryRef,
  Theme_SearchPage_Index_SearchPage_DocusaurusContext,
  Theme_SearchPage_Index_SearchPage_HandleInputChangeFunction,
  Theme_SearchPage_Index_SearchPage_InitialQuery,
  Theme_SearchPage_Index_SearchPage_InputChangeEvent,
  Theme_SearchPage_Index_SearchPage_InputValue,
  Theme_SearchPage_Index_SearchPage_Loading,
  Theme_SearchPage_Index_SearchPage_ManifestUrl,
  Theme_SearchPage_Index_SearchPage_NewUrl,
  Theme_SearchPage_Index_SearchPage_NoResults,
  Theme_SearchPage_Index_SearchPage_Props,
  Theme_SearchPage_Index_SearchPage_Query,
  Theme_SearchPage_Index_SearchPage_QueryState,
  Theme_SearchPage_Index_SearchPage_ResultCount,
  Theme_SearchPage_Index_SearchPage_ResultItem,
  Theme_SearchPage_Index_SearchPage_ResultsFound,
  Theme_SearchPage_Index_SearchPage_ResultUrl,
  Theme_SearchPage_Index_SearchPage_SearchedQuery,
  Theme_SearchPage_Index_SearchPage_SearchedQueryState,
  Theme_SearchPage_Index_SearchPage_Searching,
  Theme_SearchPage_Index_SearchPage_SearchParams,
  Theme_SearchPage_Index_SearchPage_SearchWorker,
  Theme_SearchPage_Index_SearchPage_SetQuery,
  Theme_SearchPage_Index_SearchPage_SetSearchedQuery,
  Theme_SearchPage_Index_SearchPage_SnippetSegment,
  Theme_SearchPage_Index_SearchPage_SnippetSegmentIndex,
  Theme_SearchPage_Index_SearchPage_Title,
  Theme_SearchPage_Index_SearchPage_WorkerUrl,
} from '../../types/theme/SearchPage/index.d.ts';

/**
 * Theme - Search Page - Search Page.
 *
 * Full-page search interface wrapped in the site Layout that reads the initial
 * query from the URL, dispatches debounced searches to the worker thread,
 * displays result links with snippet previews, and activates term highlighting.
 *
 * @param {Theme_SearchPage_Index_SearchPage_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function SearchPage(props: Theme_SearchPage_Index_SearchPage_Props) {
  const docusaurusContext: Theme_SearchPage_Index_SearchPage_DocusaurusContext = useDocusaurusContext();
  const baseUrl: Theme_SearchPage_Index_SearchPage_BaseUrl = docusaurusContext['siteConfig']['baseUrl'];

  const workerUrl: Theme_SearchPage_Index_SearchPage_WorkerUrl = `${baseUrl}search-worker.js`;
  const manifestUrl: Theme_SearchPage_Index_SearchPage_ManifestUrl = `${baseUrl}search-manifest.json`;

  const searchWorker: Theme_SearchPage_Index_SearchPage_SearchWorker = useSearchWorker({
    workerUrl, manifestUrl,
  });

  const searchParams: Theme_SearchPage_Index_SearchPage_SearchParams = (typeof window !== 'undefined') ? new URLSearchParams(window.location.search) : new URLSearchParams();
  const initialQuery: Theme_SearchPage_Index_SearchPage_InitialQuery = searchParams.get('q') ?? '';

  const queryState: Theme_SearchPage_Index_SearchPage_QueryState = useState<Theme_SearchPage_Index_SearchPage_Query>(initialQuery);
  const query: Theme_SearchPage_Index_SearchPage_Query = queryState[0];
  const setQuery: Theme_SearchPage_Index_SearchPage_SetQuery = queryState[1];

  const searchedQueryState: Theme_SearchPage_Index_SearchPage_SearchedQueryState = useState<Theme_SearchPage_Index_SearchPage_SearchedQuery>('');
  const searchedQuery: Theme_SearchPage_Index_SearchPage_SearchedQuery = searchedQueryState[0];
  const setSearchedQuery: Theme_SearchPage_Index_SearchPage_SetSearchedQuery = searchedQueryState[1];

  const debounceTimerRef: Theme_SearchPage_Index_SearchPage_DebounceTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const dispatchedQueryRef: Theme_SearchPage_Index_SearchPage_DispatchedQueryRef = useRef<string>('');

  useSearchHighlight({ enabled: true });

  // Trigger search when worker becomes ready and query is pre-filled.
  useEffect(() => {
    if (searchWorker['isReady'] === true && query !== '') {
      dispatchedQueryRef.current = query;

      searchWorker.search(query);
    }

    return;
  }, [searchWorker['isReady']]);

  // Mark the dispatched query as searched only when the worker has actually
  // responded (results or error change). This is what gates the "no results"
  // message: it waits for a real worker response, not just a debounce-fired
  // dispatch. Skip the initial mount where no query has been dispatched yet.
  useEffect(() => {
    if (dispatchedQueryRef.current !== '') {
      setSearchedQuery(dispatchedQueryRef.current);
    }

    return;
  }, [
    searchWorker['results'],
    searchWorker['error'],
  ]);

  // Debounced search and URL update on input change.
  const handleInputChange: Theme_SearchPage_Index_SearchPage_HandleInputChangeFunction = useCallback((event: Theme_SearchPage_Index_SearchPage_InputChangeEvent) => {
    const inputValue: Theme_SearchPage_Index_SearchPage_InputValue = event.target.value;

    setQuery(inputValue);

    if (debounceTimerRef.current !== undefined) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      if (inputValue !== '') {
        dispatchedQueryRef.current = inputValue;

        searchWorker.search(inputValue);

        const newUrl: Theme_SearchPage_Index_SearchPage_NewUrl = `${window.location.pathname}?q=${encodeURIComponent(inputValue)}`;

        window.history.replaceState(null, '', newUrl);
      } else {
        dispatchedQueryRef.current = '';

        setSearchedQuery('');

        // Clear stale worker results - otherwise the count + list keep
        // rendering the previous query's hits after the input is emptied.
        // The worker returns `[]` for an empty trimmed query (see worker.ts
        // `performSearch`), which flushes `setResults([])` in the hook.
        searchWorker.search('');

        window.history.replaceState(null, '', window.location.pathname);
      }

      return;
    }, 200);

    return;
  }, [searchWorker['search']]);

  const searchTitle: Theme_SearchPage_Index_SearchPage_Title = translate({
    id: 'theme.SearchPage.title',
    message: 'Search',
    description: 'The title, heading, placeholder, and ARIA label for the search page',
  });
  const searchLoading: Theme_SearchPage_Index_SearchPage_Loading = translate({
    id: 'theme.SearchPage.loading',
    message: 'Loading search index...',
    description: 'The message displayed while the search index is being loaded',
  });
  const searchNoResults: Theme_SearchPage_Index_SearchPage_NoResults = translate({
    id: 'theme.SearchPage.noResults',
    message: 'No results found.',
    description: 'The message displayed when a search query returns no results',
  });
  const searchSearching: Theme_SearchPage_Index_SearchPage_Searching = translate({
    id: 'theme.SearchPage.searching',
    message: 'Searching...',
    description: 'The message displayed while the query is being processed and fresh results have not yet returned',
  });

  const resultCount: Theme_SearchPage_Index_SearchPage_ResultCount = searchWorker['results'].length;
  const resultsFound: Theme_SearchPage_Index_SearchPage_ResultsFound = translate(
    {
      id: 'theme.SearchPage.resultsFound',
      message: '{count} results found',
      description: 'The screen reader announcement when search results are found',
    },
    {
      count: String(resultCount),
    },
  );

  return (
    <Layout title={searchTitle}>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div
        className={(props['className'] !== undefined) ? `nova-search-page nova-container ${props['className']}` : 'nova-search-page nova-container'}
        style={props['style']}
      >
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
            && query !== ''
            && searchedQuery !== query
            && searchWorker['results'].length === 0
          ) && (
            <p className="nova-search-page-searching">{searchSearching}</p>
          )}

          {(
            searchWorker['isReady'] === true
            && searchWorker['results'].length === 0
            && query !== ''
            && searchedQuery === query
          ) && (
            <p className="nova-search-page-empty">{searchNoResults}</p>
          )}

          {(searchWorker['results'].length > 0) && (
            <div
              className="nova-search-page-count"
              role="status"
              aria-live="polite"
            >
              {resultsFound}
            </div>
          )}

          {(searchWorker['results'].length > 0) && (
            <ul className="nova-search-page-list">
              {searchWorker['results'].map((resultItem: Theme_SearchPage_Index_SearchPage_ResultItem) => {
                const resultUrl: Theme_SearchPage_Index_SearchPage_ResultUrl = `${resultItem['path']}?_highlight=${encodeURIComponent(query)}`;

                return (
                  <li key={resultItem['path']} className="nova-search-page-item">
                    <a href={resultUrl}>
                      <span className="nova-search-page-item-title">{resultItem['title']}</span>
                      <span className="nova-search-page-item-snippet">
                        {resultItem['snippetSegments'].map((segment: Theme_SearchPage_Index_SearchPage_SnippetSegment, segmentIndex: Theme_SearchPage_Index_SearchPage_SnippetSegmentIndex) => {
                          if (segment['highlight'] === true) {
                            return (
                              <span key={segmentIndex} className="nova-search-page-item-highlight">
                                {segment['text']}
                              </span>
                            );
                          }

                          return segment['text'];
                        })}
                      </span>
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
