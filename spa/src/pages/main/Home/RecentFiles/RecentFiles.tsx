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
      <RecentFilesContent />
    </Stack>
  );
}

function RecentFilesContent() {
  const { isSuccess, error, data } = useListFiles();

  if (error) return `An error has occurred: ${error.message}`;
  if (!isSuccess) return '';

  if (data.files.length < 1) {
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
