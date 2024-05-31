import { Group, Loader, Stack, Title } from '@mantine/core';
import { NoRecentFiles } from './NoRecentFiles';
import { RecentFile } from './RecentFile';
import { useListFilesEndpointQuery } from '@/data/backendApi';

export function RecentFiles() {
  const { isFetching } = useListFilesEndpointQuery();

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
  const { data, isError } = useListFilesEndpointQuery();

  if (isError) return 'An error has occurred';
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
