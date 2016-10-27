// ---------------------------------------------------------------------------
// Modified from Redux Todo List Example
// Source: http://redux.js.org/docs/basics/ExampleTodoList.html
// ---------------------------------------------------------------------------

import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

const todoApp = combineReducers({
  todos,
  visibilityFilter
})

export default todoApp
