// useTransition for improved loading states
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
} from '../pokemon'
import {createResource} from '../utils'

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300, // if the transition takes X amount of time
  busyMinDurationMs: 700, // total time you want the transition state to persist if we surpass the `busyDelayMs` time
}

function PokemonInfo({pokemonResource}) {
  const pokemon = pokemonResource.read()
  console.log({pokemon})
  return (
    <div>
      <div className="pokemon-info__img-wrapper">
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
      <PokemonDataView pokemon={pokemon} />
    </div>
  )
}

// 🐨 create a SUSPENSE_CONFIG variable right here and configure timeoutMs to
// whatever feels right to you, then try it out and tweak it until you're happy
// with the experience.

function createPokemonResource(pokemonName) {
  // 🦉 once you've finished the exercise, play around with the delay...
  // the second parameter to fetchPokemon is a delay so you can play around
  // with different timings
  let delay = 1500
  // try a few of these fetch times:
  // shows busy indicator
  delay = 450

  // shows busy indicator, then suspense fallback
  delay = 5000

  // shows busy indicator for a split second
  // 💯 this is what the extra credit improves
  delay = 200
  return createResource(fetchPokemon(pokemonName, delay))
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG) // show 'isPending' state 4000ms before react falls back to fallback state
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      // triggers `isPending` state to become true
      setPokemonResource(createPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition])

  console.log({isPending})

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className={`pokemon-info ${isPending ? 'pokemon-loading' : ''}`}>
        {pokemonResource ? (
          <PokemonErrorBoundary
            onReset={handleReset}
            resetKeys={[pokemonResource]}
          >
            <React.Suspense
              fallback={<PokemonInfoFallback name={pokemonName} />}
            >
              <PokemonInfo pokemonResource={pokemonResource} />
            </React.Suspense>
          </PokemonErrorBoundary>
        ) : (
          'Submit a pokemon'
        )}
      </div>
    </div>
  )
}

export default App
