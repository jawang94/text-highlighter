import React, { useState, useEffect } from 'react';

import highlightPhrases from './utils/highlightPhrases';
import parsePhrases from './utils/parsePhrases';
import orderHighlights from './utils/orderHighlights';

export interface IProps {
  text: string;
  highlights: { startOffset: number; endOffset: number; color: string; priority: number }[];
}

interface IState {
  orderedHighlights: Record<string, string | number>[];
  highlightsMap: Map<number, Record<string, any>>;
  highlightedPhrasesArray: any[];
  result: string;
}

function HighlightedText({ text, highlights }: IProps): JSX.Element {
  const [state, updateState] = useState<IState>({
    orderedHighlights: [],
    highlightsMap: new Map(),
    highlightedPhrasesArray: [],
    result: '',
  });

  useEffect(() => {
    const orderedHighlights = orderHighlights(highlights);
    const highlightsMap = parsePhrases(text, orderedHighlights);
    const highlightedPhrasesArray = highlightPhrases(highlightsMap);

    updateState((s: IState) => {
      return { ...s, orderedHighlights, highlightsMap, highlightedPhrasesArray };
    });
  }, [highlights, text]);

  console.log('state', state);

  return (
    <div>
      <p>{text}</p>
    </div>
  );
}

export default HighlightedText;
