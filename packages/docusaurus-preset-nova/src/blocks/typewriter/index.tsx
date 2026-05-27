import {
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import type {
  Blocks_Typewriter_Index_BlocksTypewriter_CharIndex,
  Blocks_Typewriter_Index_BlocksTypewriter_CharIndexState,
  Blocks_Typewriter_Index_BlocksTypewriter_CurrentWord,
  Blocks_Typewriter_Index_BlocksTypewriter_DeleteSpeed,
  Blocks_Typewriter_Index_BlocksTypewriter_DisplayText,
  Blocks_Typewriter_Index_BlocksTypewriter_IsLastWord,
  Blocks_Typewriter_Index_BlocksTypewriter_Loop,
  Blocks_Typewriter_Index_BlocksTypewriter_MeasureIndex,
  Blocks_Typewriter_Index_BlocksTypewriter_MeasureWord,
  Blocks_Typewriter_Index_BlocksTypewriter_PauseDuration,
  Blocks_Typewriter_Index_BlocksTypewriter_Phase,
  Blocks_Typewriter_Index_BlocksTypewriter_PhaseState,
  Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps,
  Blocks_Typewriter_Index_BlocksTypewriter_Props,
  Blocks_Typewriter_Index_BlocksTypewriter_RenderedChildren,
  Blocks_Typewriter_Index_BlocksTypewriter_SetCharIndex,
  Blocks_Typewriter_Index_BlocksTypewriter_SetPhase,
  Blocks_Typewriter_Index_BlocksTypewriter_SetWordIndex,
  Blocks_Typewriter_Index_BlocksTypewriter_Timeout,
  Blocks_Typewriter_Index_BlocksTypewriter_TypeSpeed,
  Blocks_Typewriter_Index_BlocksTypewriter_WordElement,
  Blocks_Typewriter_Index_BlocksTypewriter_WordIndex,
  Blocks_Typewriter_Index_BlocksTypewriter_WordIndexState,
  Blocks_Typewriter_Index_BlocksTypewriter_WordProps,
  Blocks_Typewriter_Index_BlocksTypewriter_Words,
} from '../../types/blocks/typewriter/index.d.ts';

/**
 * Blocks - Typewriter - Prefix.
 *
 * Semantic wrapper that renders static text inside a typewriter heading
 * with a dedicated CSS class for independent styling.
 *
 * @param {Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriterPrefix(props: Blocks_Typewriter_Index_BlocksTypewriter_PrefixProps) {
  return (
    <span
      className={(props['className'] !== undefined) ? `nova-typewriter-prefix ${props['className']}` : 'nova-typewriter-prefix'}
      style={props['style']}
    >
      {props['children']}
    </span>
  );
}

/**
 * Blocks - Typewriter - Word.
 *
 * Data carrier that declares a word for the parent typewriter animation.
 * Renders nothing - the parent extracts text from each word child to
 * build the rotation list.
 *
 * @param {Blocks_Typewriter_Index_BlocksTypewriter_WordProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriterWord(_props: Blocks_Typewriter_Index_BlocksTypewriter_WordProps) {
  return null;
}

/**
 * Blocks - Typewriter.
 *
 * Compound component that cycles through a list of words with a type-on and
 * delete-off animation. Static content is placed in Prefix children and rotating
 * words are declared with Word children. Timing props control the animation speed.
 *
 * @param {Blocks_Typewriter_Index_BlocksTypewriter_Props} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriter(props: Blocks_Typewriter_Index_BlocksTypewriter_Props) {
  const words: Blocks_Typewriter_Index_BlocksTypewriter_Words = [];

  Children.forEach(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === BlocksTypewriterWord) {
      words.push(String((child as Blocks_Typewriter_Index_BlocksTypewriter_WordElement).props['children']));
    }

    return undefined;
  });

  const renderedChildren: Blocks_Typewriter_Index_BlocksTypewriter_RenderedChildren = Children.map(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === BlocksTypewriterWord) {
      return null;
    }

    return child;
  });

  const wordIndexState: Blocks_Typewriter_Index_BlocksTypewriter_WordIndexState = useState<Blocks_Typewriter_Index_BlocksTypewriter_WordIndex>(0);
  const wordIndex: Blocks_Typewriter_Index_BlocksTypewriter_WordIndex = wordIndexState[0];
  const setWordIndex: Blocks_Typewriter_Index_BlocksTypewriter_SetWordIndex = wordIndexState[1];

  const charIndexState: Blocks_Typewriter_Index_BlocksTypewriter_CharIndexState = useState<Blocks_Typewriter_Index_BlocksTypewriter_CharIndex>(0);
  const charIndex: Blocks_Typewriter_Index_BlocksTypewriter_CharIndex = charIndexState[0];
  const setCharIndex: Blocks_Typewriter_Index_BlocksTypewriter_SetCharIndex = charIndexState[1];

  const phaseState: Blocks_Typewriter_Index_BlocksTypewriter_PhaseState = useState<Blocks_Typewriter_Index_BlocksTypewriter_Phase>('typing');
  const phase: Blocks_Typewriter_Index_BlocksTypewriter_Phase = phaseState[0];
  const setPhase: Blocks_Typewriter_Index_BlocksTypewriter_SetPhase = phaseState[1];

  const typeSpeed: Blocks_Typewriter_Index_BlocksTypewriter_TypeSpeed = props['typeSpeed'] ?? 80;
  const deleteSpeed: Blocks_Typewriter_Index_BlocksTypewriter_DeleteSpeed = props['deleteSpeed'] ?? 50;
  const pauseDuration: Blocks_Typewriter_Index_BlocksTypewriter_PauseDuration = props['pauseDuration'] ?? 3000;
  const loop: Blocks_Typewriter_Index_BlocksTypewriter_Loop = props['loop'] ?? true;

  const currentWord: Blocks_Typewriter_Index_BlocksTypewriter_CurrentWord = words[wordIndex] ?? '';
  const displayText: Blocks_Typewriter_Index_BlocksTypewriter_DisplayText = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timeout: Blocks_Typewriter_Index_BlocksTypewriter_Timeout = undefined;

    if (phase === 'typing') {
      if (charIndex < currentWord.length) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex + 1);

          return undefined;
        }, typeSpeed);
      } else {
        setPhase('pausing');
      }
    } else if (phase === 'pausing') {
      const isLastWord: Blocks_Typewriter_Index_BlocksTypewriter_IsLastWord = wordIndex === words.length - 1;

      if (loop === false && isLastWord === true) {
        timeout = setTimeout(() => {
          setPhase('done');

          return undefined;
        }, pauseDuration);
      } else {
        timeout = setTimeout(() => {
          setPhase('deleting');

          return undefined;
        }, pauseDuration);
      }
    } else if (phase === 'deleting') {
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setCharIndex(charIndex - 1);

          return undefined;
        }, deleteSpeed);
      } else {
        setPhase('gap');
      }
    } else if (phase === 'gap') {
      timeout = setTimeout(() => {
        setWordIndex((wordIndex + 1) % words.length);
        setCharIndex(0);
        setPhase('typing');

        return undefined;
      }, 200);
    }

    return () => {
      clearTimeout(timeout);

      return undefined;
    };
  }, [
    charIndex,
    currentWord,
    deleteSpeed,
    loop,
    pauseDuration,
    phase,
    typeSpeed,
    wordIndex,
    words,
  ]);

  return (
    <span
      className={(props['className'] !== undefined) ? `nova-typewriter ${props['className']}` : 'nova-typewriter'}
      style={props['style']}
    >
      {words.map((measureWord: Blocks_Typewriter_Index_BlocksTypewriter_MeasureWord, measureIndex: Blocks_Typewriter_Index_BlocksTypewriter_MeasureIndex) => (
        <span key={measureIndex} className="nova-typewriter-measure" aria-hidden="true">
          {renderedChildren}
          {measureWord}
        </span>
      ))}
      <span className="nova-typewriter-visible">
        {renderedChildren}
        <span className="nova-typewriter-words">{displayText}</span>
      </span>
    </span>
  );
}

BlocksTypewriter.Prefix = BlocksTypewriterPrefix;
BlocksTypewriter.Word = BlocksTypewriterWord;

export default BlocksTypewriter;
