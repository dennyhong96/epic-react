// simple test with ReactDOM

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {createRoot} from 'react-dom/client'
import Counter from '../../components/counter'

// NOTE: this is a new requirement in React 18
// https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html#configuring-your-testing-environment
// Luckily, it's handled for you by React Testing Library :)
global.IS_REACT_ACT_ENVIRONMENT = true

test('counter increments and decrements when the buttons are clicked', () => {
  // render the component
  const container = document.createElement('div')
  document.body.append(container)
  const root = createRoot(container)
  act(() => {
    root.render(<Counter />)
  })

  // get elements
  const incrementButton = container.querySelector(
    'button[data-testid="increment"]',
  )
  const decrementButton = container.querySelector(
    'button[data-testid="decrement"]',
  )
  const message = container.querySelector('div[data-testid="message"]')

  // act and assert
  expect(message.textContent).toBe(`Current count: 0`)

  const clickEvent = new MouseEvent('click', {
    bubbles: true, // must bubble because react uses event delegation ender the hook
    cancelable: true,
    button: 0, // left click
  })

  act(() => {
    incrementButton.dispatchEvent(clickEvent)
  })
  expect(message.textContent).toBe(`Current count: 1`)
  act(() => {
    decrementButton.dispatchEvent(clickEvent)
  })
  expect(message.textContent).toBe(`Current count: 0`)

  // clean up
  container.remove()
  // If you don't cleanup, then it could impact other tests and/or cause a memory leak
})
