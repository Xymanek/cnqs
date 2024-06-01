import {
  ActionIcon,
  Button,
  Flex,
  Grid,
  Image,
  Paper,
  Progress,
  rem,
  Space,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import React, { useEffect, useState } from 'react';
import { IconCheck, IconFileFilled, IconPencil, IconX } from '@tabler/icons-react';
import { FileWithPath, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { AccessibleTooltip } from '@/components/AccessibleTooltip/AccessibleTooltip';
import { useAppDispatch } from '@/data/hooks';
import { changeDisplayName, FileToUpload } from '@/data/uploader/uploaderSlice';

interface UploaderFileIndicatorProps {
  file: FileToUpload;
}

export function UploaderFileIndicator({ file }: UploaderFileIndicatorProps) {
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

export function UploaderFileName(props: {
  fileName: string;
  onNewFileName: (newFileName: string) => void;
}) {
  const [fileNameEdit, setFileNameEdit] = useState(props.fileName);
  const [isEditingFileName, setIsEditingFileName] = useState(false);

  function startEdit() {
    setFileNameEdit(props.fileName);
    setIsEditingFileName(true);
  }

  if (!isEditingFileName) {
    return (
      <Flex gap="xs">
        <Text>{props.fileName}</Text>
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
    props.onNewFileName(fileNameEdit);
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
