import { AppShell, Burger, Container, Group, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { MainSegmentDesktopMenu, MainSegmentMobileMenu } from '@/pages/main/_layout/MainSegment.menu';
import React from 'react';

export function MainSegmentLayout({ children }: { children: React.ReactNode }) {
  const [opened, { toggle }] = useDisclosure();

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group justify="space-between" style={{ flex: 1 }}>
            {/*<MantineLogo size={30} />*/}
            <div>CNQS</div>
            <MainSegmentDesktopMenu />
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Navbar py="md" px={4}>
        <MainSegmentMobileMenu />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container>
          {children}
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
