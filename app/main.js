import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'

import reducer from './reducers'

import App from './components/App'

// ---------------------------------------------------------------------------
// Redux
// ---------------------------------------------------------------------------

// Redux store middlewares
const middlewares = [
  // Insert redux middlewares here
]

// Redux store enhancer
let enhancer
if ('BRUNCH_ENVIRONMENT' === 'development') {
  // Development: Use Redux DevTools extension if available
  let dev = window.devToolsExtension ? window.devToolsExtension() : f => f
  enhancer = compose(applyMiddleware(...middlewares), dev)
} else {
  // Production
  enhancer = applyMiddleware(...middlewares)
}

// Redux store
const store = createStore(reducer, enhancer)

// ---------------------------------------------------------------------------
// Render React
// ---------------------------------------------------------------------------

render((
  <Provider store={store}>
    <App />
  </Provider>
), document.getElementById('app'))
