import type {
  Dispatch,
  ReactElement,
  ReactNode,
  SetStateAction,
} from 'react';

/**
 * Components - Typewriter.
 *
 * @since 0.15.0
 */
export type ComponentsTypewriterPropsChildren = ReactNode;

export type ComponentsTypewriterPropsTypeSpeed = number | undefined;

export type ComponentsTypewriterPropsDeleteSpeed = number | undefined;

export type ComponentsTypewriterPropsPauseDuration = number | undefined;

export type ComponentsTypewriterPropsLoop = boolean | undefined;

export type ComponentsTypewriterProps = {
  children: ComponentsTypewriterPropsChildren;
  typeSpeed?: ComponentsTypewriterPropsTypeSpeed;
  deleteSpeed?: ComponentsTypewriterPropsDeleteSpeed;
  pauseDuration?: ComponentsTypewriterPropsPauseDuration;
  loop?: ComponentsTypewriterPropsLoop;
};

export type ComponentsTypewriterWords = string[];

export type ComponentsTypewriterWordElement = ReactElement<ComponentsTypewriterWordProps>;

export type ComponentsTypewriterRenderedChildren = ReactNode;

export type ComponentsTypewriterWordIndex = number;

export type ComponentsTypewriterWordIndexState = [ComponentsTypewriterWordIndex, ComponentsTypewriterSetWordIndex];

export type ComponentsTypewriterSetWordIndex = Dispatch<SetStateAction<ComponentsTypewriterWordIndex>>;

export type ComponentsTypewriterCharIndex = number;

export type ComponentsTypewriterCharIndexState = [ComponentsTypewriterCharIndex, ComponentsTypewriterSetCharIndex];

export type ComponentsTypewriterSetCharIndex = Dispatch<SetStateAction<ComponentsTypewriterCharIndex>>;

export type ComponentsTypewriterPhase = 'typing' | 'pausing' | 'deleting' | 'gap' | 'done';

export type ComponentsTypewriterPhaseState = [ComponentsTypewriterPhase, ComponentsTypewriterSetPhase];

export type ComponentsTypewriterSetPhase = Dispatch<SetStateAction<ComponentsTypewriterPhase>>;

export type ComponentsTypewriterTypeSpeed = number;

export type ComponentsTypewriterDeleteSpeed = number;

export type ComponentsTypewriterPauseDuration = number;

export type ComponentsTypewriterLoop = boolean;

export type ComponentsTypewriterCurrentWord = string;

export type ComponentsTypewriterDisplayText = string;

export type ComponentsTypewriterTimeout = ReturnType<typeof setTimeout> | undefined;

export type ComponentsTypewriterIsLastWord = boolean;

export type ComponentsTypewriterMeasureWord = string;

export type ComponentsTypewriterMeasureIndex = number;

/**
 * Components - Typewriter - Prefix.
 *
 * @since 0.15.0
 */
export type ComponentsTypewriterPrefixPropsChildren = ReactNode;

export type ComponentsTypewriterPrefixProps = {
  children: ComponentsTypewriterPrefixPropsChildren;
};

/**
 * Components - Typewriter - Word.
 *
 * @since 0.15.0
 */
export type ComponentsTypewriterWordPropsChildren = string;

export type ComponentsTypewriterWordProps = {
  children: ComponentsTypewriterWordPropsChildren;
};
