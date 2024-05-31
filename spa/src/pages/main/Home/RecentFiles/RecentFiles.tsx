import { Group, Loader, Stack, Title } from '@mantine/core';
import { NoRecentFiles } from './NoRecentFiles';
import { RecentFile } from './RecentFile';
import { useListUploadedFilesQuery } from '@/data/backendApi';

export function RecentFiles() {
  const { isFetching } = useListUploadedFilesQuery();

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
  const { data, error, isLoading } = useListUploadedFilesQuery();

  if (error) return `An error has occurred`; // TODO: error message
  if (!data) return '';

  if (data.files!.length < 1) {
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
