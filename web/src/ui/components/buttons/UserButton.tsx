import { Avatar, Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-react';
import React from 'react';

interface Props {
  user: { name?: string; username?: string; avatar?: string }
  onClick?: () => void

  compact?: boolean
  withChevron?: boolean
  withBorder?: boolean
}


export function UserButton({ user, onClick, compact = false, withBorder = true, withChevron = true }: Props) {
  let avatar = user?.avatar ?? '/images/avatar.webp'
  let name = user?.name ?? "Anonymous"
  let username = user?.username ? `@${user.username}` : '~anonymous'

  return (
    <Button
      variant={withBorder ? 'default' : 'transparent'}
      h="auto"
      p={compact ? 4 : 6}
      radius="lg"
      onClick={onClick}
    >
      <Group w="100%" justify="space-between" gap={10}>
        <Group gap={compact ? 8 : 12}>
          <Avatar
            src={avatar}
            radius={compact ? 12 : 16}
            size={compact ? 36 : 44}
          />
          <Stack gap={0} ta="left" mr={10}>
            <Text fw={700} lh={1.1} size={compact ? 'sm' : 'md'} c="var(--mantine-color-text)">
              {name}
            </Text>
            <Text fw={500} lh={1.1} c="dimmed" size={compact ? 'sm' : 'md'}>
              {username}
            </Text>
          </Stack>
        </Group>

        {withChevron && <ThemeIcon variant="transparent" color="dark"><IconChevronRight /></ThemeIcon>}
      </Group>
    </Button>
  )
}
