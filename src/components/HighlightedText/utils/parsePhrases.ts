import HighlightedTextObject from '../HighlightedTextObject';

const parsePhrases = (
  text: string,
  orderedHighlights: { startOffset: number; endOffset: number; color: string; priority: number }[],
): Map<number, Record<string, any>> => {
  const output = new Map();

  console.log(orderedHighlights);
  orderedHighlights.forEach((highlight) => {
    const { startOffset, endOffset, color, priority } = highlight;
    const phraseIndex = startOffset;

    const string = text.slice(startOffset, endOffset + 1).replace(/\s/, ' ');
    const words = string.split(' ');

    // console.log(words);
    let wordOffset = 0;

    words.forEach((word: string) => {
      if (word === '') {
        return;
      }

      const wordIndex = text.indexOf(word, phraseIndex + wordOffset);
      wordOffset = word.length;
      const phrasesArray = [];
      const idx = `${phraseIndex}-${endOffset}`;
      const phraseObject: Record<string, any> = {};
      phraseObject[idx] = string;
      phrasesArray.push(phraseObject);

      if (!output.has(wordIndex)) {
        output.set(
          wordIndex,
          new HighlightedTextObject(word, phrasesArray, color, 'textBlack', wordIndex, priority),
        );
      } else {
        output.get(wordIndex).update(color, phraseObject);
      }
    });
  });

  return output;
};

export default parsePhrases;
