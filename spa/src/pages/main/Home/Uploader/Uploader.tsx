import { Stack } from '@mantine/core';
import { UploaderDropzone } from './UploaderDropzone';
import { UploaderNeedToLogin } from './UploaderNeedToLogin';
import { UploaderFileList } from './UploaderFileList';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { v4 as uuidV4 } from 'uuid';

export type FileToUpload = {
  file: FileWithPath;
  id: string;
};

export function Uploader() {
  const [files, setFiles] = useState([] as FileToUpload[]);

  function addFile(file: FileWithPath) {
    setFiles([...files, { file, id: uuidV4() }]);
  }

  return (
    <Stack>
      <UploaderNeedToLogin />
      <UploaderDropzone onNewFile={(file) => addFile(file)} />
      <UploaderFileList files={files} />
    </Stack>
  );
}
