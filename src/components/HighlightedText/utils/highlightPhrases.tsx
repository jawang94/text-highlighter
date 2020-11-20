/* eslint-disable react/no-array-index-key */
import React from 'react';

import createTextBlocks from './createTextBlocks';

import HighlightedTextObject from '../HighlightedTextObject';

const highlightPhrases = (
  text: string,
  highlightsMap: Map<number, HighlightedTextObject>,
): any[] => {
  let highlightedPhrasesArray: any = text.split(' ');
  const highlightsMapToArray = Array.from(highlightsMap).map(([key, value]) => ({ key, value }));

  for (let i = 0; i < highlightsMapToArray.length; i += 1) {
    const {
      key,
      value: { content, highlightColor, textColor, endOffset, startOffset },
    } = highlightsMapToArray[i];
    const remainingHighlights = highlightsMapToArray.slice(i);
    console.log('remainingHighlights', remainingHighlights);

    const textBlockProps = {
      index: key,
      word: content,
      highlightColor,
      textColor,
      startOffset,
      endOffset,
      remainingHighlights,
      highlightedPhrasesArray,
    };

    highlightedPhrasesArray = createTextBlocks(textBlockProps);
  }

  // Finish processing results array which will render our components
  highlightedPhrasesArray.forEach((stringOrTextBlock: string | any, i: number) => {
    if (typeof stringOrTextBlock === 'object') {
      highlightedPhrasesArray[i] = stringOrTextBlock.element;
    } else if (stringOrTextBlock === '') {
      // console.log('else if', stringOrTextBlock);
      highlightedPhrasesArray[i] = (
        <span style={{ color: 'transparent' }} key={i + highlightedPhrasesArray[i]}>
          _
        </span>
      );
    } else {
      // console.log('else', stringOrTextBlock);
      highlightedPhrasesArray[i] = (
        <span key={i + highlightedPhrasesArray[i]}> {highlightedPhrasesArray[i]} </span>
      );
    }
  });

  return highlightedPhrasesArray;
};

export default highlightPhrases;
