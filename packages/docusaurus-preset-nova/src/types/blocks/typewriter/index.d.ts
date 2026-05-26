import type {
  CSSProperties, Dispatch, ReactElement, ReactNode, SetStateAction,
} from 'react';

/**
 * Blocks - Typewriter.
 *
 * @since 0.15.0
 */
export type BlocksTypewriterPropsChildren = ReactNode;

export type BlocksTypewriterPropsTypeSpeed = number | undefined;

export type BlocksTypewriterPropsDeleteSpeed = number | undefined;

export type BlocksTypewriterPropsPauseDuration = number | undefined;

export type BlocksTypewriterPropsLoop = boolean | undefined;

export type BlocksTypewriterPropsClassName = string | undefined;

export type BlocksTypewriterPropsStyle = CSSProperties | undefined;

export type BlocksTypewriterProps = {
  children: BlocksTypewriterPropsChildren;
  typeSpeed?: BlocksTypewriterPropsTypeSpeed;
  deleteSpeed?: BlocksTypewriterPropsDeleteSpeed;
  pauseDuration?: BlocksTypewriterPropsPauseDuration;
  loop?: BlocksTypewriterPropsLoop;
  className?: BlocksTypewriterPropsClassName;
  style?: BlocksTypewriterPropsStyle;
};

export type BlocksTypewriterWords = string[];

export type BlocksTypewriterWordElement = ReactElement<BlocksTypewriterWordProps>;

export type BlocksTypewriterRenderedChildren = ReactNode;

export type BlocksTypewriterWordIndex = number;

export type BlocksTypewriterWordIndexState = [BlocksTypewriterWordIndex, BlocksTypewriterSetWordIndex];

export type BlocksTypewriterSetWordIndex = Dispatch<SetStateAction<BlocksTypewriterWordIndex>>;

export type BlocksTypewriterCharIndex = number;

export type BlocksTypewriterCharIndexState = [BlocksTypewriterCharIndex, BlocksTypewriterSetCharIndex];

export type BlocksTypewriterSetCharIndex = Dispatch<SetStateAction<BlocksTypewriterCharIndex>>;

export type BlocksTypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'gap' | 'done';

export type BlocksTypewriterPhaseState = [BlocksTypewriterPhase, BlocksTypewriterSetPhase];

export type BlocksTypewriterSetPhase = Dispatch<SetStateAction<BlocksTypewriterPhase>>;

export type BlocksTypewriterTypeSpeed = number;

export type BlocksTypewriterDeleteSpeed = number;

export type BlocksTypewriterPauseDuration = number;

export type BlocksTypewriterLoop = boolean;

export type BlocksTypewriterCurrentWord = string;

export type BlocksTypewriterDisplayText = string;

export type BlocksTypewriterTimeout = ReturnType<typeof setTimeout> | undefined;

export type BlocksTypewriterIsLastWord = boolean;

export type BlocksTypewriterMeasureWord = string;

export type BlocksTypewriterMeasureIndex = number;

/**
 * Blocks - Typewriter - Prefix.
 *
 * @since 0.15.0
 */
export type BlocksTypewriterPrefixPropsChildren = ReactNode;

export type BlocksTypewriterPrefixPropsClassName = string | undefined;

export type BlocksTypewriterPrefixPropsStyle = CSSProperties | undefined;

export type BlocksTypewriterPrefixProps = {
  children: BlocksTypewriterPrefixPropsChildren;
  className?: BlocksTypewriterPrefixPropsClassName;
  style?: BlocksTypewriterPrefixPropsStyle;
};

/**
 * Blocks - Typewriter - Word.
 *
 * @since 0.15.0
 */
export type BlocksTypewriterWordPropsChildren = string;

export type BlocksTypewriterWordProps = {
  children: BlocksTypewriterWordPropsChildren;
};
