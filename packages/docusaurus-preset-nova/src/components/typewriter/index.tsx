import {
  Children,
  isValidElement,
  useEffect,
  useState,
} from 'react';

import type {
  ComponentsTypewriterCharIndex,
  ComponentsTypewriterCharIndexState,
  ComponentsTypewriterCurrentWord,
  ComponentsTypewriterDeleteSpeed,
  ComponentsTypewriterDisplayText,
  ComponentsTypewriterIsLastWord,
  ComponentsTypewriterLoop,
  ComponentsTypewriterMeasureIndex,
  ComponentsTypewriterMeasureWord,
  ComponentsTypewriterPauseDuration,
  ComponentsTypewriterPhase,
  ComponentsTypewriterPhaseState,
  ComponentsTypewriterPrefixProps,
  ComponentsTypewriterProps,
  ComponentsTypewriterRenderedChildren,
  ComponentsTypewriterSetCharIndex,
  ComponentsTypewriterSetPhase,
  ComponentsTypewriterSetWordIndex,
  ComponentsTypewriterTimeout,
  ComponentsTypewriterTypeSpeed,
  ComponentsTypewriterWordElement,
  ComponentsTypewriterWordIndex,
  ComponentsTypewriterWordIndexState,
  ComponentsTypewriterWordProps,
  ComponentsTypewriterWords,
} from '../../types/components/typewriter/index.d.ts';

/**
 * Components - Typewriter - Prefix.
 *
 * Semantic wrapper that renders static text inside a typewriter heading
 * with a dedicated CSS class for independent styling.
 *
 * @param {ComponentsTypewriterPrefixProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsTypewriterPrefix(props: ComponentsTypewriterPrefixProps) {
  return (
    <span className="nova-typewriter-prefix">
      {props['children']}
    </span>
  );
}

/**
 * Components - Typewriter - Word.
 *
 * Data carrier that declares a word for the parent typewriter animation.
 * Renders nothing — the parent extracts text from each word child to
 * build the rotation list.
 *
 * @param {ComponentsTypewriterWordProps} _props - _props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsTypewriterWord(_props: ComponentsTypewriterWordProps) {
  return null;
}

/**
 * Components - Typewriter.
 *
 * Compound component that cycles through a list of words with a type-on and
 * delete-off animation. Static content is placed in Prefix children and rotating
 * words are declared with Word children. Timing props control the animation speed.
 *
 * @param {ComponentsTypewriterProps} props - Props.
 *
 * @constructor
 *
 * @since 0.15.0
 */
function ComponentsTypewriter(props: ComponentsTypewriterProps) {
  const words: ComponentsTypewriterWords = [];

  Children.forEach(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === ComponentsTypewriterWord) {
      words.push(String((child as ComponentsTypewriterWordElement).props['children']));
    }

    return undefined;
  });

  const renderedChildren: ComponentsTypewriterRenderedChildren = Children.map(props['children'], (child) => {
    if (isValidElement(child) === true && child.type === ComponentsTypewriterWord) {
      return null;
    }

    return child;
  });

  const wordIndexState: ComponentsTypewriterWordIndexState = useState<ComponentsTypewriterWordIndex>(0);
  const wordIndex: ComponentsTypewriterWordIndex = wordIndexState[0];
  const setWordIndex: ComponentsTypewriterSetWordIndex = wordIndexState[1];

  const charIndexState: ComponentsTypewriterCharIndexState = useState<ComponentsTypewriterCharIndex>(0);
  const charIndex: ComponentsTypewriterCharIndex = charIndexState[0];
  const setCharIndex: ComponentsTypewriterSetCharIndex = charIndexState[1];

  const phaseState: ComponentsTypewriterPhaseState = useState<ComponentsTypewriterPhase>('typing');
  const phase: ComponentsTypewriterPhase = phaseState[0];
  const setPhase: ComponentsTypewriterSetPhase = phaseState[1];

  const typeSpeed: ComponentsTypewriterTypeSpeed = props['typeSpeed'] ?? 80;
  const deleteSpeed: ComponentsTypewriterDeleteSpeed = props['deleteSpeed'] ?? 50;
  const pauseDuration: ComponentsTypewriterPauseDuration = props['pauseDuration'] ?? 3000;
  const loop: ComponentsTypewriterLoop = props['loop'] ?? true;

  const currentWord: ComponentsTypewriterCurrentWord = words[wordIndex] ?? '';
  const displayText: ComponentsTypewriterDisplayText = currentWord.slice(0, charIndex);

  useEffect(() => {
    let timeout: ComponentsTypewriterTimeout = undefined;

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
      const isLastWord: ComponentsTypewriterIsLastWord = wordIndex === words.length - 1;

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
    <span className="nova-typewriter">
      {words.map((measureWord: ComponentsTypewriterMeasureWord, measureIndex: ComponentsTypewriterMeasureIndex) => (
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

ComponentsTypewriter.Prefix = ComponentsTypewriterPrefix;
ComponentsTypewriter.Word = ComponentsTypewriterWord;

export default ComponentsTypewriter;
