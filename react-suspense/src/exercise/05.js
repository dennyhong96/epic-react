// Suspense Image
// http://localhost:3000/isolated/exercise/05.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonInfoFallback,
  PokemonForm,
  PokemonDataView,
  PokemonErrorBoundary,
  getImageUrlForPokemon,
} from '../pokemon'
import {createResource, preloadImage} from '../utils'

// window.useRealAPI = true

const PokemonInfo = React.lazy(() =>
  import('../lazy/pokemon-info-render-as-you-fetch'),
)

// ❗❗❗❗
// 🦉 On this one, make sure that you UNCHECK the "Disable cache" checkbox
// in your DevTools "Network Tab". We're relying on that cache for this
// approach to work!
// ❗❗❗❗

const imgSrcResourceCache = {}

const getImagePokemonResource = src => {
  let resource = imgSrcResourceCache[src]
  if (!resource) {
    resource = createResource(preloadImage(src))
    imgSrcResourceCache[src] = resource
  }
  return resource
}

const Img = ({src, alt, ...restProps}) => {
  let resource = imgSrcResourceCache[src]
  if (!resource) {
    resource = createResource(preloadImage(src))
    imgSrcResourceCache[src] = resource
  }
  // This will use the Suspense higher up in the component tree
  return <img src={resource.read()} alt={alt} {...restProps} />
}

// function PokemonInfo({pokemonResource}) {
//   const pokemon = pokemonResource.data.read()
//   return (
//     <div>
//       <div className="pokemon-info__img-wrapper">
//         {/* <Img src={pokemon.image} alt={pokemon.name} /> */}
//         <img src={pokemonResource.image.read()} alt={pokemon.name} />
//       </div>
//       <PokemonDataView pokemon={pokemon} />
//     </div>
//   )
// }

const SUSPENSE_CONFIG = {
  timeoutMs: 4000,
  busyDelayMs: 300,
  busyMinDurationMs: 700,
}

const pokemonResourceCache = {}

function getPokemonResource(name) {
  const nameLowerCase = name.toLowerCase()
  let resource = pokemonResourceCache[nameLowerCase]
  if (!resource) {
    resource = createPokemonResource(nameLowerCase)
    pokemonResourceCache[nameLowerCase] = resource
  }
  return resource
}

function createPokemonResource(pokemonName) {
  return {
    data: createResource(fetchPokemon(pokemonName)),
    image: createResource(preloadImage(getImageUrlForPokemon(pokemonName))),
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const [startTransition, isPending] = React.useTransition(SUSPENSE_CONFIG)
  const [pokemonResource, setPokemonResource] = React.useState(null)

  React.useEffect(() => {
    if (!pokemonName) {
      setPokemonResource(null)
      return
    }
    startTransition(() => {
      setPokemonResource(getPokemonResource(pokemonName))
    })
  }, [pokemonName, startTransition])

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
