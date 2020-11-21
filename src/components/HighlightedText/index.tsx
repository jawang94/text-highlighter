import React, { useEffect, useState } from 'react';

import highlightPhrases from './utils/highlightPhrases';
import orderHighlights from './utils/orderHighlights';
import parsePhrases from './utils/parsePhrases';

import type HighlightedTextObject from './HighlightedTextObject';

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

  return <div className="body-text">{state.result}</div>;
}

export default HighlightedText;

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
