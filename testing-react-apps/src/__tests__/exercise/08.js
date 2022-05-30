// testing custom hooks

import * as React from 'react'
import {act} from 'react-dom/test-utils'
import {render, renderHook} from '@testing-library/react'

import useCounter from '../../components/use-counter'

const setup = () => {
  const hookReturnVal = {}
  const TestComponent = () => {
    // When TestComponent is rerendered, it will re-assign props of hookReturnVal
    // instead of overwriting the value if we do hookReturnVal = useCounter()
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

test('step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {initialProps: {step: 3}})

  expect(result.current).toEqual({
    count: 0,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  act(() => {
    result.current.increment()
  })

  expect(result.current).toEqual({
    count: 3,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })

  rerender({step: 2})

  act(() => {
    result.current.decrement()
  })

  expect(result.current).toEqual({
    count: 1,
    increment: expect.any(Function),
    decrement: expect.any(Function),
  })
})
