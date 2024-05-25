import {
  Paper,
  Grid,
  Image,
  Progress,
  Stack,
  TextInput,
  rem,
  Space,
  Flex,
  ActionIcon,
  Text,
  Button,
} from '@mantine/core';
import React, { useEffect, useRef, useState } from 'react';
import { IconCheck, IconFileFilled, IconPencil, IconX } from '@tabler/icons-react';
import { useMutation } from '@tanstack/react-query';
import { FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { AccessibleTooltip } from '@/components/AccessibleTooltip/AccessibleTooltip';
import { UploadApi } from '@/backend-api/apis';
import { FileToUpload } from './UploaderShared';

interface UploaderFileIndicatorProps {
  file: FileToUpload;
}

export function UploaderFileIndicator({ file }: UploaderFileIndicatorProps) {
  useUploadOnMount(file);

  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <UploaderFilePreview file={file.file} />
        </Grid.Col>

        <Grid.Col span={10}>
          <Stack>
            <UploaderFileName />
            <Progress size="lg" value={40} animated />
          </Stack>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}

function useUploadOnMount(file: FileToUpload) {
  const { mutate, reset: resetMutation } = useMutation({
    mutationFn: () =>
      new UploadApi().uploadFileEndpoint({
        file: new Blob([file.file]),
        autoShare: true,
      }),

    mutationKey: ['upload', file.id],
  });

  const startedCurrentBuffer = useRef<FileWithPath>();

  useEffect(() => {
    if (startedCurrentBuffer.current !== file.file) {
      startedCurrentBuffer.current = file.file;
      mutate();
    }

    return () => resetMutation();
  }, [file.file]);
}

function UploaderFilePreview(props: { file: FileWithPath }) {
  // @ts-ignore
  const isPreviewableImage = IMAGE_MIME_TYPE.includes(props.file.type);
  const [previewSource, setPreviewSource] = useState<FileReader['result']>();

  useEffect(() => {
    if (!FileReader) return;
    if (!isPreviewableImage) return;

    const fr = new FileReader();
    fr.onload = () => {
      setPreviewSource(fr.result);
    };
    fr.readAsDataURL(new Blob([props.file]));

    // eslint-disable-next-line consistent-return
    return () => fr.abort();
  }, [props.file]);

  if (!isPreviewableImage) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <IconFileFilled style={{ width: rem(60), height: rem(60) }} />
      </div>
    );
  }

  // TODO better sizing
  return <Image radius="sm" src={previewSource} style={{ maxHeight: '200px' }} />;
  // https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png
}

export function UploaderFileName() {
  const [fileName, setFileName] = useState('File.jpg');
  const [fileNameEdit, setFileNameEdit] = useState(fileName);
  const [isEditingFileName, setIsEditingFileName] = useState(false);

  function startEdit() {
    setFileNameEdit(fileName);
    setIsEditingFileName(true);
  }

  if (!isEditingFileName) {
    return (
      <Flex gap="xs">
        <Text>{fileName}</Text>
        <ActionIcon variant="subtle" aria-label="Edit file name" onClick={startEdit}>
          <IconPencil
            style={{
              width: '70%',
              height: '70%',
            }}
            stroke={1.5}
          />
        </ActionIcon>
      </Flex>
    );
  }

  function cancelEdit() {
    setIsEditingFileName(false);
  }

  function confirmEdit() {
    setIsEditingFileName(false);
    setFileName(fileNameEdit);
  }

  return (
    <Flex>
      <TextInput
        style={{ flexGrow: 1 }}
        value={fileNameEdit}
        onChange={(e) => setFileNameEdit(e.target.value)}
      />

      <Space w="sm" />

      <Button.Group>
        {/* TODO: less horizontal padding for both */}
        <AccessibleTooltip label="Cancel name edit">
          <Button variant="default" onClick={cancelEdit}>
            <IconX
              color="red"
              style={{
                width: rem(16),
                height: rem(16),
              }}
            />
          </Button>
        </AccessibleTooltip>

        <AccessibleTooltip label="Apply new name">
          <Button variant="default" onClick={confirmEdit}>
            <IconCheck
              color="green"
              style={{
                width: rem(16),
                height: rem(16),
              }}
            />
          </Button>
        </AccessibleTooltip>
      </Button.Group>
    </Flex>
  );
}
