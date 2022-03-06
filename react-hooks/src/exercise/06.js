// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from "react";
import {ErrorBoundary} from "react-error-boundary";
import {
  fetchPokemon,
  PokemonDataView,
  PokemonForm,
  PokemonInfoFallback,
} from "../pokemon";

function PokemonInfo({pokemonName}) {
  const [{pokemon, error, status}, setState] = React.useState({
    pokemon: null,
    status: pokemonName ? "pending" : "idle",
    error: null,
  });

  React.useEffect(() => {
    if (!pokemonName) return;
    setState({
      pokemon: null,
      error: null,
      status: "pending",
    });
    fetchPokemon(pokemonName)
      .then(pokemonData => {
        // React cannot batch state updates in async function, combine pieces of
        // state into object to prevent multiple renders caused by multiple state updates
        setState({
          pokemon: pokemonData,
          status: "resolved",
          error: null,
        });
      })
      .catch(err => {
        setState({
          error: err,
          status: "rejected",
          pokemon: null,
        });
      });
  }, [pokemonName]);

  if (status === "idle") return "Submit a pokemon";

  if (status === "rejected") throw error; // handled by ErrorBoundary

  if (status === "pending") {
    return <PokemonInfoFallback name={pokemonName} />; // Loading...
  }

  // status === 'resolved
  return <PokemonDataView pokemon={pokemon} />;
}

function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      There was an error:{" "}
      <pre style={{whiteSpace: "normal"}}>{error.message}</pre>
      <button type="button" onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

function App() {
  const [pokemonName, setPokemonName] = React.useState("");

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName);
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        {/* Provide a key to a compoennt, when key changes, it unmounts and remounts, the state of component is reset */}
        <ErrorBoundary
          FallbackComponent={ErrorFallback}
          onReset={() => setPokemonName("")}
          resetKeys={[pokemonName]}
        >
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  );
}

export default App;
