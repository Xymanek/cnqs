import { Group, Loader, Stack, Title } from '@mantine/core';
import { NoRecentFiles } from './NoRecentFiles';
import { RecentFile } from './RecentFile';
import { useListFiles } from '@/data/files/use-list-files';

export function RecentFiles() {
  const { isFetching } = useListFiles();

  return (
    <Stack>
      <Group>
        <Title>Recent files</Title>
        {isFetching ? <Loader /> : null}
      </Group>
      <RecentFilesInner />
    </Stack>
  );
}

function RecentFilesInner() {
  const { isPending, error, data } = useListFiles();

  if (isPending) return 'Loading...';
  if (error) return `An error has occurred: ${error.message}`;

  // TODO
  if (!data) return 'World is ending';

  if (data.files?.length < 1) {
    return <NoRecentFiles />;
  }

  return (
    <Stack>
      {data.files!.map((file, i) => (
        <RecentFile fileName={file.fileName} viewUrl={file.shareLink} key={i} />
      ))}
    </Stack>
  );
}
