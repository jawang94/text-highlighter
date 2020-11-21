/* eslint-disable no-nested-ternary */
import React from 'react';

import HighlightedTextBlock from '../HighlightedTextBlock';
import createBasicWhitespaceBlocks from './createBasicWhitespaceBlocks';
import deferWhitespaceCreation from './deferWhitespaceCreation';

// This method searches for the index of our highlight object word-by-word, and creates the appropriate DOM Elements if found.
// The maximum amount of iterations is log(n) where n is the number of words in the text.
// This is much much more effective than if we were to iterate character-by-character.
// We can achieve this by simply incrementing the index by our current word length.
// * Example: A 73 character string might only contain 10 words. We save 63 iterations!
// ! Note that whitespaces are considered as words here.
const createHighlightedTextBlocks = ({
  index,
  word,
  highlightColor,
  textColor,
  startOffset,
  endOffset,
  remainingHighlights,
  highlightedPhrasesArray,
}: IProps): any[] => {
  // We slice the highlightedPhrasesArray to prevent mutating the original.
  const textBlockArray = highlightedPhrasesArray.slice();
  let currentIndex = 0;

  for (let i = 0; i < textBlockArray.length; i += 1) {
    const currentWord = textBlockArray[i];
    const incrementIndexBy = currentWord.length > 1 ? currentWord.length + 1 : currentWord.length;
    const nextIndex = currentIndex + incrementIndexBy;
    const deferWhitespace = deferWhitespaceCreation(startOffset, endOffset, remainingHighlights);
    const createWhitespaceProps = {
      index,
      word,
      highlightColor,
      textColor,
      endOffset,
      nextIndex,
      deferWhitespace,
    };

    // Once we hit the index of the word we're highlighting, we create the TextBlock and subsequent WhitespaceBlock.
    if (index === currentIndex) {
      const element = (
        <span key={`${index}-${word}-span`}>
          <HighlightedTextBlock
            key={`${index}-${word}`}
            state={{ highlightColor, textColor, content: textBlockArray[i], key: index }}
          />
          {createBasicWhitespaceBlocks(createWhitespaceProps)}
        </span>
      );

      textBlockArray[i] = { element, length: word.length };
      return textBlockArray;
    }

    currentIndex = nextIndex;
  }

  return textBlockArray;
};

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

export default createHighlightedTextBlocks;
