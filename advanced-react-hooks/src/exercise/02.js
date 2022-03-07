// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from "react";
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from "../pokemon";

function asyncReducer(state, action) {
  switch (action.type) {
    case "pending": {
      return {
        ...state,
        status: "pending",
        data: null,
        error: null,
      };
    }
    case "resolved": {
      return {
        ...state,
        status: "resolved",
        data: action.data,
        error: null,
      };
    }
    case "rejected": {
      return {
        ...state,
        status: "rejected",
        data: null,
        error: action.error,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Safe dispatch, won't cause memory leak when unmount before promise resolves
function useSafeDispatch(dispatch) {
  const mountedRef = React.useRef(false);

  // useLayoutEffect is invoked as soon as component is mounted
  // without waiting for browser to paint the screen,
  // use only when you want to unsure this runs befor anything else
  // or you want to make changes to the DOM before browser paints
  React.useLayoutEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  return React.useCallback(
    (...args) => {
      if (!mountedRef.current) return;
      dispatch(...args);
    },
    [dispatch],
  );
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: "idle",
    data: null,
    error: null,
    ...initialState,
  });
  const dispatch = useSafeDispatch(unsafeDispatch);

  // Only time you have to use useCallback is when the callback is either
  // being use in a dependency list, or it is being passed as prop into
  // a memoized component (via memo)
  const run = React.useCallback(
    promise => {
      if (!promise) return;
      dispatch({type: "pending"});
      promise
        .then(data => dispatch({type: "resolved", data}))
        .catch(error => {
          dispatch({type: "rejected", error});
        });
    },
    [dispatch],
  ); // run function is safe, it will be the smae instance across renders

  return {...state, run};
}

function PokemonInfo({pokemonName}) {
  const {data, status, error, run} = useAsync({
    status: pokemonName ? "pending" : "idle",
  });

  React.useEffect(() => {
    if (!pokemonName) return;
    run(fetchPokemon(pokemonName));
  }, [pokemonName, run]);

  switch (status) {
    case "idle":
      return <span>Submit a pokemon</span>;
    case "pending":
      return <PokemonInfoFallback name={pokemonName} />;
    case "rejected":
      throw error;
    case "resolved":
      return <PokemonDataView pokemon={data} />;
    default:
      throw new Error("This should be impossible");
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  function handleReset() {
    setPokemonName("");
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  );
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true);
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{" "}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  );
}

export default AppWithUnmountCheckbox;
