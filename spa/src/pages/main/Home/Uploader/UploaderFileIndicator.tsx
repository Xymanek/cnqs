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
import React, { useState } from 'react';
import { IconCheck, IconPencil, IconX } from '@tabler/icons-react';
import { AccessibleTooltip } from '@/components/AccessibleTooltip/AccessibleTooltip';

export function UploaderFileIndicator() {
  return (
    <Paper shadow="xs" withBorder p="xl">
      <Grid>
        <Grid.Col span={2}>
          <Image
            radius="sm"
            src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-4.png"
          />
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
