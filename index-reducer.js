const ADD_TODO = "ADD_TODO";

const REMOVE_TODO = "REMOVE_tODO";

const TOGGLE_TODO = "TOGGLE_TODO";

const ADD_GOAL = "ADD_GOAL";

const REMOVE_GOAL = "REMOVE_GOAL";

//Reducer function becausenis taking in a state and an action and its reducing those two things to a brand  new state
function todos(state = [], action) {
  switch (action.type) {
    case ADD_TODO:
      return state.concat([action.todo]);
    case REMOVE_TODO:
      return state.filter((todo) => todo.id !== action.id);
    case TOGGLE_TODO:
      return state.map(
        (todo) =>
          todo.id !== action.id
            ? todo
            : Object.assign({}, todo, { complete: !todo.complete }) //target(newObject) src(oldObject) modify just one property
      );
    default:
      return state;
  }
}

function goals(state = [], action) {
  switch (action.type) {
    case ADD_GOAL:
      return state.concat([action.goal]);
    case REMOVE_GOAL:
      return state.filter((goal) => goal.id !== action.id);
    default:
      return state;
  }
}

//Kind of like a root reducer that keeps track for both reducer states
function app(state = {}, action) {
  return {
    todos: todos(state.todos, action),
    goals: goals(state.goals, action),
  };
}

function createStore(reducer) {
  //The store should have 4 part
  //1- The State
  let state;
  let listeners = [];

  //2- Get the State
  const getState = () => state;

  //3-Listen to changes on the state
  const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  };

  //4- Update the state
  dispatch = (action) => {
    //state = reducer(state, action);
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
  };
  //
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore(app);
const unsubscribe = store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

const finalUnsub = store.subscribe(() => {
  console.log("another listener just because");
});
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 0,
    name: "Learn pure functions",
    complete: true,
  },
});

finalUnsub();
store.dispatch({
  type: ADD_TODO,
  todo: {
    id: 1,
    name: "Learn React-Redux",
    complete: false,
  },
});

store.dispatch({
  type: TOGGLE_TODO,
  id: 0,
});

store.dispatch({
  type: REMOVE_TODO,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 0,
    name: "Climb Mount Everest",
  },
});

store.dispatch({
  type: REMOVE_GOAL,
  id: 0,
});

store.dispatch({
  type: ADD_GOAL,
  goal: {
    id: 1,
    name: "Date Tom Hardy",
  },
});

console.log(store.getState().todos);
console.log(store.getState().goals);
