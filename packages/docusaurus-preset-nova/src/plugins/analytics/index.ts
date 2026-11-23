import type {
  Plugins_Analytics_Index_Analytics_Context,
  Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity,
  Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics,
  Plugins_Analytics_Index_Analytics_InjectHtmlTags_HeadTags,
  Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel,
  Plugins_Analytics_Index_Analytics_InjectHtmlTags_Returns,
  Plugins_Analytics_Index_Analytics_Options,
  Plugins_Analytics_Index_Analytics_Returns,
  Plugins_Analytics_Index_ClarityTags_ProjectId,
  Plugins_Analytics_Index_ClarityTags_Returns,
  Plugins_Analytics_Index_GoogleAnalyticsTags_MeasurementId,
  Plugins_Analytics_Index_GoogleAnalyticsTags_Returns,
  Plugins_Analytics_Index_MetaPixelTags_PixelId,
  Plugins_Analytics_Index_MetaPixelTags_Returns,
} from '../../types/plugins/analytics/index.d.ts';

/**
 * Plugins - Analytics - Google Analytics Tags.
 *
 * Builds the gtag.js loader and its config call. Google Analytics counts later route
 * changes on its own through enhanced measurement's browser history events.
 *
 * @param {Plugins_Analytics_Index_GoogleAnalyticsTags_MeasurementId} measurementId - Measurement id.
 *
 * @returns {Plugins_Analytics_Index_GoogleAnalyticsTags_Returns}
 *
 * @since UNRELEASED
 */
export function googleAnalyticsTags(measurementId: Plugins_Analytics_Index_GoogleAnalyticsTags_MeasurementId): Plugins_Analytics_Index_GoogleAnalyticsTags_Returns {
  return [
    {
      tagName: 'script',
      attributes: {
        async: true,
        src: `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`,
      },
    },
    {
      tagName: 'script',
      innerHTML: [
        'window.dataLayer = window.dataLayer || [];',
        'function gtag(){dataLayer.push(arguments);}',
        'gtag(\'js\', new Date());',
        `gtag('config', ${JSON.stringify(measurementId)});`,
      ].join(''),
    },
  ];
}

/**
 * Plugins - Analytics - Meta Pixel Tags.
 *
 * Builds Meta's command queue, which loads fbevents.js, initializes the pixel and tracks
 * the first PageView. The pixel tracks later route changes through history events.
 *
 * @param {Plugins_Analytics_Index_MetaPixelTags_PixelId} pixelId - Pixel id.
 *
 * @returns {Plugins_Analytics_Index_MetaPixelTags_Returns}
 *
 * @since UNRELEASED
 */
export function metaPixelTags(pixelId: Plugins_Analytics_Index_MetaPixelTags_PixelId): Plugins_Analytics_Index_MetaPixelTags_Returns {
  return [{
    tagName: 'script',
    innerHTML: [
      '!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?',
      'n.callMethod.apply(n,arguments):n.queue.push(arguments)};',
      'if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version=\'2.0\';',
      'n.queue=[];t=b.createElement(e);t.async=!0;',
      't.src=v;s=b.getElementsByTagName(e)[0];',
      's.parentNode.insertBefore(t,s)}(window, document,\'script\',',
      '\'https://connect.facebook.net/en_US/fbevents.js\');',
      `fbq('init', ${JSON.stringify(pixelId)});`,
      'fbq(\'track\', \'PageView\');',
    ].join(''),
  }];
}

/**
 * Plugins - Analytics - Clarity Tags.
 *
 * Builds Microsoft Clarity's command queue and loader. Clarity follows route changes in
 * single-page apps on its own.
 *
 * @param {Plugins_Analytics_Index_ClarityTags_ProjectId} projectId - Project id.
 *
 * @returns {Plugins_Analytics_Index_ClarityTags_Returns}
 *
 * @since UNRELEASED
 */
export function clarityTags(projectId: Plugins_Analytics_Index_ClarityTags_ProjectId): Plugins_Analytics_Index_ClarityTags_Returns {
  return [{
    tagName: 'script',
    innerHTML: [
      '(function(c,l,a,r,i,t,y){',
      'c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};',
      't=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;',
      'y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);',
      `})(window, document, "clarity", "script", ${JSON.stringify(encodeURIComponent(projectId))});`,
    ].join(''),
  }];
}

/**
 * Plugins - Analytics - Analytics.
 *
 * Docusaurus plugin that adds Google Analytics, Meta Pixel and Microsoft Clarity to every
 * page's head, each one only when its id is configured.
 *
 * @param {Plugins_Analytics_Index_Analytics_Context} _context - Context.
 * @param {Plugins_Analytics_Index_Analytics_Options} options  - Options.
 *
 * @returns {Plugins_Analytics_Index_Analytics_Returns}
 *
 * @since UNRELEASED
 */
export function analytics(_context: Plugins_Analytics_Index_Analytics_Context, options: Plugins_Analytics_Index_Analytics_Options): Plugins_Analytics_Index_Analytics_Returns {
  return {
    name: '@cbnventures/docusaurus-preset-nova-analytics',
    injectHtmlTags(): Plugins_Analytics_Index_Analytics_InjectHtmlTags_Returns {
      const headTags: Plugins_Analytics_Index_Analytics_InjectHtmlTags_HeadTags = [];
      const googleAnalytics: Plugins_Analytics_Index_Analytics_InjectHtmlTags_GoogleAnalytics = options['googleAnalytics'];
      const metaPixel: Plugins_Analytics_Index_Analytics_InjectHtmlTags_MetaPixel = options['metaPixel'];
      const clarity: Plugins_Analytics_Index_Analytics_InjectHtmlTags_Clarity = options['clarity'];

      if (googleAnalytics !== undefined) {
        headTags.push(...googleAnalyticsTags(googleAnalytics['measurementId']));
      }

      if (metaPixel !== undefined) {
        headTags.push(...metaPixelTags(metaPixel['pixelId']));
      }

      if (clarity !== undefined) {
        headTags.push(...clarityTags(clarity['projectId']));
      }

      return {
        headTags,
      };
    },
  };
}

export default analytics;
