/* eslint-disable consistent-return */

const deferWhitespaceCreation = (
  startOffset: number,
  endOffset: number,
  remainingHighlights: any,
): any => {
  // Check in the existing items if there is a match that can encapsulate our current offsets.
  // That means, must start on or before current start, and end on or after current end.
  for (let i = 1; i < remainingHighlights.length; i += 1) {
    const remainingItemStartOffset = remainingHighlights[i].value.startOffset;
    const remainingItemEndOffset = remainingHighlights[i].value.endOffset;

    if (remainingItemStartOffset <= startOffset && remainingItemEndOffset >= endOffset) {
      return remainingHighlights[i];
    }
  }

  return false;
};

export default deferWhitespaceCreation;
