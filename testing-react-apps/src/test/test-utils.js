import * as React from 'react'
import {render as _render} from '@testing-library/react'
import {ThemeProvider} from 'components/theme'

function render(element, {theme = 'light', ...restOptions} = {}) {
  const Wrapper = ({children}) => (
    <ThemeProvider initialTheme={theme}>{children}</ThemeProvider>
  )
  return _render(element, {wrapper: Wrapper, ...restOptions})
}

export * from '@testing-library/react'
// override React Testing Library's render with our own
export {render}
