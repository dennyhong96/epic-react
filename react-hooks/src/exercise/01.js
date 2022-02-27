// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Greeting({initialName = ''}) {
  // let name = ''
  // Doesn't work because with regular variables Greeting is only getting called one time
  // when we update name with name = "xxx", the component doesn't re-render

  const [name, setName] = React.useState(initialName)
  // With useState hook, when we call setName with a value, react re-render the component
  // for us, in the new render, the name state's value will be the value we called setName with

  function handleChange(event) {
    // 🐨 update the name here based on event.target.value
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Denny" />
}

export default App
