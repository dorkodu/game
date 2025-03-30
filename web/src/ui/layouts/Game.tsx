import { Flex, Stack } from "@mantine/core"
import { Outlet } from "react-router-dom"

function GameLayout() {
  return (
    <Stack gap={0}>
      <Outlet />
    </Stack>
  )
}

export default GameLayout