import { Divider } from '@mantine/core';
import { Uploader } from './Uploader/Uploader';
import { RecentFiles } from '@/pages/main/Home/RecentFiles/RecentFiles';

export function HomePage() {
  return (
    <>
      <Uploader />
      <Divider my="xl" />
      <RecentFiles />
    </>
  );
}
