class HighlightedTextObject {
  content: string;

  phraseArr: Record<string, string>[];

  color: string;

  textColor: string;

  idx: number;

  priority: number;

  // class to create a highlight index for the HightlightDictionary in the HighlightControl
  constructor(
    content: string,
    phraseArr: Record<string, string>[],
    phraseColor: string,
    textColor: string,
    idx: number,
    priority: number,
  ) {
    this.content = content;
    this.phraseArr = phraseArr;
    this.color = phraseColor;
    this.textColor = textColor;
    this.idx = idx;
    this.priority = priority;
  }

  updateColor(phraseColor: string, textColor: string): void {
    this.color = phraseColor;
    this.textColor = textColor;
  }

  // a method to udate an entry in the HighlightDictionary, only updates the color and adds on a class
  update(phraseColor: string, phraseObj: Record<string, string>): void {
    this.color = phraseColor;
    this.phraseArr.push(phraseObj);
  }
}

export default HighlightedTextObject;
