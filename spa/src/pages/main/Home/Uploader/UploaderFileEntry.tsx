import { Grid, Paper, Stack, Text } from '@mantine/core';
import React from 'react';
import { FileToUpload } from '@/data/uploader/uploaderSlice';
import { UploaderFilePreview } from './UploaderFilePreview';
import { UploaderFileName } from './UploaderFileName';
import { UploaderFileProgress } from './UploaderFileProgress';
import { useChangeFileNameMutation } from '@/data/backendApi';

interface UploaderFileEntryProps {
  file: FileToUpload;
}

export function UploaderFileEntry({ file }: UploaderFileEntryProps) {
  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <UploaderFilePreview file={file.file} />
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <UploaderFileNameManager file={file} />
            <UploaderFileProgress file={file} successDisplay={<Text>Uploaded!</Text>} />
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

function UploaderFileNameManager({ file }: UploaderFileEntryProps) {
  // TODO: fixed cache key
  const [trigger, { isLoading, isError }] = useChangeFileNameMutation();

  function handleNewUserFileName(newName: string): void {
    if (!file.serverId) {
      // eslint-disable-next-line no-console
      console.error('Rename applied without server ID: ', file);
      return;
    }

    trigger({ backendFileId: file.serverId, newDisplayName: newName });
  }

  // TODO: green for 2 sec after save was successful
  return (
    <UploaderFileName
      fileName={file.displayName}
      onNewFileName={handleNewUserFileName}
      editEnabled={!!file.serverId}
      isSaving={isLoading}
      hasSavingFailed={isError}
    />
  );
}
