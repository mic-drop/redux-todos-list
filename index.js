const ADD_TODO = {
  type: "ADD_TODO",
  todo: {
    id: 0,
    name: "Learn Redux",
    complete: false,
  },
};

const REMOVE_tODO = {
  type: "REMOVE_tODO",
  id: 0,
};

const TOGGLE_TODO = {
  type: "TOGGLE_TODO",
  id: 0,
};

const ADD_GOAL = {
  type: "ADD_GOAL",
  id: 0,
};

const REMOVE_GOAL = {
  type: "REMOVE_GOAL",
  id: 0,
};

function todos(state = [], action) {
  if (action.type === "ADD_TODO") {
    return state.concat([action.todo]);
  }
  return state;
}

function createStore() {
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
    state = todos(state, action);
    listeners.forEach((listener) => listener());
  };
  //
  return {
    getState,
    subscribe,
    dispatch,
  };
}

const store = createStore();
const unsubscribe = store.subscribe(() => {
  console.log("The new state is: ", store.getState());
});

store.dispatch(ADD_TODO);

const finalUnsub = store.subscribe(() => {
  console.log("another listener just because");
});
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 1,
    name: "Learn pure functions",
    complete: true,
  },
});

finalUnsub();
store.dispatch({
  type: "ADD_TODO",
  todo: {
    id: 2,
    name: "Learn React-Redux",
    complete: false,
  },
});
