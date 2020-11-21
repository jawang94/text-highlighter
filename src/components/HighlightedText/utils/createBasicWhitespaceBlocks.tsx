/* eslint-disable no-nested-ternary */
import React from 'react';

import BasicWhitespaceBlock from '../BasicWhitespaceBlock';

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
  return (
    <>
      {nextIndex <= endOffset + 1 ? (
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

interface IProps {
  index: number;
  word: string;
  highlightColor: string;
  textColor: string;
  endOffset: number;
  nextIndex: number;
  deferWhitespace: any;
}

export default createBasicWhitespaceBlocks;
