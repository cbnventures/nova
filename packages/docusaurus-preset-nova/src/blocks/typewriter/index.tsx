import {
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import type {
  BlocksTypewriterCharIndex,
  BlocksTypewriterCharIndexState,
  BlocksTypewriterCurrentWord,
  BlocksTypewriterDeleteSpeed,
  BlocksTypewriterDisplayText,
  BlocksTypewriterIsLastWord,
  BlocksTypewriterLoop,
  BlocksTypewriterMeasureIndex,
  BlocksTypewriterMeasureWord,
  BlocksTypewriterPauseDuration,
  BlocksTypewriterPhase,
  BlocksTypewriterPhaseState,
  BlocksTypewriterPrefixProps,
  BlocksTypewriterProps,
  BlocksTypewriterRenderedChildren,
  BlocksTypewriterSetCharIndex,
  BlocksTypewriterSetPhase,
  BlocksTypewriterSetWordIndex,
  BlocksTypewriterTimeout,
  BlocksTypewriterTypeSpeed,
  BlocksTypewriterWordElement,
  BlocksTypewriterWordIndex,
  BlocksTypewriterWordIndexState,
  BlocksTypewriterWordProps,
  BlocksTypewriterWords,
} from '../../types/blocks/typewriter/index.d.ts';

/**
 * Blocks - Typewriter - Prefix.
 *
 * Semantic wrapper that renders static text inside a typewriter heading
 * with a dedicated CSS class for independent styling.
 *
 * @param {BlocksTypewriterPrefixProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriterPrefix(props: BlocksTypewriterPrefixProps) {
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
 * @param {BlocksTypewriterWordProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriterWord(_props: BlocksTypewriterWordProps) {
  return null;
}

/**
 * Blocks - Typewriter.
 *
 * Compound component that cycles through a list of words with a type-on and
 * delete-off animation. Static content is placed in Prefix children and rotating
 * words are declared with Word children. Timing props control the animation speed.
 *
 * @param {BlocksTypewriterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function BlocksTypewriter(props: BlocksTypewriterProps) {
  const words: BlocksTypewriterWords = [];

  Children.forEach(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === BlocksTypewriterWord) {
      words.push(String((child as BlocksTypewriterWordElement).props['children']));
    }

    return undefined;
  });

  const renderedChildren: BlocksTypewriterRenderedChildren = Children.map(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === BlocksTypewriterWord) {
      return null;
    }

    return child;
  });

  const wordIndexState: BlocksTypewriterWordIndexState = useState<BlocksTypewriterWordIndex>(0);
  const wordIndex: BlocksTypewriterWordIndex = wordIndexState[0];
  const setWordIndex: BlocksTypewriterSetWordIndex = wordIndexState[1];

  const charIndexState: BlocksTypewriterCharIndexState = useState<BlocksTypewriterCharIndex>(0);
  const charIndex: BlocksTypewriterCharIndex = charIndexState[0];
  const setCharIndex: BlocksTypewriterSetCharIndex = charIndexState[1];

  const phaseState: BlocksTypewriterPhaseState = useState<BlocksTypewriterPhase>('typing');
  const phase: BlocksTypewriterPhase = phaseState[0];
  const setPhase: BlocksTypewriterSetPhase = phaseState[1];

  const typeSpeed: BlocksTypewriterTypeSpeed = props['typeSpeed'] ?? 80;
  const deleteSpeed: BlocksTypewriterDeleteSpeed = props['deleteSpeed'] ?? 50;
  const pauseDuration: BlocksTypewriterPauseDuration = props['pauseDuration'] ?? 3000;
  const loop: BlocksTypewriterLoop = props['loop'] ?? true;

  const currentWord: BlocksTypewriterCurrentWord = words[wordIndex] ?? '';
  const displayText: BlocksTypewriterDisplayText = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timeout: BlocksTypewriterTimeout = undefined;

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
      const isLastWord: BlocksTypewriterIsLastWord = wordIndex === words.length - 1;

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
      {words.map((measureWord: BlocksTypewriterMeasureWord, measureIndex: BlocksTypewriterMeasureIndex) => (
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
