import { Group, UnstyledButton } from '@mantine/core';
import classes from './MobileNavbar.module.css';
import React from 'react';

export function MainSegmentDesktopMenu() {
  return (
    <Group ml="xl" gap={0} visibleFrom="sm">
      <UnstyledButton className={classes.control}>Home</UnstyledButton>
      <UnstyledButton className={classes.control}>Blog</UnstyledButton>
      <UnstyledButton className={classes.control}>Contacts</UnstyledButton>
      <UnstyledButton className={classes.control}>Support</UnstyledButton>
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
    </>
  );
}
