// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";

// A custom hook is a JavaScript function that uses one or more React built-in or custom hooks
function useLocalStorageState(
  initialState,
  localStorageKey,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  console.log("rerenders");
  const [state, setState] = React.useState(getInitialState);
  // Although initial value passed into useState is not used for subsequent re-renders
  // the expression is still being evaluated(ran), and that could be a performance bottleneck

  // Pass a callback(lazy initializer) that returns initial state as the initial value
  // the lazy initializer is only ran on the initial render, subsequent updates does not trigger it
  // This is a useful technique when we need to do expensive calculation for initial state value
  // Creating the lazy initializer itself also cost resource, only use this for heavy computations
  function getInitialState() {
    console.log("getInitialState run");
    const value = localStorage.getItem(localStorageKey);
    try {
      if (value) return deserialize(value);
      return typeof initialState === "function" ? initialState() : initialState;
    } catch (error) {
      // deserialize could throw
      return typeof initialState === "function" ? initialState() : initialState;
    }
  }

  const prevKeyRef = React.useRef(localStorageKey);
  React.useEffect(() => {
    console.log("useEffect");
    const prevKey = prevKeyRef.current;
    if (prevKey !== localStorageKey) localStorage.removeItem(prevKey); // key changed, need to delete old key value pair
    prevKeyRef.current = localStorageKey; // update key
    localStorage.setItem(localStorageKey, serialize(state));
  }, [state, localStorageKey, serialize]); // objects in deps list is compared with === (identity)
  // When deps array is omitted, the effect callback is run everytime Greeting
  // is render/re-rendered, this includes when the parent component rerenders

  return [state, setState];
}

function Greeting({initialName = ""}) {
  // 🐨 initialize the state to the value from localStorage
  const [name, setName] = useLocalStorageState(initialName, "name");

  function handleChange(event) {
    const newName = event.target.value;
    setName(newName);
  }
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : "Please type your name"}
    </div>
  );
}

function App() {
  const [count, setCount] = React.useState(0);
  return (
    <React.Fragment>
      <button onClick={() => setCount(prev => prev + 1)}>{count}</button>
      <Greeting initialName="Denny" />
    </React.Fragment>
  );
}

export default App;
