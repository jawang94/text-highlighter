import HighlightedTextObject from '../HighlightedTextObject';

const parsePhrases = (
  text: string,
  orderedHighlights: { startOffset: number; endOffset: number; color: string; priority: number }[],
): Map<number, HighlightedTextObject> => {
  const highlightsMap = new Map();

  orderedHighlights.forEach((highlight) => {
    const { startOffset, endOffset, color, priority } = highlight;
    let startIndex = startOffset;

    const phrase = text.slice(startOffset, endOffset + 1);
    const wordsArray = phrase.split(' ');
    let wordOffset = 0;
    let phraseIndex = startOffset;

    wordsArray.forEach((word: string) => {
      if (word === '') {
        return;
      }

      const wordIndex = text.indexOf(word, phraseIndex + wordOffset);
      wordOffset = word.length;
      const phrasesArray = [];
      const phraseIndexRange = `${phraseIndex}-${phraseIndex + word.length}`;
      const phraseObject: Record<string, any> = {};
      phraseObject[phraseIndexRange] = phrase;
      phrasesArray.push(phraseObject);

      if (!highlightsMap.has(wordIndex)) {
        highlightsMap.set(
          wordIndex,
          new HighlightedTextObject(word, phrasesArray, color, 'textBlack', wordIndex, priority),
        );
      } else {
        highlightsMap.get(wordIndex).update(color, phraseObject);
      }
      startIndex = phraseIndex + word.length;
      phraseIndex = text.indexOf(word, startIndex);
    });
  });

  return highlightsMap;
};

export default parsePhrases;
