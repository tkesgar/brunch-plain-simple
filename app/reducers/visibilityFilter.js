// ---------------------------------------------------------------------------
// Modified from Redux Todo List Example
// Source: http://redux.js.org/docs/basics/ExampleTodoList.html
// ---------------------------------------------------------------------------

const visibilityFilter = (state = 'SHOW_ALL', action) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

export default visibilityFilter
