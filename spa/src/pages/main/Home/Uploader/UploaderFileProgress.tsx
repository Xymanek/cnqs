import { ActionIcon, Flex, Progress, Stack, Text, Tooltip } from '@mantine/core';
import React from 'react';
import { IconRefresh } from '@tabler/icons-react';
import { FileToUpload } from '@/data/uploader/uploaderSlice';
import {
  useCreateFileMutation,
  useFinalizeFileCreationMutation,
  useUploadFileContentMutation,
} from '@/data/backendApi';
import {
  getCreateMutationKey,
  getFinalizeCreationMutationKey,
  getUploadContentMutationKey,
  initiateCreateFile,
} from '@/data/uploader/uploaderTrigger';
import { useAppDispatch } from '@/data/hooks';

export interface UploaderFileProgressProps {
  file: FileToUpload;
  successDisplay?: React.ReactElement;
}

export function UploaderFileProgress({ file, successDisplay }: UploaderFileProgressProps) {
  const dispatch = useAppDispatch();

  const [, createFileState] = useCreateFileMutation({
    fixedCacheKey: getCreateMutationKey(file),
  });
  const [initiateUploadContent, uploadContentState] = useUploadFileContentMutation({
    fixedCacheKey: getUploadContentMutationKey(file.clientId),
  });
  const [initiateFinalizeCreation, finalizeCreationState] = useFinalizeFileCreationMutation({
    fixedCacheKey: getFinalizeCreationMutationKey(file.clientId),
  });

  // Finalize creation complete
  if (finalizeCreationState.isSuccess) {
    return (
      <Stack>
        <Progress size="lg" value={100} color="green" />
        {successDisplay}
      </Stack>
    );
  }

  // Finalize creation failed
  if (finalizeCreationState.isError && !finalizeCreationState.isLoading) {
    return (
      <UploadFailedIndicator
        infoText="Failed to finalize upload"
        onRetry={() => initiateFinalizeCreation({
          backendFileId: file.serverId!,
          ticket: file.finalizationTicket!,
        })}
      />
    );
  }

  // Content upload failed
  if (uploadContentState.isError && !uploadContentState.isLoading) {
    return (
      <UploadFailedIndicator
        infoText="Upload failed"
        onRetry={() => initiateUploadContent(file.clientId)}
      />
    );
  }

  // Finalizing upload
  if (finalizeCreationState.isLoading) {
    return (
      <Stack>
        <Progress size="lg" value={100} animated />
        <Text>Finalizing...</Text>
      </Stack>
    );
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
      <UploadFailedIndicator
        infoText="Failed to initialize upload"
        // TODO: there should be only a single unified place calling initiate
        onRetry={() => dispatch(initiateCreateFile(file.clientId))}
      />
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
  infoText: string;
  onRetry: () => void;
}

function UploadFailedIndicator({ infoText, onRetry }: UploadFailedIndicatorProps) {
  return (
    <Stack>
      <Progress size="lg" value={100} color="red" />
      <Flex gap="xs">
        <Text>{infoText}</Text>
        <Tooltip label="Retry">
          <ActionIcon variant="filled" aria-label="Retry" onClick={onRetry}>
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
