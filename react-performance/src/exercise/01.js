// Code splitting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

// it doesn't matter how many times "loadGlobe()" is called
// webpack will only actually load the module once, browser will cache the bundle
const loadGlobe = () => import(/* webpackPrefetch: true */ '../globe')
// webpack magic comment `webpackPrefetch: true` generates a <link rel="prefetch" as="script" href="/static/js/1.chunk.js"> in html
// use this when we are confident that user is going to need the <Globe/> bundle when they are on this page

// so when its time for React.lazy to load the bundle, its already cached the ready to use
const Globe = React.lazy(loadGlobe)

function App() {
  const [showGlobe, setShowGlobe] = React.useState(false)

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        height: '100%',
        padding: '2rem',
      }}
    >
      <label
        style={{marginBottom: '1rem'}}
        // Eager loading, load <Glode/> when we have a hint user needs it
        // in this case, when user hovers or focuses on the checkbox
        onMouseEnter={loadGlobe}
        onFocus={loadGlobe}
      >
        <input
          type="checkbox"
          checked={showGlobe}
          onChange={e => setShowGlobe(e.target.checked)}
        />
        {' show globe'}
      </label>
      <div style={{width: 400, height: 400}}>
        {/* Suspense boundary shoule locate closer to where relavent, 
            so we can provide a more meaningful fallback */}
        <React.Suspense fallback={<div>Loading...</div>}>
          {showGlobe ? <Globe /> : null}
        </React.Suspense>
      </div>
    </div>
  )
}
// 🦉 Note that if you're not on the isolated page, then you'll notice that this
// app actually already has a React.Suspense component higher up in the tree
// where this component is rendered, so you *could* just rely on that one.

export default App
