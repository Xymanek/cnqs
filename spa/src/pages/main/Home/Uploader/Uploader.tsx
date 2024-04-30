import { Stack } from '@mantine/core';
import { UploaderDropzone } from './UploaderDropzone';
import { UploaderNeedToLogin } from './UploaderNeedToLogin';
import { UploaderFileList } from './UploaderFileList';

export function Uploader() {
  return (
    <Stack>
      <UploaderNeedToLogin />
      <UploaderDropzone />
      <UploaderFileList />
    </Stack>
  );
}
