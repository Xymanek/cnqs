import { Grid, Paper, Progress, Stack } from '@mantine/core';
import React from 'react';
import { useAppDispatch } from '@/data/hooks';
import { changeDisplayName, FileToUpload } from '@/data/uploader/uploaderSlice';
import { UploaderFilePreview } from './UploaderFilePreview';
import { UploaderFileName } from './UploaderFileName';

interface UploaderFileEntryProps {
  file: FileToUpload;
}

export function UploaderFileEntry({ file }: UploaderFileEntryProps) {
  const dispatch = useAppDispatch();

  function handleNewUserFileName(newName: string): void {
    dispatch(changeDisplayName({ id: file.clientId, newName }));
  }

  const progressUndermined = file.uploadProgress === undefined;
  const progress = file.uploadProgress === undefined ? 100 : file.uploadProgress * 100;

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <UploaderFilePreview file={file.file} />
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <UploaderFileName fileName={file.displayName} onNewFileName={handleNewUserFileName} />
            <Progress size="lg" value={progress} animated={progressUndermined} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

