import { Stack } from '@mantine/core';
import { UploaderDropzone } from './UploaderDropzone';
import { UploaderNeedToLogin } from './UploaderNeedToLogin';
import { UploaderFileList } from './UploaderFileList';
import { useAppDispatch, useAppSelector } from '@/data/hooks';
import { addFile, selectUploadingFiles } from '@/data/uploader/uploaderSlice';

export function Uploader() {
  const files = useAppSelector(selectUploadingFiles);
  const dispatch = useAppDispatch();

  return (
    <Stack>
      <UploaderNeedToLogin />
      <UploaderDropzone onNewFile={(file) => dispatch(addFile(file))} />
      <UploaderFileList files={files} />
    </Stack>
  );
}
