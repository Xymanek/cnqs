import { Grid, Paper, Stack, Text } from '@mantine/core';
import React from 'react';
import { useAppDispatch } from '@/data/hooks';
import { changeDisplayName, FileToUpload } from '@/data/uploader/uploaderSlice';
import { UploaderFilePreview } from './UploaderFilePreview';
import { UploaderFileName } from './UploaderFileName';
import { UploaderFileProgress } from './UploaderFileProgress';

interface UploaderFileEntryProps {
  file: FileToUpload;
}

export function UploaderFileEntry({ file }: UploaderFileEntryProps) {
  const dispatch = useAppDispatch();

  function handleNewUserFileName(newName: string): void {
    dispatch(changeDisplayName({ id: file.clientId, newName }));
  }

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <UploaderFilePreview file={file.file} />
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <UploaderFileName fileName={file.displayName} onNewFileName={handleNewUserFileName} />
            <UploaderFileProgress file={file} successDisplay={<Text>Uploaded!</Text>} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
