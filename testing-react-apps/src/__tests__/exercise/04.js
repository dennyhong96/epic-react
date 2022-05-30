// form testing

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'

import Login from '../../components/login'

// const buildLoginForm = ({username, password} = {}) => {
//   return {
//     username: username ?? faker.internet.userName(),
//     password: password ?? faker.internet.password(),
//   }
// }

// Use generated fake data to communicate that this data doesn't matter
// to whether a test should pass or fail
const buildLoginForm = build('LoginForm', {
  fields: {
    // Returns new test data everytime `buildLoginForm` is called
    username: fake(faker => faker.internet.userName()),
    password: fake(faker => faker.internet.password()),
  },
})

test('submitting the form calls onSubmit with username and password', async () => {
  const handleSubmit = jest.fn()

  render(<Login onSubmit={handleSubmit} />)

  const usernameInput = screen.getByRole('textbox', {name: /username/i})

  // password type input doesn't have a role for security reasons
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
