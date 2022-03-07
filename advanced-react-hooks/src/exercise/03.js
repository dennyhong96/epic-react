// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from "react";

const CountContext = React.createContext();

function CountDisplay() {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>;
}

function Counter() {
  const [, setCount] = useCount();
  const increment = () => setCount(c => c + 1);
  return <button onClick={increment}>Increment count</button>;
}

function useCount() {
  const value = React.useContext(CountContext);
  if (!value) {
    throw new Error(
      "useCount must be used in a component wrapped in <CountContext.Provider/>",
    );
  }
  return value;
}

function CountProvider({children}) {
  const [count, setCount] = React.useState(0);
  return (
    <CountContext.Provider value={[count, setCount]}>
      {children}
    </CountContext.Provider>
  );
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  );
}

export default App;
