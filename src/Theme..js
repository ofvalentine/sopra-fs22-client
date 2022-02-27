import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  config: { initialColorMode: 'dark', useSystemColorMode: false },
  fonts: {
    heading: '"Roboto Mono", monospace',
    body: '"Roboto Mono", monospace'
  },
  components: {
    Button: {
      sizes: {
        small: { w: 'auto', h: 'auto', px: 5, py: 3 },
        large: { w: '20vw', h: '10vh', fontSize: '3vh' }
      }
    }
  },
  styles: {
    global: {
      'input': { boxShadow: 'inset 0 0 10px 0px #ff09ca, 0 0 9px 1px #f000ff, 0 0 4px 2px #bbeef7' },
      '.kDkNjC[readonly], .kDkNjC[readonly]:focus': { boxShadow: 'none', color: 'white', paddingInline: '1rem',
        border: '1px solid', borderColor: 'whiteAlpha.300' },
      'section[role="dialog"]': { background: '#2D3748' },
      '.QOpYK, .gFaBtt': { color: '#d3fff6'}, '.ftHZOt': {right: '0.8rem'},
      'input[name="birthday"], input[name="birthday"]:focus': { borderRadius: 'var(--chakra-radii-md)', background: 'none',
        color: 'white', paddingInline: '1rem', border: '1px solid', borderColor: 'whiteAlpha.300' }
    }
  }
})

export { theme }