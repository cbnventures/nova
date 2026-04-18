/**
 * Shared - Color Scale.
 *
 * @since 0.15.0
 */
export type SharedColorScaleKey = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

export type SharedColorScaleValue = string;

export type SharedColorScale = Record<SharedColorScaleKey, SharedColorScaleValue>;

/**
 * Shared - Hast Node.
 *
 * @since 0.15.0
 */
export type SharedHastNodeType = string;

export type SharedHastNodeTagName = string | undefined;

export type SharedHastNodeProperties = Record<string, unknown>;

export type SharedHastNodeChildren = SharedHastNode[];

export type SharedHastNodeValue = string | undefined;

export type SharedHastNodeData = Record<string, unknown> | undefined;

export type SharedHastNode = {
  type: SharedHastNodeType;
  tagName?: SharedHastNodeTagName;
  properties?: SharedHastNodeProperties;
  children?: SharedHastNodeChildren;
  value?: SharedHastNodeValue;
  data?: SharedHastNodeData;
};

/**
 * Shared - Hast Node Result.
 *
 * @since 0.15.0
 */
export type SharedHastNodeResultNode = SharedHastNode;

export type SharedHastNodeResultIndex = number;

export type SharedHastNodeResultParent = SharedHastNode;

export type SharedHastNodeResult = {
  node: SharedHastNodeResultNode;
  index: SharedHastNodeResultIndex;
  parent: SharedHastNodeResultParent;
};

/**
 * Shared - Hex Color.
 *
 * @since 0.15.0
 */
export type SharedHexColor = string;

/**
 * Shared - Hsl Color.
 *
 * @since 0.15.0
 */
export type SharedHslColorHue = number;

export type SharedHslColorSaturation = number;

export type SharedHslColorLightness = number;

export type SharedHslColor = {
  hue: SharedHslColorHue;
  saturation: SharedHslColorSaturation;
  lightness: SharedHslColorLightness;
};

/**
 * Shared - Mermaid.
 *
 * @since 0.15.0
 */
export type SharedMermaidRenderOutputSvg = string;

export type SharedMermaidRenderOutputBindFunctions = ((element: Element) => void) | undefined;

export type SharedMermaidRenderOutput = {
  svg: SharedMermaidRenderOutputSvg;
  bindFunctions?: SharedMermaidRenderOutputBindFunctions;
};

export type SharedMermaidConfigStartOnLoad = boolean;

export type SharedMermaidConfigTheme = string;

export type SharedMermaidConfigColorMode = string;

export type SharedMermaidConfig = {
  startOnLoad: SharedMermaidConfigStartOnLoad;
  theme: SharedMermaidConfigTheme;
  colorMode: SharedMermaidConfigColorMode;
  [key: string]: unknown;
};

/**
 * Shared - Preset.
 *
 * @since 0.15.0
 */
export type SharedPresetName = 'foundry' | 'sentinel' | 'signal' | 'envoy';

export type SharedPresetColorsPrimary = SharedHexColor;

export type SharedPresetColorsAccent = SharedHexColor;

export type SharedPresetColorsNeutral = SharedHexColor;

export type SharedPresetColors = {
  primary: SharedPresetColorsPrimary;
  accent: SharedPresetColorsAccent;
  neutral: SharedPresetColorsNeutral;
};

export type SharedPresetFontsDisplay = string;

export type SharedPresetFontsBody = string;

export type SharedPresetFontsCode = string;

export type SharedPresetFonts = {
  display: SharedPresetFontsDisplay;
  body: SharedPresetFontsBody;
  code: SharedPresetFontsCode;
};

export type SharedPresetShapeRadius = 'sharp' | 'rounded' | 'pill';

export type SharedPresetShapeDensity = 'compact' | 'comfortable' | 'spacious';

export type SharedPresetShape = {
  radius: SharedPresetShapeRadius;
  density: SharedPresetShapeDensity;
};

export type SharedPresetDepthCards = 'flat' | 'elevated' | 'glass';

export type SharedPresetDepthCodeBlocks = 'flat' | 'bordered' | 'elevated';

export type SharedPresetDepth = {
  cards: SharedPresetDepthCards;
  codeBlocks: SharedPresetDepthCodeBlocks;
};

export type SharedPresetMotionSpeed = 'none' | 'subtle' | 'normal' | 'expressive';

export type SharedPresetMotionStaggeredReveals = boolean;

export type SharedPresetMotionHoverEffects = boolean;

export type SharedPresetMotion = {
  speed: SharedPresetMotionSpeed;
  staggeredReveals: SharedPresetMotionStaggeredReveals;
  hoverEffects: SharedPresetMotionHoverEffects;
};

export type SharedPresetNavbar = 'bridge' | 'canopy' | 'monolith' | 'compass';

export type SharedPresetFooter = 'commons' | 'embassy' | 'ledger' | 'launchpad';

export type SharedPresetLogoTitle = string;

export type SharedPresetLogoAlt = string;

export type SharedPresetLogoSrc = string;

export type SharedPresetLogo = {
  title: SharedPresetLogoTitle;
  alt: SharedPresetLogoAlt;
  src: SharedPresetLogoSrc;
};

export type SharedPreset = {
  logo: SharedPresetLogo;
  colors: SharedPresetColors;
  fonts: SharedPresetFonts;
  shape: SharedPresetShape;
  depth: SharedPresetDepth;
  motion: SharedPresetMotion;
  navbar: SharedPresetNavbar;
  footer: SharedPresetFooter;
};

