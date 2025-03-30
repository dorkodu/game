import { Paper, rgba } from '@mantine/core'
import { style } from '@vanilla-extract/css'
import { vanilla } from './theme'

export const wrapContent = style({
  whiteSpace: 'pre-wrap',
  wordBreak: 'break-word',
})

export const truncate = style({
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

export const ContainerSheet = style({
  backgroundColor: vanilla.colors.gray[1],

  selectors: {
    [vanilla.darkSelector]: {
      backgroundColor: vanilla.colors.dark[8],
    },
  },
})

