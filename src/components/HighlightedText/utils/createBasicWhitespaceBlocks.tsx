/* eslint-disable no-nested-ternary */
import React from 'react';

import BasicWhitespaceBlock from '../BasicWhitespaceBlock';

interface IProps {
  index: number;
  word: string;
  highlightColor: string;
  textColor: string;
  endOffset: number;
  nextIndex: number;
  deferWhitespace: any;
}

// This method decides whether we want to return a whitespace block of the same highlight color as the current word or,
// we use the highlight color of a "parent phrase" (which is why we have deferWhitespace) or,
// we return a default whitespace with no highlight.
const createBasicWhitespaceBlocks = ({
  index,
  word,
  highlightColor,
  textColor,
  endOffset,
  nextIndex,
  deferWhitespace,
}: IProps): JSX.Element => {
  // If the nextIndex is still within boundaries of the current phrase, we can assume the following whitespace is the same color.
  // Else if, outside of boundary, check if the following whitespace inherits color from a previously running "wrapper phrase".
  // Else, we can assume that the whitespace should be set to default.
  // ! Realized in my submission, I had a potential bug where I operated nextIndex <= endOffset + 1 to account for whitespace buffer. First ternary should never be allowed to go past endOffset.
  // ! Instead, we minus the whitespace buffer we added to nextIndex and keep endOffset fixed. This will tell us if the next whitespace is within boundary of the current phrase.
  return (
    <>
      {nextIndex - 1 <= endOffset ? (
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
    </>
  );
};

export default createBasicWhitespaceBlocks;
