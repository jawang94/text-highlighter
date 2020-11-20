/* eslint-disable consistent-return */

const deferWhitespaceCreation = (endOffset: number, remainingHighlights: any): any => {
  for (let i = 1; i < remainingHighlights.length; i += 1) {
    if (remainingHighlights[i].value.startOffset < endOffset) {
      return remainingHighlights[i];
    }
  }

  console.log('remainingHighlights', remainingHighlights);
  return false;
};

export default deferWhitespaceCreation;
