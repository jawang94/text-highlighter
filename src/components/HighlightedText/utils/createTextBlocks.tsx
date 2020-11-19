import React from 'react';
import HighlightedTextBlock from '../HighlightedTextBlock';

interface IProps {
  index: number;
  word: string;
  highlightColor: string;
  textColor: string;
  highlightedPhrasesArray: any[];
}

const createTextBlocks = ({
  index,
  word,
  highlightColor,
  textColor,
  highlightedPhrasesArray,
}: IProps): any[] => {
  let idx = 0;
  console.log('preslice', highlightedPhrasesArray);

  const tempArr = highlightedPhrasesArray.slice();

  console.log('za temparr', tempArr);
  for (let i = 0; i < tempArr.length; i += 1) {
    const temp = tempArr[i] === '' ? ' ' : tempArr[i];

    // console.log(temp,word,idx,index, temp.length)
    if (index === idx) {
      const el = (
        <HighlightedTextBlock
          key={index + word}
          state={{ highlightColor, textColor, content: tempArr[i], key: index }}
        />
      );
      tempArr[i] = { element: el, length: word.length };
      // console.log(tempArr[i]);
      return tempArr;
    }
    idx += temp.length > 1 ? temp.length + 1 : temp.length;
  }

  return tempArr;
};

export default createTextBlocks;
