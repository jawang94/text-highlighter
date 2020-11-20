/* eslint-disable no-nested-ternary */
import React from 'react';

import BasicWhitespaceBlock from '../BasicWhitespaceBlock';
import HighlightedTextBlock from '../HighlightedTextBlock';
import deferWhitespaceCreation from './deferWhitespaceCreation';

interface IProps {
  index: number;
  word: string;
  highlightColor: string;
  textColor: string;
  startOffset: number;
  endOffset: number;
  remainingHighlights: any[];
  highlightedPhrasesArray: any[];
}

const createTextBlocks = ({
  index,
  word,
  highlightColor,
  textColor,
  startOffset,
  endOffset,
  remainingHighlights,
  highlightedPhrasesArray,
}: IProps): any[] => {
  let idx = 0;

  // highlightedPhrasesArray comes in as the entirely sliced input text data
  const textBlockArray = highlightedPhrasesArray.slice();

  for (let i = 0; i < textBlockArray.length; i += 1) {
    const currentWord = textBlockArray[i] === '' ? ' ' : textBlockArray[i];
    const incrementIdx = currentWord.length > 1 ? currentWord.length + 1 : currentWord.length;
    const nextIdx = idx + incrementIdx;
    const deferWhitespace = deferWhitespaceCreation(startOffset, endOffset, remainingHighlights);

    // console.log('temparr of i', textBlockArray[i], endOffset);

    if (index === idx) {
      const el = (
        <span key={`${index}-${word}-span`}>
          <HighlightedTextBlock
            key={`${index}-${word}`}
            state={{ highlightColor, textColor, content: textBlockArray[i], key: index }}
          />
          {nextIdx < endOffset ? (
            <BasicWhitespaceBlock
              key={`${index}-${word}-'space'-${highlightColor}`}
              state={{ highlightColor, textColor, key: index }}
            />
          ) : deferWhitespace !== false ? (
            <BasicWhitespaceBlock
              key={`${index}-${word}-'space'-${deferWhitespace.value.highlightColor}`}
              state={{
                highlightColor: deferWhitespace.value.highlightColor,
                textColor: deferWhitespace.value.textColor,
                key: `${index}-${word}-'space'-${deferWhitespace.value.highlightColor}`,
              }}
            />
          ) : (
            <BasicWhitespaceBlock
              key={`${index}-${word}-'space-transparent'`}
              state={{
                highlightColor: 'transparent',
                textColor: 'black',
                key: `${index}-${word}-'space-transparent'`,
              }}
            />
          )}
        </span>
      );
      textBlockArray[i] = { element: el, length: word.length };
      // console.log(tempArr[i]);
      return textBlockArray;
    }

    idx = nextIdx;
  }

  return textBlockArray;
};

export default createTextBlocks;
