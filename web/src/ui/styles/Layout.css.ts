import { style, styleVariants } from '@vanilla-extract/css'
import { vanilla } from './theme'
import { glassBar } from './glass.css'
import { rgba } from '@mantine/core'

export const BARHEIGHT = 60

export const WIDESCREEN_MIN = 768
export const WIDESCREEN_MAX = 1024

// Screen breakpoints
const isWideScreen = vanilla.largerThan(WIDESCREEN_MIN)
const isMobile = vanilla.smallerThan(WIDESCREEN_MIN - 1)
const isExtraWide = vanilla.largerThan(WIDESCREEN_MAX)

export const Layout = {
  Root: style({
    display: 'flex',
    flexDirection: 'column',

    width: '100%',
    maxWidth: WIDESCREEN_MAX,
    minHeight: '100vh',
    margin: '0 auto',

    '@media': {
      [isExtraWide]: {
        width: '1200px',
      },
    },
  }),

  Aside: style({
    width: '45%',
    maxWidth: '320px',
    display: 'none',
    padding: 10,

    '@media': {
      [isWideScreen]: {
        display: 'block',
      },
    },
  }),

  Nav: style({
    width: '30%',
    maxWidth: '340px',
    display: 'none',

    '@media': {
      [isWideScreen]: {
        display: 'block',
      },
    },
  }),



  Main: style({
    width: '100%',
    flexGrow: 1,

    '@media': {
      [isWideScreen]: {
        width: '65%',
      },
    },
  }),

  Header: style({
    display: 'none',

    '@media': {
      [isWideScreen]: {
        display: 'block',
      },
    },
  }),

  Body: style({
    display: 'flex',
    marginTop: BARHEIGHT,
    marginBottom: BARHEIGHT * 1.5,

    '@media': {
      [isWideScreen]: {
        marginTop: 0,
        marginBottom: 0,
      },
    },
  }),

  Footer: style({
    display: 'block',
    maxWidth: WIDESCREEN_MAX,
    height: BARHEIGHT,

    '@media': {
      [isMobile]: {
        display: 'none',
      },
    },
  }),
}

const NavigationBarButtonBase = style({
  display: 'inline-block',
  borderRadius: 14,
  padding: 0,
  paddingTop: 6,
  paddingBottom: 2,
  minWidth: 56,
  height: "auto",
  color: vanilla.colors.text,

  borderWidth: 2,
  borderStyle: 'solid',
  borderColor: 'rgba(255,255,255, 0)',

  transitionDuration: '0.2s',

  ':hover': {
    backgroundColor: vanilla.colors.blue.light,
    color: vanilla.colors.blue.lightColor,
  },
})

export const NavigationBar = {
  Root: style([
    glassBar,
    {
      borderWidth: 0,
      borderTopWidth: 1,
      borderStyle: 'solid',
      borderColor: rgba("#255090", 0.1),
      borderRadius: 0,

      "selectors": {
        [vanilla.darkSelector]: {
          borderColor: rgba("#111", 0.5),
        }
      }
    }]),
  Button: styleVariants({
    plain: [NavigationBarButtonBase],
    active: [
      NavigationBarButtonBase,
      {
        backgroundColor: vanilla.colors.blue.light,
        color: vanilla.colors.blue.lightColor,

        borderColor: vanilla.colors.blue.light,
      },
    ],
  })
}

export const Header = style({
  width: '100vw',
  position: 'fixed',
  top: 0,
  padding: 10,
  maxWidth: vanilla.breakpoints.lg,
  margin: '0 auto',
  marginBottom: BARHEIGHT,

  backgroundColor: vanilla.colors.white,
  borderBottom: `1px solid ${vanilla.colors.gray[2]}`,
  boxShadow: `0 1px 3px 2px ${vanilla.colors.gray[1]}`,

  selectors: {
    [vanilla.darkSelector]: {
      backgroundColor: vanilla.colors.dark[8],
      borderBottom: `1px solid ${vanilla.colors.dark[9]}`,
      boxShadow: `0 1px 3px 2px ${vanilla.colors.dark[8]}`,
    },
  },

  [vanilla.largerThan(WIDESCREEN_MIN)]: {
    position: 'unset',
    top: 'unset',
    margin: 10,
    marginTop: 16,
    width: 'calc(100% - 20px)',
    border: 0,
    boxShadow: 'unset',
    backgroundColor: 'unset',
  },
})

export const SearchInput = style({
  border: `1px solid ${vanilla.colors.gray[4]}`,
  borderRadius: 16,
  background: vanilla.colors.gray[2],
  color: vanilla.colors.gray[9],

  selectors: {
    [vanilla.darkSelector]: {
      border: `1px solid ${vanilla.colors.gray[4]}`,
      background: vanilla.colors.dark[4],
      color: vanilla.colors.gray[0],
    },

    [`&::placeholder`]: {
      color: vanilla.colors.gray[6],
    },

    [`&::placeholder & ${vanilla.darkSelector}`]: {
      color: vanilla.colors.gray[5],
    },

    [`&:focus`]: {
      border: `1px solid ${vanilla.colors.blue[6]}`,
    },
  },
})

export const Menu = {
  Item: style({
    borderRadius: 10,
    padding: 4,

    ':hover': {
      backgroundColor: vanilla.colors.gray.light,
    },
  }),
}

export const Headbar = {
  Root: style([
    glassBar,
    {
      borderWidth: 0,
      borderBottomWidth: 1,
      borderStyle: 'solid',
      borderColor: rgba(vanilla.colors.defaultBorder, 0.7),
      borderRadius: 0,

      "selectors": {
        [vanilla.darkSelector]: {
          borderColor: rgba(vanilla.colors.dark[9], 0.5),
        }
      }
    }]),
}


