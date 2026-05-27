import type {
  CSSProperties, Dispatch, ReactElement, ReactNode, SetStateAction,
} from 'react';

/**
 * Blocks - Typewriter.
 *
 * @since 0.15.0
 */
export type Blocks_Typewriter_Index_BlocksTypewriter_Props_Children = ReactNode;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_TypeSpeed = number | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_DeleteSpeed = number | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_PauseDuration = number | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_Loop = boolean | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_ClassName = string | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props_Style = CSSProperties | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_Props = {
  children: Blocks_Typewriter_Index_BlocksTypewriter_Props_Children;
  typeSpeed?: Blocks_Typewriter_Index_BlocksTypewriter_Props_TypeSpeed;
  deleteSpeed?: Blocks_Typewriter_Index_BlocksTypewriter_Props_DeleteSpeed;
  pauseDuration?: Blocks_Typewriter_Index_BlocksTypewriter_Props_PauseDuration;
  loop?: Blocks_Typewriter_Index_BlocksTypewriter_Props_Loop;
  className?: Blocks_Typewriter_Index_BlocksTypewriter_Props_ClassName;
  style?: Blocks_Typewriter_Index_BlocksTypewriter_Props_Style;
};

export type Blocks_Typewriter_Index_BlocksTypewriter_Words = string[];

export type Blocks_Typewriter_Index_BlocksTypewriter_WordElement = ReactElement<Blocks_Typewriter_Index_BlocksTypewriter_WordProps>;

export type Blocks_Typewriter_Index_BlocksTypewriter_RenderedChildren = ReactNode;

export type Blocks_Typewriter_Index_BlocksTypewriter_WordIndex = number;

export type Blocks_Typewriter_Index_BlocksTypewriter_WordIndexState = [Blocks_Typewriter_Index_BlocksTypewriter_WordIndex, Blocks_Typewriter_Index_BlocksTypewriter_SetWordIndex];

export type Blocks_Typewriter_Index_BlocksTypewriter_SetWordIndex = Dispatch<SetStateAction<Blocks_Typewriter_Index_BlocksTypewriter_WordIndex>>;

export type Blocks_Typewriter_Index_BlocksTypewriter_CharIndex = number;

export type Blocks_Typewriter_Index_BlocksTypewriter_CharIndexState = [Blocks_Typewriter_Index_BlocksTypewriter_CharIndex, Blocks_Typewriter_Index_BlocksTypewriter_SetCharIndex];

export type Blocks_Typewriter_Index_BlocksTypewriter_SetCharIndex = Dispatch<SetStateAction<Blocks_Typewriter_Index_BlocksTypewriter_CharIndex>>;

export type Blocks_Typewriter_Index_BlocksTypewriter_Phase = 'typing' | 'pausing' | 'deleting' | 'gap' | 'done';

export type Blocks_Typewriter_Index_BlocksTypewriter_PhaseState = [Blocks_Typewriter_Index_BlocksTypewriter_Phase, Blocks_Typewriter_Index_BlocksTypewriter_SetPhase];

export type Blocks_Typewriter_Index_BlocksTypewriter_SetPhase = Dispatch<SetStateAction<Blocks_Typewriter_Index_BlocksTypewriter_Phase>>;

export type Blocks_Typewriter_Index_BlocksTypewriter_TypeSpeed = number;

export type Blocks_Typewriter_Index_BlocksTypewriter_DeleteSpeed = number;

export type Blocks_Typewriter_Index_BlocksTypewriter_PauseDuration = number;

export type Blocks_Typewriter_Index_BlocksTypewriter_Loop = boolean;

export type Blocks_Typewriter_Index_BlocksTypewriter_CurrentWord = string;

export type Blocks_Typewriter_Index_BlocksTypewriter_DisplayText = string;

export type Blocks_Typewriter_Index_BlocksTypewriter_Timeout = ReturnType<typeof setTimeout> | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_IsLastWord = boolean;

export type Blocks_Typewriter_Index_BlocksTypewriter_MeasureWord = string;

export type Blocks_Typewriter_Index_BlocksTypewriter_MeasureIndex = number;

/**
 * Blocks - Typewriter - Prefix.
 *
 * @since 0.15.0
 */
export type Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_Children = ReactNode;

export type Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_ClassName = string | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_Style = CSSProperties | undefined;

export type Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps = {
  children: Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_Children;
  className?: Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_ClassName;
  style?: Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps_Style;
};

/**
 * Blocks - Typewriter - Word.
 *
 * @since 0.15.0
 */
export type Blocks_Typewriter_Index_BlocksTypewriter_WordProps_Children = string;

export type Blocks_Typewriter_Index_BlocksTypewriter_WordProps = {
  children: Blocks_Typewriter_Index_BlocksTypewriter_WordProps_Children;
};
