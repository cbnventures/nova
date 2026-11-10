import {
  deepStrictEqual,
  rejects,
  strictEqual,
} from 'node:assert/strict';
import {
  createHash,
  generateKeyPairSync,
} from 'node:crypto';

import {
  afterEach, describe, it, vi,
} from 'vitest';

import { Runner as ApiAppStoreConnect } from '../../api/app-store-connect.js';

import type {
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_RequestPromise,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_Result,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_Client,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError_ReceivedError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_Client,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError_ReceivedError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Client,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Requests,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_Client,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_DeletePromise,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_RequestPromise,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_Result,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Assertion,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Request,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_Client,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_FirstRequest,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_SecondRequest,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Active,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Items,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_MaxInFlight,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_Finished,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError_ReceivedError,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Checksum,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchCall,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchSpy,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_File,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_ReferenceName,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_RequestUrl,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Result,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_CallCount,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_ChunkAttempts,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Committed,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Method,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Result,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_UploadPromise,
  Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Url,
  Tests_Api_AppStoreConnect_CreateClient_Returns,
} from '../../types/tests/api/app-store-connect.test.d.ts';

/**
 * Tests - API - App Store Connect - Create Client.
 *
 * Creates an ephemeral P-256 key so request tests exercise the real token and
 * fetch path without retaining credential material in the repository.
 *
 * @returns {Tests_Api_AppStoreConnect_CreateClient_Returns}
 *
 * @since 0.39.0
 */
function createClient(): Tests_Api_AppStoreConnect_CreateClient_Returns {
  return new ApiAppStoreConnect({
    keyId: 'TESTKEY1',
    privateKey: generateKeyPairSync('ec', { namedCurve: 'P-256' }).privateKey.export({
      format: 'pem',
      type: 'pkcs8',
    }).toString(),
  });
}

/**
 * Tests - API - App Store Connect - Request.
 *
 * @since 0.39.0
 */
