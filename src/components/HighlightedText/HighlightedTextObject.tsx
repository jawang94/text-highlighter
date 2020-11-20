class HighlightedTextObject {
  content: string;

  phraseArr: Record<string, string>[];

  highlightColor: string;

  textColor: string;

  idx: number;

  priority: number;

  startOffset: number;

  endOffset: number;

  // class to create a highlight index for the HightlightDictionary in the HighlightControl
  constructor(
    content: string,
    phraseArr: Record<string, string>[],
    highlightColor: string,
    textColor: string,
    idx: number,
    priority: number,
    startOffset: number,
    endOffset: number,
  ) {
    this.content = content;
    this.phraseArr = phraseArr;
    this.highlightColor = highlightColor;
    this.textColor = textColor;
    this.idx = idx;
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
    this.phraseArr.push(phraseObj);
  }
}

export default HighlightedTextObject;
