import {
  MantineColorScheme,
  Popover,
  SegmentedControl,
  Tooltip,
  UnstyledButton,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core';
import { IconMoon, IconSun } from '@tabler/icons-react';
import clsx from 'clsx';
import React from 'react';
import classes from './ColorSchemeControl.module.css';

const colorSchemeOptions = [
  {
    value: 'light',
    label: 'Light',
  },
  {
    value: 'dark',
    label: 'Dark',
  },
  {
    value: 'auto',
    label: 'Auto',
  },
];

// Based on https://github.com/mantinedev/mantine/blob/afc992942bdaf4e807e83b9fcb6df340c5e22f4a/packages/%40mantinex/mantine-header/src/ColorSchemeControl.tsx
export function ColorSchemeSwitcherDesktop() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

  return (
    <Popover width={200} position="bottom" withArrow shadow="md">
      <Popover.Target>
        {/* TODO: disable tooltip while popover is opened */}
        <Tooltip label="Switch color scheme">
          <UnstyledButton>
            <IconSun className={clsx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={clsx(classes.icon, classes.dark)} stroke={1.5} />
          </UnstyledButton>
        </Tooltip>
      </Popover.Target>

      {/* TODO: make this look like a Menu, i.e. no padding with container */}
      <Popover.Dropdown>
        <SegmentedControl
          orientation="vertical"
          fullWidth
          value={colorScheme}
          onChange={(value) => setColorScheme(value as MantineColorScheme)}
          data={colorSchemeOptions}
        />
      </Popover.Dropdown>
    </Popover>
  );
}

export function ColorSchemeSwitcherMobile() {
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  return (
    <SegmentedControl
      value={colorScheme}
      onChange={(value) => setColorScheme(value as MantineColorScheme)}
      data={colorSchemeOptions}
    />
  );
}