describe('ApiAppStoreConnect.request', () => {
  afterEach(() => {
    vi.useRealTimers();

    vi.restoreAllMocks();

    return;
  });

  it('marks any POST transport failure as ambiguous', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new TypeError('fetch failed', { cause: new Error('connection reset') }));

    const client: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_Client = createClient();
    const validateError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError = (error) => {
      const receivedError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAnyPOSTTransportFailureAsAmbiguous_ValidateError_ReceivedError = error;

      return ApiAppStoreConnect.isAmbiguousCreateError(receivedError);
    };

    await rejects(client.request('/v1/test', { method: 'POST' }), validateError);

    return;
  });

  it('marks a POST success-body read failure as ambiguous', async () => {
    vi.spyOn(global, 'fetch').mockResolvedValue(new Response('{invalid-json', { status: 201 }));

    const client: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_Client = createClient();
    const validateError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError = (error) => {
      const receivedError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_MarksAPOSTSuccessBodyReadFailureAsAmbiguous_ValidateError_ReceivedError = error;

      return ApiAppStoreConnect.isAmbiguousCreateError(receivedError);
    };

    await rejects(client.request('/v1/test', {
      expectedStatuses: [201],
      method: 'POST',
    }), validateError);

    return;
  });

  it('says rate-limit exhaustion is safe to resume after the extended cooldown', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(Math, 'random').mockReturnValue(0);

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response('rate limited', {
        headers: { 'X-Rate-Limit': 'user-hour-lim:3600;user-hour-rem:0;' },
        status: 429,
      }));
    });

    const request: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Request = createClient().request('/v1/test');
    const assertion: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SaysRateLimitExhaustionIsSafeToResumeAfterTheExtendedCooldown_Assertion = rejects(request, (error) => String(error).includes('safe to resume'));

    await vi.runAllTimersAsync();

    await assertion;

    strictEqual(callCount, 10);

    return;
  });

  it('retries a 429 storm until it succeeds', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(Math, 'random').mockReturnValue(0);

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      if (callCount <= 6) {
        return Promise.resolve(new Response('rate limited', { status: 429 }));
      }

      return Promise.resolve(new Response(JSON.stringify({ data: { id: 'success' } })));
    });

    const requestPromise: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_RequestPromise = createClient().request('/v1/test');

    await vi.runAllTimersAsync();

    const result: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriesA429StormUntilItSucceeds_Result = await requestPromise;

    strictEqual(callCount, 7);
    deepStrictEqual(result, { data: { id: 'success' } });

    return;
  });

  it('honors Retry-After before retrying', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      if (callCount === 1) {
        return Promise.resolve(new Response('rate limited', {
          headers: { 'Retry-After': '5' },
          status: 429,
        }));
      }

      return Promise.resolve(new Response(JSON.stringify({ data: { id: 'success' } })));
    });

    const requestPromise: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_RequestPromise = createClient().request('/v1/test');

    await vi.advanceTimersByTimeAsync(0);

    strictEqual(callCount, 1);

    await vi.advanceTimersByTimeAsync(4999);

    strictEqual(callCount, 1);

    await vi.advanceTimersByTimeAsync(1);

    const result: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_HonorsRetryAfterBeforeRetrying_Result = await requestPromise;

    strictEqual(callCount, 2);
    deepStrictEqual(result, { data: { id: 'success' } });

    return;
  });

  it('pauses the whole limiter after a 429', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      if (callCount === 1) {
        return Promise.resolve(new Response('rate limited', {
          headers: { 'Retry-After': '5' },
          status: 429,
        }));
      }

      return Promise.resolve(new Response(JSON.stringify({ data: { id: `success-${callCount}` } })));
    });

    const client: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Client = createClient();
    const requests: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_PausesTheWholeLimiterAfterA429_Requests = [
      client.request('/v1/one'),
      client.request('/v1/two'),
      client.request('/v1/three'),
      client.request('/v1/four'),
    ];

    await vi.advanceTimersByTimeAsync(0);

    strictEqual(callCount, 3);

    await vi.advanceTimersByTimeAsync(4999);

    strictEqual(callCount, 3);

    await vi.advanceTimersByTimeAsync(1);

    await Promise.all(requests);

    strictEqual(callCount, 5);

    return;
  });

  it('slows down for a low rate budget', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response(JSON.stringify({ data: { id: `success-${callCount}` } }), {
        headers: (callCount === 1) ? { 'X-Rate-Limit': 'user-hour-lim:3600;user-hour-rem:10;' } : {},
      }));
    });

    const client: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_Client = createClient();
    const firstRequest: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_FirstRequest = client.request('/v1/first');

    await firstRequest;

    const secondRequest: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_SlowsDownForALowRateBudget_SecondRequest = client.request('/v1/second');

    await vi.advanceTimersByTimeAsync(59_999);

    strictEqual(callCount, 1);

    await vi.advanceTimersByTimeAsync(1);

    await secondRequest;

    strictEqual(callCount, 2);

    return;
  });

  it('retried DELETE treats a 404 as success', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_CallCount = 0;

    vi.useFakeTimers();

    vi.spyOn(Math, 'random').mockReturnValue(0);

    vi.spyOn(global, 'fetch').mockImplementation(() => {
      callCount += 1;

      return Promise.resolve(new Response((callCount === 1) ? 'gateway lost the 204' : 'already deleted', {
        status: (callCount === 1) ? 502 : 404,
      }));
    });

    const client: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_Client = createClient();
    const deletePromise: Tests_Api_AppStoreConnect_ApiAppStoreConnectRequest_RetriedDELETETreatsA404AsSuccess_DeletePromise = client.deleteResource('appScreenshots', 'deleted-1');

    await vi.runAllTimersAsync();

    await deletePromise;

    strictEqual(callCount, 2);

    return;
  });

  return;
});

/**
 * Tests - API - App Store Connect - Run Operations.
 *
 * @since 0.39.0
 */
describe('ApiAppStoreConnect.runOperations', () => {
  it('never exceeds the concurrency limit', async () => {
    let active: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Active = 0;
    const items: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_Items = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
    ];
    let maxInFlight: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_NeverExceedsTheConcurrencyLimit_MaxInFlight = 0;

    await ApiAppStoreConnect.runOperations(items, async () => {
      active += 1;
      maxInFlight = Math.max(maxInFlight, active);

      await new Promise((resolvePromise) => {
        setTimeout(resolvePromise, 5);

        return;
      });

      active -= 1;

      return;
    });

    strictEqual(maxInFlight, 3);

    return;
  });

  it('reports every failure', async () => {
    const finished: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_Finished = [];
    const validateAggregateError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError = (error) => {
      const receivedError: Tests_Api_AppStoreConnect_ApiAppStoreConnectRunOperations_ReportsEveryFailure_ValidateAggregateError_ReceivedError = error;

      return (
        receivedError instanceof AggregateError
        && receivedError.errors.length === 3
        && receivedError.errors.every((failure, index) => failure instanceof Error && failure.message === `failed-${[
          'one',
          'two',
          'three',
        ][index]}`)
      );
    };

    await rejects(ApiAppStoreConnect.runOperations([
      'one',
      'two',
      'three',
    ], (item) => {
      finished.push(item);

      return Promise.reject(new Error(`failed-${item}`));
    }), validateAggregateError);

    deepStrictEqual(finished, [
      'one',
      'two',
      'three',
    ]);

    return;
  });

  return;
});

