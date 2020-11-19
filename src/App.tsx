import './App.css';

import React from 'react';
import rfdc from 'rfdc';

import { highlights, text } from '@textio/frontend-interview-data';

import HighlightedText from './components/HighlightedText';

// "You will deliver new technology with an adorable puppy. Perfect!"
console.log('Textio string:', text);
// console.log('Textio string length:', text.length);
console.log('Textio highlights:', highlights);

// let s = text.replace(/[\n\r]/g, " -linebreak- ")
// console.log(s)
// const s = text.replace(/\s/, ' ');
// console.log(s.split(' '));

function App(): JSX.Element {
  const reallyFastDeepClone = rfdc();
  const shallowCopyText = reallyFastDeepClone(text);
  const shallowCopyHighlights = reallyFastDeepClone(highlights);

  return (
    <div className="App">
      <h1>Word Highlighter</h1>
      <HighlightedText text={shallowCopyText} highlights={shallowCopyHighlights} />
    </div>
  );
}

export default App;
