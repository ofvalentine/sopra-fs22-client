import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './pages/Navigation'
import { theme } from './Theme.'

export default function App() {

  return (
    <React.StrictMode>
      <ChakraProvider theme={theme}>
        <BrowserRouter>
          <Navigation />
        </BrowserRouter>
      </ChakraProvider>
    </React.StrictMode>
  )
}