/**
 * Tests - API - App Store Connect - Upload Asset Library Image.
 *
 * @since 0.39.0
 */
describe('ApiAppStoreConnect.uploadAssetLibraryImage', () => {
  afterEach(() => {
    vi.restoreAllMocks();

    return;
  });

  it('reuses a ready checksum-named image', async () => {
    const file: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_File = Buffer.from('creative-asset');
    const checksum: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Checksum = createHash('md5').update(file).digest('hex').slice(0, 8);
    const referenceName: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_ReferenceName = `Product header [md5:${checksum}]`;
    const fetchSpy: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchSpy = vi.spyOn(global, 'fetch').mockResolvedValue(new Response(JSON.stringify({
      data: [{
        attributes: {
          category: 'CREATIVE_ASSETS',
          fileName: 'header.png',
          referenceName,
          state: 'PREPARE_FOR_SUBMISSION',
        },
        id: 'image-existing',
      }],
      links: {},
    })));
    const result: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_Result = await createClient().uploadAssetLibraryImage('library-1', 'CREATIVE_ASSETS', 'Product header', 'header.png', file);

    strictEqual(result['id'], 'image-existing');
    strictEqual(fetchSpy.mock.calls.length, 1);

    const fetchCall: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_FetchCall = fetchSpy.mock.calls[0];

    if (fetchCall === undefined) {
      throw new Error('Asset reuse did not issue its expected lookup request.');
    }

    const requestUrl: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadAssetLibraryImage_ReusesAReadyChecksumNamedImage_RequestUrl = new URL(String(fetchCall[0]));

    strictEqual(requestUrl.searchParams.get('filter[referenceName]'), referenceName);

    return;
  });

  return;
});

/**
 * Tests - API - App Store Connect - Upload Screenshot.
 *
 * @since 0.39.0
 */
describe('ApiAppStoreConnect.uploadScreenshot', () => {
  afterEach(() => {
    vi.useRealTimers();

    vi.restoreAllMocks();

    return;
  });

  it('applies the rate-limit policy to chunk uploads', async () => {
    let callCount: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_CallCount = 0;
    let chunkAttempts: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_ChunkAttempts = 0;
    let committed: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Committed = false;

    vi.useFakeTimers();

    vi.spyOn(Math, 'random').mockReturnValue(0);

    vi.spyOn(global, 'fetch').mockImplementation((input, options) => {
      callCount += 1;

      const url: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Url = new URL(String(input));
      const method: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Method = (options === undefined) ? 'GET' : (options['method'] ?? 'GET');

      if (method === 'GET' && url.pathname === '/v1/appScreenshotSets/set-1/appScreenshots') {
        return Promise.resolve(new Response(JSON.stringify({
          data: (committed === true) ? [{
            attributes: { assetDeliveryState: { state: 'COMPLETE' } },
            id: 'screenshot-new',
          }] : [],
          links: {},
        }), { status: 200 }));
      }

      if (method === 'POST' && url.pathname === '/v1/appScreenshots') {
        return Promise.resolve(new Response(JSON.stringify({
          data: {
            attributes: {
              uploadOperations: [{
                length: 4,
                method: 'PUT',
                offset: 0,
                requestHeaders: [],
                url: 'https://upload.example.test/chunk',
              }],
            },
            id: 'screenshot-new',
          },
        }), { status: 201 }));
      }

      if (url.hostname === 'upload.example.test') {
        chunkAttempts += 1;

        if (chunkAttempts <= 5) {
          return Promise.resolve(new Response('rate limited', { status: 429 }));
        }

        return Promise.resolve(new Response(null, { status: 200 }));
      }

      if (method === 'PATCH' && url.pathname === '/v1/appScreenshots/screenshot-new') {
        committed = true;

        return Promise.resolve(new Response(JSON.stringify({ data: { id: 'screenshot-new' } }), { status: 200 }));
      }

      return Promise.resolve(new Response('unexpected request', { status: 500 }));
    });

    const uploadPromise: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_UploadPromise = createClient().uploadScreenshot('set-1', '01.png', Buffer.from('test'));

    await vi.runAllTimersAsync();

    const result: Tests_Api_AppStoreConnect_ApiAppStoreConnectUploadScreenshot_AppliesTheRateLimitPolicyToChunkUploads_Result = await uploadPromise;

    strictEqual(callCount, 10);
    strictEqual(chunkAttempts, 6);
    strictEqual(result['id'], 'screenshot-new');

    return;
  });

  return;
});
