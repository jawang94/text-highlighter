/*
This method checks if another highlight had started before the current highlight and continues after it.
If so, and the current highlight is over at the conclusion of the current word, we can safely assume that the
whitespace immediately following should "defer" to the color of that other highlight.
 */
const deferWhitespaceCreation = (
  startOffset: number,
  endOffset: number,
  remainingHighlights: any,
): any => {
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
