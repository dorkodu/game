import { Anchor, Button, CSSVariablesResolver, Title, createTheme, useMantineColorScheme } from '@mantine/core'
import { themeToVars } from '@mantine/vanilla-extract'
import { useThemed } from '@web/lib/hooks'

export const theme = createTheme({
  primaryColor: 'green',
  defaultRadius: 'md',
  cursorType: 'pointer',

  fontFamily: 'Rubik, Roboto, sans-serif',
  fontFamilyMonospace: 'JetBrains Mono, Fira Code, monospace',
  colors: {
    dark: [
      'hsl(220, 5%, 72%)',
      'hsl(220, 5%, 65%)',
      'hsl(220, 5%, 43%)',
      'hsl(220, 5%, 34%)',
      'hsl(220, 5%, 23.5%)',
      'hsl(220, 5%, 15%)',
      'hsl(225, 5%, 13%)',
      'hsl(225, 5%, 6%)',
      'hsl(230, 5%, 4%)',
      'hsl(230, 5%, 2%)',
    ],
    blue: [
      'hsl(207, 100%, 95%)',
      'hsl(207, 100%, 91%)',
      'hsl(208, 100%, 82%)',
      'hsl(208, 96%, 72%)',
      'hsl(209, 91%, 64%)',
      'hsl(209, 86%, 57%)',
      'hsl(210, 80%, 52%)',
      'hsl(211, 77%, 47%)',
      'hsl(213, 77%, 43%)',
      'hsl(214, 75%, 38%)',
    ],
  },
  components: {
    Anchor: Anchor.extend({
      styles: (theme) => ({
        root: {
          color: theme.colors.blue[6],
          fontWeight: 450
        },
      }),
    }),
    Title: Title.extend({
      styles: (theme) => ({
        root: {
          color: useThemed({ light: theme.black, dark: theme.white }),
        },
      }),
    }),
    Button: Button.extend({
      defaultProps: {
        radius: 'lg',
      },
    }),
  },
})

export const vanilla = themeToVars(theme)

export const cssVariablesResolver: CSSVariablesResolver = (theme) => ({
  variables: {

  },
  light: {
  },
  dark: {
  },
})