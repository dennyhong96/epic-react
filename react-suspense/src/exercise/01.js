// Simple Data-fetching
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'
import {
  PokemonDataView,
  fetchPokemon,
  PokemonErrorBoundary,
  PokemonInfoFallback,
} from '../pokemon'

const createResource = promise => {
  let status = 'pending'
  // result will be the promise at first, to be thrown in the component
  let result = promise.then(
    resolved => {
      status = 'success'
      result = resolved // to be returned and used in the component
    },
    rejected => {
      status = 'error'
      result = rejected // to be thrown in the component
    },
  )
  return {
    read() {
      if (status === 'pending' || status === 'error') throw result // throw promise to trigger suspense callback, throw error to trigger error boundary
      return result
    },
  }
}

// We don't need the app to be mounted to know that we want to fetch the pokemon
// let pokemon
// let pokemonError
// let pokemonPromise = fetchPokemon('pikacha')
// pokemonPromise.then(p => (pokemon = p)).catch(e => (pokemonError = e))

const pokemonResource = createResource(fetchPokemon('pikachu'))

function PokemonInfo() {
  // Throws the promise error triggers the ErrorBoundary
  // if (pokemonError) throw pokemonError

  // if there's no pokemon yet, then throw the pokemonPromise which triggers the Suspense fallback
  // when we have the pokemon, react will re-render the component
  // if (!pokemon) throw pokemonPromise

  const pokemon = pokemonResource.read()

  // if the code gets it this far, then the pokemon variable is defined and
  // rendering can continue!
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

function App() {
  return (
    <div className="pokemon-info-app">
      <div className="pokemon-info">
        {/* 🐨 Wrap the PokemonInfo component with a React.Suspense component with a fallback */}
        <PokemonErrorBoundary>
          <React.Suspense fallback={<PokemonInfoFallback name="pikachu" />}>
            <PokemonInfo />
          </React.Suspense>
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
