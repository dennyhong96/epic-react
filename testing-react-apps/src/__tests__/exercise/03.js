// Avoid implementation details

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Counter from '../../components/counter'

test('counter increments and decrements when the buttons are clicked', async () => {
  render(<Counter />)

  // User is looking at the text of the button
  const decrement = screen.getByRole('button', {name: /decrement/i})
  const increment = screen.getByRole('button', {name: /increment/i})
  const message = screen.getByText(/Current count:/)

  expect(message).toHaveTextContent('Current count: 0')

  // userEvent simulates a user's actions more closely than fireEvent
  // for example, userEvent.click works for click, mouse up, mouse down, etc events
  await userEvent.click(increment)
  expect(message).toHaveTextContent('Current count: 1')

  await userEvent.click(decrement)
  expect(message).toHaveTextContent('Current count: 0')
})
