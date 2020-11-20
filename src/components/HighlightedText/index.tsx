import React, { useState, useEffect } from 'react';

import highlightPhrases from './utils/highlightPhrases';
import parsePhrases from './utils/parsePhrases';
import orderHighlights from './utils/orderHighlights';
import type HighlightedTextObject from './HighlightedTextObject';

export interface IProps {
  text: string;
  highlights: { startOffset: number; endOffset: number; color: string; priority: number }[];
}

interface IState {
  orderedHighlights: Record<string, string | number>[];
  highlightsMap: Map<number, HighlightedTextObject>;
  highlightedPhrasesArray: any[];
  result: string | any[];
  regexMatchSymbols: RegExp;
}

function HighlightedText({ text, highlights }: IProps): JSX.Element {
  const [state, updateState] = useState<IState>({
    orderedHighlights: [],
    highlightsMap: new Map(),
    highlightedPhrasesArray: [],
    result: '',
    regexMatchSymbols: /[.,/#!$%^&*;:{}=_`~()]/g,
  });

  useEffect(() => {
    const orderedHighlights = orderHighlights(highlights);
    const highlightsMap = parsePhrases(text, orderedHighlights);
    const highlightedPhrasesArray = highlightPhrases(text, highlightsMap);
    console.log('result', highlightedPhrasesArray);
    updateState((currentState: IState) => {
      return {
        ...currentState,
        orderedHighlights,
        highlightsMap,
        highlightedPhrasesArray,
        result: highlightedPhrasesArray,
      };
    });
  }, [highlights, text]);

  return (
    <div>
      <div>{state.result}</div>
    </div>
  );
}

export default HighlightedText;
