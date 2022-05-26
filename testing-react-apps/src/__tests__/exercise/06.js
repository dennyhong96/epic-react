// mocking Browser APIs and modules

import * as React from 'react'
import {render, screen, act} from '@testing-library/react'

// useCurrentPosition will be mocked version becasue of line11
import {useCurrentPosition} from 'react-use-geolocation'

import Location from '../../examples/location'

jest.mock('react-use-geolocation')

// Create a promise that can be resolved/rejected on demand
function deferred() {
  let resolve, reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return {promise, resolve, reject}
}

// const {promise, resolve, reject} = deferred()
// promise.then(() => {/* do something */})
// // do other setup stuff and assert on the pending state
// resolve()
// await promise
// assert on the resolved state

// beforeAll(() => {
//   // 📜 https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition
//   window.navigator.geolocation = {
//     getCurrentPosition: jest.fn(),
//   }
// })

test.skip('displays the users current location', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 50,
      longitude: 50,
    },
  }

  const {promise, resolve} = deferred()

  window.navigator.geolocation.getCurrentPosition.mockImplementation(
    async (onSuccess, onError) => {
      try {
        await promise
        onSuccess(fakePosition) // line runs when resolve is called
      } catch (error) {
        onError(error.message)
      }
    },
  )

  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  // Resolving the promise will update state inside <Location/>
  // need to wrap in act()
  await act(async () => {
    resolve()
  })

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  expect(
    screen.getByText(`Latitude: ${fakePosition.coords.latitude}`),
  ).toBeInTheDocument()
  expect(
    screen.getByText(`Longitude: ${fakePosition.coords.longitude}`),
  ).toBeInTheDocument()
})

test('displays the users current location (mock module)', async () => {
  // 📜 https://developer.mozilla.org/en-US/docs/Web/API/GeolocationPosition
  const fakePosition = {
    coords: {
      latitude: 50,
      longitude: 50,
    },
  }

  let setCurrentPosition
  function useMockCurrentPosition() {
    const [state, setState] = React.useState([])

    // assign setState to a outer scope var
    // so we can imperatively update state and rerender
    setCurrentPosition = setState
    return state
  }
  useCurrentPosition.mockImplementation(useMockCurrentPosition)

  render(<Location />)

  expect(screen.getByLabelText('loading...')).toBeInTheDocument()

  act(() => {
    setCurrentPosition([fakePosition, undefined])
  })

  expect(screen.queryByLabelText('loading...')).not.toBeInTheDocument()

  expect(screen.getByText(`Latitude: ${50}`)).toBeInTheDocument()
  expect(screen.getByText(`Longitude: ${50}`)).toBeInTheDocument()
})
