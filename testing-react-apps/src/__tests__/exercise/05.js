// mocking HTTP requests

import * as React from 'react'
import {render, screen, waitForElementToBeRemoved} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {build, fake} from '@jackfranklin/test-data-bot'
import {rest} from 'msw'
import {setupServer} from 'msw/node'
import {handlers} from 'test/server-handlers'

import Login from '../../components/login-submission'

const ENDPOINT = 'https://auth-provider.example.com/api/login'

const buildLoginForm = build({
  fields: {
    username: fake(f => f.internet.userName()),
    password: fake(f => f.internet.password()),
  },
})
const server = setupServer(...handlers)

describe('login-submission', () => {
  beforeAll(() => server.listen())
  afterEach(() => server.resetHandlers())
  afterAll(() => server.close())

  test(`logging in displays the user's username on success`, async () => {
    render(<Login />)
    const {username, password} = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/username/i), username)
    await userEvent.type(screen.getByLabelText(/password/i), password)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(screen.getByLabelText(/loading.../i))

    expect(screen.getByText(username, {exact: false})).toBeInTheDocument()
  })

  test(`logging in displays error message on failure`, async () => {
    render(<Login />)
    const {username} = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/username/i), username)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(screen.getByLabelText(/loading.../i))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
      '"password required"',
    )
  })

  test(`logging in request failed for unknown reason`, async () => {
    const mockErrorMessage = 'Internal error'
    // overrite defualt msw handlers
    server.use(
      rest.post(ENDPOINT, async (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({message: mockErrorMessage})) // mock server fails for some unknown reason
      }),
    )

    render(<Login />)
    const {username, password} = buildLoginForm()

    await userEvent.type(screen.getByLabelText(/username/i), username)
    await userEvent.type(screen.getByLabelText(/password/i), password)
    await userEvent.click(screen.getByRole('button', {name: /submit/i}))

    await waitForElementToBeRemoved(screen.getByLabelText(/loading.../i))

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByRole('alert').textContent).toMatchInlineSnapshot(
      `"${mockErrorMessage}"`,
    )
  })
})
