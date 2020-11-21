import './App.css';

import React from 'react';
import rfdc from 'rfdc';

// import { highlights } from '@textio/frontend-interview-data';

import HighlightedText from './components/HighlightedText';

/* 
Caveats: 
  1. Cannot start a phrase on a whitespace or symbol.
  2. Cannot start a phrase in the middle of a word.
  3. Cannot end a phrase in the middle of a word. 
*/

const mockText = 'The golden retriever was much faster than the standard poodle. Woof woof!';
const mockHighlights = [
  { startOffset: 0, endOffset: 3, color: '#DFF094', priority: 10 },
  { startOffset: 4, endOffset: 9, color: '#C2E6FD', priority: 2 },
  { startOffset: 4, endOffset: 23, color: '#E5F39E', priority: 3 },
  { startOffset: 30, endOffset: 36, color: '#E9E9E9', priority: 1 },
  { startOffset: 63, endOffset: 72, color: '#E5CC93', priority: 2 },
  { startOffset: 63, endOffset: 66, color: '#36C5F0', priority: 1 },
];

function App(): JSX.Element {
  // * In order to avoid mutating the original data, we deep clone them before passing down as props.
  const reallyFastDeepClone = rfdc();
  const shallowCopyText = reallyFastDeepClone(mockText);
  const shallowCopyHighlights = reallyFastDeepClone(mockHighlights);

  return (
    <div className="App">
      <h1>Word Highlighter</h1>
      <HighlightedText text={shallowCopyText} highlights={shallowCopyHighlights} />
    </div>
  );
}

export default App;