/**
 * Shared - Search Worker Document.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerDocumentPath = string;

export type SharedSearchWorkerDocumentTitle = string;

export type SharedSearchWorkerDocumentSnippet = string;

export type SharedSearchWorkerDocumentBody = string;

export type SharedSearchWorkerDocument = {
  path: SharedSearchWorkerDocumentPath;
  title: SharedSearchWorkerDocumentTitle;
  snippet: SharedSearchWorkerDocumentSnippet;
  body: SharedSearchWorkerDocumentBody;
};

export type SharedSearchWorkerDocuments = SharedSearchWorkerDocument[];

/**
 * Shared - Search Worker Error Response.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerErrorResponseType = 'error';

export type SharedSearchWorkerErrorResponseReason = string;

export type SharedSearchWorkerErrorResponse = {
  type: SharedSearchWorkerErrorResponseType;
  reason: SharedSearchWorkerErrorResponseReason;
};

/**
 * Shared - Search Worker Init Message.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerInitMessageType = 'init';

export type SharedSearchWorkerInitMessageIndexUrl = string;

export type SharedSearchWorkerInitMessage = {
  type: SharedSearchWorkerInitMessageType;
  indexUrl: SharedSearchWorkerInitMessageIndexUrl;
};

/**
 * Shared - Search Worker Lunr Result.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerLunrResultRef = string;

export type SharedSearchWorkerLunrResultScore = number;

export type SharedSearchWorkerLunrResultMatchDataMetadata = Record<string, unknown>;

export type SharedSearchWorkerLunrResultMatchData = {
  metadata: SharedSearchWorkerLunrResultMatchDataMetadata;
};

export type SharedSearchWorkerLunrResult = {
  ref: SharedSearchWorkerLunrResultRef;
  score: SharedSearchWorkerLunrResultScore;
  matchData: SharedSearchWorkerLunrResultMatchData;
};

/**
 * Shared - Search Worker Message.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerMessage = SharedSearchWorkerInitMessage | SharedSearchWorkerSearchMessage;

/**
 * Shared - Search Worker Ready Response.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerReadyResponseType = 'ready';

export type SharedSearchWorkerReadyResponse = {
  type: SharedSearchWorkerReadyResponseType;
};

/**
 * Shared - Search Worker Response.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerResponse = SharedSearchWorkerReadyResponse | SharedSearchWorkerResultsResponse | SharedSearchWorkerErrorResponse;

/**
 * Shared - Search Worker Results Response.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerResultsResponseType = 'results';

export type SharedSearchWorkerResultsResponseHits = SharedSearchWorkerSearchHit[];

export type SharedSearchWorkerResultsResponse = {
  type: SharedSearchWorkerResultsResponseType;
  hits: SharedSearchWorkerResultsResponseHits;
};

/**
 * Shared - Search Worker Search Hit.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerSearchHitPath = string;

export type SharedSearchWorkerSearchHitTitle = string;

export type SharedSearchWorkerSearchHitSnippet = string;

export type SharedSearchWorkerSearchHitScore = number;

export type SharedSearchWorkerSearchHitSnippetSegmentText = string;

export type SharedSearchWorkerSearchHitSnippetSegmentHighlight = boolean;

export type SharedSearchWorkerSearchHitSnippetSegment = {
  text: SharedSearchWorkerSearchHitSnippetSegmentText;
  highlight: SharedSearchWorkerSearchHitSnippetSegmentHighlight;
};

export type SharedSearchWorkerSearchHitSnippetSegments = SharedSearchWorkerSearchHitSnippetSegment[];

export type SharedSearchWorkerSearchHit = {
  path: SharedSearchWorkerSearchHitPath;
  title: SharedSearchWorkerSearchHitTitle;
  snippet: SharedSearchWorkerSearchHitSnippet;
  snippetSegments: SharedSearchWorkerSearchHitSnippetSegments;
  score: SharedSearchWorkerSearchHitScore;
};

/**
 * Shared - Search Worker Search Message.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerSearchMessageType = 'search';

export type SharedSearchWorkerSearchMessageQuery = string;

export type SharedSearchWorkerSearchMessageLimit = number;

export type SharedSearchWorkerSearchMessage = {
  type: SharedSearchWorkerSearchMessageType;
  query: SharedSearchWorkerSearchMessageQuery;
  limit: SharedSearchWorkerSearchMessageLimit;
};

/**
 * Shared - Search Worker Test Document.
 *
 * @since 0.15.0
 */
export type SharedSearchWorkerTestDocumentPath = string;

export type SharedSearchWorkerTestDocumentTitle = string;

export type SharedSearchWorkerTestDocumentSnippet = string;

export type SharedSearchWorkerTestDocumentBody = string;

export type SharedSearchWorkerTestDocument = {
  path: SharedSearchWorkerTestDocumentPath;
  title: SharedSearchWorkerTestDocumentTitle;
  snippet: SharedSearchWorkerTestDocumentSnippet;
  body: SharedSearchWorkerTestDocumentBody;
};

/**
 * Shared - Shade Level.
 *
 * @since 0.15.0
 */
export type SharedShadeLevel = 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;

/**
 * Shared - Surface.
 *
 * @since 0.15.0
 */
export type SharedSurface = 'alt';
