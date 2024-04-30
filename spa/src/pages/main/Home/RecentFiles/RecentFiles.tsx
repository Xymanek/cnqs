import { Stack, Title } from '@mantine/core';
import { NoRecentFiles } from './NoRecentFiles';
import { RecentFile } from './RecentFile';

export function RecentFiles() {
  return (
    <Stack>
      <Title>Recent files</Title>
      <NoRecentFiles />
      <RecentFile />
      <RecentFile />
      <RecentFile />
    </Stack>
  );
}
