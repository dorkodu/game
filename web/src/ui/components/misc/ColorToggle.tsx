import {
  Center,
  MantineColorScheme,
  MantineSize,
  rem,
  SegmentedControl,
  Switch,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import { IconMoon, IconMoonFilled, IconMoonStars, IconSun } from '@tabler/icons-react'
import { theme, vanilla } from '@web/ui/styles/theme'
import { useState } from 'react'

function ColorToggle({ size = 'xs' }: { size?: MantineSize }) {

  const { setColorScheme } = useMantineColorScheme({
    keepTransitions: true,
  })
  const computedColorScheme = useComputedColorScheme("dark")
  const [checked, setChecked] = useState(computedColorScheme == "dark")

  const sunIcon = (
    <IconSun
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={vanilla.colors.gray[6]}
    />
  )

  const moonIcon = (
    <IconMoon
      style={{ width: rem(16), height: rem(16) }}
      stroke={2.5}
      color={vanilla.colors.gray[4]}
    />
  )

  return <Switch
    size={size} color="dark.5" onLabel={moonIcon} offLabel={sunIcon}
    checked={checked}
    onChange={(event) => {
      setChecked(event.currentTarget.checked)
      setColorScheme(event.currentTarget.checked ? "dark" : "light")
    }}
  />

}

export default ColorToggle
