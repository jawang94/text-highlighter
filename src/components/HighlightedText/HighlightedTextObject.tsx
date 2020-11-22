interface HighlightedTextObjectProps {
  word: string;
  phrasesArray: Record<string, string>[];
  highlightColor: string;
  textColor: string;
  wordIndex: number;
  priority: number;
  startOffset: number;
  endOffset: number;
}

export default class HighlightedTextObject {
  word: string;

  phrasesArray: Record<string, string>[];

  highlightColor: string;

  textColor: string;

  wordIndex: number;

  priority: number;

  startOffset: number;

  endOffset: number;

  constructor(props: HighlightedTextObjectProps) {
    const {
      word,
      phrasesArray,
      highlightColor,
      textColor,
      wordIndex,
      priority,
      startOffset,
      endOffset,
    } = props;
    this.word = word;
    this.phrasesArray = phrasesArray;
    this.highlightColor = highlightColor;
    this.textColor = textColor;
    this.wordIndex = wordIndex;
    this.priority = priority;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
  }

  updateColor(highlightColor: string, textColor: string): void {
    this.highlightColor = highlightColor;
    this.textColor = textColor;
  }

  // a method to udate an entry in the HighlightDictionary, only updates the color and adds on a class
  update(
    highlightColor: string,
    phraseObj: Record<string, string>,
    startOffset: number,
    endOffset: number,
  ): void {
    this.highlightColor = highlightColor;
    this.startOffset = startOffset;
    this.endOffset = endOffset;
    this.phrasesArray.push(phraseObj);
  }
}
