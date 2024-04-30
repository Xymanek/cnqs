import { Group, Space, UnstyledButton } from '@mantine/core';
import React from 'react';
import classes from './MobileNavbar.module.css';
import { ColorSchemeSwitcherDesktop, ColorSchemeSwitcherMobile } from './color-scheme';

export function MainSegmentDesktopMenu() {
  return (
    <Group ml="xl" gap={0} visibleFrom="sm">
      <UnstyledButton className={classes.control}>Home</UnstyledButton>
      <UnstyledButton className={classes.control}>Blog</UnstyledButton>
      <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
      <UnstyledButton className={classes.control}>Support</UnstyledButton>

      <ColorSchemeSwitcherDesktop />
    </Group>
  );
}

export function MainSegmentMobileMenu() {
  return (
    <>
      <UnstyledButton className={classes.control}>Home</UnstyledButton>
      <UnstyledButton className={classes.control}>Blog</UnstyledButton>
      <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
      <UnstyledButton className={classes.control}>Support</UnstyledButton>

      <Space />

      <ColorSchemeSwitcherMobile />
    </>
  );
}
