import HighlightedTextObject from '../HighlightedTextObject';

// This method creates a class object `HighlightedTextObject` for each word that has a highlight.
const parsePhrases = (
  text: string,
  orderedHighlights: { startOffset: number; endOffset: number; color: string; priority: number }[],
): Map<number, HighlightedTextObject> => {
  const highlightsMap = new Map();

  // We have two markers, phraseIndex and wordOffset to help us track our position in the text.
  // The phraseIndex tracks where we are currently in the phrase. Slides across as we visit words.
  // The wordOffset saves the length of the previous word (default 0), which tells us how much to shift the phraseIndex by.
  orderedHighlights.forEach((highlight) => {
    const { startOffset, endOffset, color: highlightColor, priority } = highlight;
    const phrase = text.slice(startOffset, endOffset + 1);
    const wordsArray = phrase.split(' ');
    let phraseIndex = startOffset;
    let wordOffset = 0;

    // Go through each word in the phrase, find them in the text, and create a HighlightObject.
    wordsArray.forEach((word: string) => {
      if (word === '') {
        return;
      }
      const wordIndex = text.indexOf(word, phraseIndex + wordOffset);
      const phrasesArray = [];
      const phraseIndexRange = `${startOffset}-${endOffset}`;
      const phraseObject: Record<string, any> = {};
      phraseObject[phraseIndexRange] = phrase;
      phrasesArray.push(phraseObject);

      const highlightedTextObjectProps = {
        word,
        phrasesArray,
        highlightColor,
        textColor: 'black',
        wordIndex,
        priority,
        startOffset,
        endOffset,
      };

      if (!highlightsMap.has(wordIndex)) {
        highlightsMap.set(wordIndex, new HighlightedTextObject(highlightedTextObjectProps));
      } else {
        // ! Note that this is where the orderedHighlights becomes important. We update the highlight if it already exists in our Map.
        // ! This can only happen if an existing highlight is overlapped by a higher priority phrase (aka later in the phrase array).
        highlightsMap.get(wordIndex).update(highlightColor, phraseObject, startOffset, endOffset);
      }

      wordOffset = word.length;
      phraseIndex = text.indexOf(word, phraseIndex + wordOffset);
    });
  });

  return highlightsMap;
};

export default parsePhrases;
