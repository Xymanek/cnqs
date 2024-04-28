import { UploaderDropzone } from '@/pages/main/Home/Uploader/UploaderDropzone';
import { UploaderNeedToLogin } from '@/pages/main/Home/Uploader/UploaderNeedToLogin';
import { UploaderFileList } from '@/pages/main/Home/Uploader/UploaderFileList';
import { Stack } from '@mantine/core';

export function Uploader() {
  return (
    <Stack>
      <UploaderNeedToLogin />
      <UploaderDropzone />
      <UploaderFileList />
    </Stack>
  );
}