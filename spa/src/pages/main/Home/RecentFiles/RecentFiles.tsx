import { Group, Loader, Stack, Title } from '@mantine/core';
import { NoRecentFiles } from './NoRecentFiles';
import { RecentFile } from './RecentFile';
import { useListFiles } from '@/data/files/use-list-files';

function useInternalListFiles() {
  // We will be using live results, so we don't want automatic refetching
  return useListFiles({ refreshOnFocus: false });
}

export function RecentFiles() {
  const { isFetching } = useInternalListFiles();

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
  const { isSuccess, error, data } = useInternalListFiles();

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
