// form testing

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import faker from 'faker'
import {build} from '@jackfranklin/test-data-bot'

import Login from '../../components/login'

// const buildLoginForm = ({username, password} = {}) => {
//   return {
//     username: username ?? faker.internet.userName(),
//     password: password ?? faker.internet.password(),
//   }
// }

const buildLoginForm = build('LoginForm', {
  fields: {
    username: faker.internet.userName(),
    password: faker.internet.password(),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByRole('textbox', {name: /username/i})
  const passwordinput = screen.getByLabelText(/Password/i)
  const submitButton = screen.getByRole('button', {name: /submit/i})

  const {username, password} = buildLoginForm()

  await userEvent.type(usernameInput, username)
  await userEvent.type(passwordinput, password)
  await userEvent.click(submitButton)

  expect(handleSubmit).toHaveBeenCalledTimes(1)
  expect(handleSubmit).toHaveBeenCalledWith({
    username,
    password,
  })
})
