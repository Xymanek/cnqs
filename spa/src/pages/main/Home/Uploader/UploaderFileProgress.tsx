import { ActionIcon, Flex, Progress, Stack, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { FileToUpload } from '@/data/uploader/uploaderSlice';
import { useCreateFileMutation, useUploadFileContentMutation } from '@/data/backendApi';
import { getCreateMutationKey, getUploadContentMutationKey } from '@/data/uploader/uploaderTrigger';
import { IconRefresh } from '@tabler/icons-react';

export interface UploaderFileProgressProps {
  file: FileToUpload;
  successDisplay?: React.ReactElement;
}

export function UploaderFileProgress({ file, successDisplay }: UploaderFileProgressProps) {
  const [, createFileState] = useCreateFileMutation({
    fixedCacheKey: getCreateMutationKey(file),
  });
  const [, uploadContentState] = useUploadFileContentMutation({
    fixedCacheKey: getUploadContentMutationKey(file.clientId),
  });

  // Content upload complete
  if (uploadContentState.isSuccess) {
    return (
      <Stack>
        <Progress size="lg" value={100} color="green" />
        {successDisplay}
      </Stack>
    );
  }

  // Content upload failed
  if (uploadContentState.isError) {
    return <UploadFailedIndicator fileClientId={file.clientId} infoText="Upload failed" />;
  }

  // Creating file
  if (createFileState.isLoading) {
    return (
      <Stack>
        <Progress size="lg" value={100} animated />
        <Text>Initializing...</Text>
      </Stack>
    );
  }

  // Creating file failed
  if (createFileState.isError) {
    return (
      <UploadFailedIndicator fileClientId={file.clientId} infoText="Failed to initialize upload" />
    );
  }

  // Content upload in progress or some other unknown state

  const progressUndermined = file.uploadProgress === undefined;
  const progress = file.uploadProgress === undefined ? 100 : file.uploadProgress * 100;

  return (
    <Stack>
      <Progress size="lg" value={progress} animated={progressUndermined} />
      <Text>Uploading...</Text>
    </Stack>
  );
}

export interface UploadFailedIndicatorProps {
  fileClientId: string;
  infoText: string;
}

function UploadFailedIndicator({ /*fileClientId,*/ infoText }: UploadFailedIndicatorProps) {
  return (
    <Stack>
      <Progress size="lg" value={100} color="red" />
      <Flex gap="xs">
        <Text>{infoText}</Text>
        <Tooltip label="Retry">
          <ActionIcon variant="filled" aria-label="Retry">
            <IconRefresh
              style={{
                width: '70%',
                height: '70%',
              }}
              stroke={1.5}
            />
          </ActionIcon>
        </Tooltip>
      </Flex>
    </Stack>
  );
}
