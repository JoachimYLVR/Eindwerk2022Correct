import '../styles/globals.scss'
import { NextUIProvider, createTheme } from '@nextui-org/react';
import { AppWrapper } from '../context/state';

function MyApp({ Component, pageProps }) {
  const theme = createTheme({
    type: "light",
    theme: {
      colors: {
        primaryLight: '#4d8eda',
        primary: '#266BBB',
        primaryDark: '#1c508c',
        secondary: '#26BB62',
        grey: '#667080',
        white: '#ffffff',
        statusActive: '#ABC8EB',
        statusArchived: '#EEF1F4',
        statusArchivedContrast: '#667080',
        statusCompleted: '#26BB62',
      },
      space: {},
      fonts: {}
    }
  })
  return (
    <NextUIProvider theme={theme}>
      <AppWrapper>
        <Component {...pageProps} />
      </AppWrapper>
    </NextUIProvider>
    
  )
}

export default MyApp
