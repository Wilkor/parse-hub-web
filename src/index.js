import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { applyPolyfills, defineCustomElements } from 'blip-ds/loader';

ReactDOM.render(<App />, document.getElementById('root'));


registerServiceWorker();
applyPolyfills().then(() => {
    defineCustomElements(window);
  });