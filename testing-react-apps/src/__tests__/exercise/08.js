// testing custom hooks

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderHook} from '@testing-library/react'

import useCounter from '../../components/use-counter'

const setup = () => {
  const hookReturnVal = {}
  const TestComponent = () => {
    Object.assign(hookReturnVal, useCounter())
    return null
  }
  render(<TestComponent />)
  return hookReturnVal
}

test('exposes the count and increment/decrement functions', () => {
  const hookReturnVal = setup()

  expect(hookReturnVal).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => {
    hookReturnVal.increment()
  })

  expect(hookReturnVal).toEqual({
    count: 1,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => {
    hookReturnVal.decrement()
  })

  expect(hookReturnVal).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })
})

test('exposes the count and increment/decrement functions (renderHook)', () => {
  const {result} = renderHook(useCounter)

  expect(result.current).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => {
    result.current.increment()
  })

  expect(result.current).toEqual({
    count: 1,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => {
    result.current.decrement()
  })

  expect(result.current).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })
})
