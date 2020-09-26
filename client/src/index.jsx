import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './container/App'
import UserProvider from './container/LoginPage/context'
import theme from './utils/theme'

ReactDOM.render(
  <>
    <UserProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </UserProvider>
  </>,
  document.getElementById('root')
)
