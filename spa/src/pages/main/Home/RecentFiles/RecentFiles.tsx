import { Stack, Title } from '@mantine/core';
import { NoRecentFiles } from '@/pages/main/Home/RecentFiles/NoRecentFiles';
import { RecentFile } from '@/pages/main/Home/RecentFiles/RecentFile';

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
