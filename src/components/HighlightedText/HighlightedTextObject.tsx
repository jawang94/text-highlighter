class HighlightedTextObject {
  content: string;

  phraseArr: Record<string, string>[];

  highlightColor: string;

  textColor: string;

  idx: number;

  priority: number;

  // class to create a highlight index for the HightlightDictionary in the HighlightControl
  constructor(
    content: string,
    phraseArr: Record<string, string>[],
    highlightColor: string,
    textColor: string,
    idx: number,
    priority: number,
  ) {
    this.content = content;
    this.phraseArr = phraseArr;
    this.highlightColor = highlightColor;
    this.textColor = textColor;
    this.idx = idx;
    this.priority = priority;
  }

  updateColor(highlightColor: string, textColor: string): void {
    this.highlightColor = highlightColor;
    this.textColor = textColor;
  }

  // a method to udate an entry in the HighlightDictionary, only updates the color and adds on a class
  update(highlightColor: string, phraseObj: Record<string, string>): void {
    this.highlightColor = highlightColor;
    this.phraseArr.push(phraseObj);
  }
}

export default HighlightedTextObject;
