import { Stack } from '@mantine/core';
import { useState } from 'react';
import { FileWithPath } from '@mantine/dropzone';
import { v4 as uuidV4 } from 'uuid';
import { produce } from 'immer';
import { UploaderDropzone } from './UploaderDropzone';
import { UploaderNeedToLogin } from './UploaderNeedToLogin';
import { UploaderFileList } from './UploaderFileList';
import { ChangeUserSelectedName, ChangeUserSelectedNameFn, FileToUpload } from './UploaderShared';

export function Uploader() {
  const [files, setFiles] = useState([] as FileToUpload[]);

  function addFile(file: FileWithPath) {
    setFiles([
      ...files,
      {
        file,
        userProvidedName: file.name,
        id: uuidV4(),
      },
    ]);
  }

  const changeName: ChangeUserSelectedNameFn = (id, newName) => {
    setFiles(
      produce(files, (state) => {
        for (const file of state) {
          if (file.id === id) {
            file.userProvidedName = newName;
          }
        }
      })
    );
  };

  return (
    <Stack>
      <UploaderNeedToLogin />
      <UploaderDropzone onNewFile={(file) => addFile(file)} />
      <ChangeUserSelectedName.Provider value={changeName}>
        <UploaderFileList files={files} />
      </ChangeUserSelectedName.Provider>
    </Stack>
  );
}
