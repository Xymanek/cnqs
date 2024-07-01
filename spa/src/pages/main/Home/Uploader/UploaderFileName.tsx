import React, { useState } from 'react';
import {
  ActionIcon,
  Button,
  Flex,
  Loader,
  rem,
  Space,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { IconCheck, IconPencil, IconRefresh, IconX } from '@tabler/icons-react';
import { AccessibleTooltip } from '@/components/AccessibleTooltip/AccessibleTooltip';

export function UploaderFileName(props: {
  fileName: string;
  onNewFileName: (newFileName: string) => void;
  editEnabled: boolean;
  isSaving: boolean;
  hasSavingFailed: boolean;
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
        <Text c={props.hasSavingFailed && !props.isSaving ? 'red' : undefined}>
          {props.fileName}
        </Text>
        <ActionIcon
          variant="subtle"
          aria-label="Edit file name"
          onClick={startEdit}
          disabled={!props.editEnabled}
        >
          <IconPencil
            style={{
              width: '70%',
              height: '70%',
            }}
            stroke={1.5}
          />
        </ActionIcon>
        {/* TODO: smaller loader */}
        {props.isSaving ? <Loader /> : null}
        {props.hasSavingFailed ? (
          <Tooltip label="Retry">
            <ActionIcon
              variant="filled"
              aria-label="Retry"
              onClick={() => props.onNewFileName(fileNameEdit)}
            >
              <IconRefresh
                style={{
                  width: '70%',
                  height: '70%',
                }}
                stroke={1.5}
              />
            </ActionIcon>
          </Tooltip>
        ) : null}
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
