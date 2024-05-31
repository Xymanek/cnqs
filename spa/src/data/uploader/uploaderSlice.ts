import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FileWithPath } from '@mantine/dropzone';
import { v4 as uuidV4 } from 'uuid';

export interface UploaderState {
  files: FileToUpload[];
}

export type FileToUpload = {
  file: FileWithPath;
  userProvidedName: string;
  id: string;
};

const initialState: UploaderState = {
  files: [],
};

export const uploaderSlice = createSlice({
  name: 'uploader',
  initialState,
  reducers: {
    addFile: {
      reducer: (state, action: PayloadAction<FileToUpload>) => {
        state.files.push(action.payload);
      },
      prepare: (file: FileWithPath) => ({
        payload: {
          file,
          userProvidedName: file.name,
          id: uuidV4(),
        },
      }),
    },
    changeDisplayName: (state, action: PayloadAction<{ id: string; newName: string }>) => {
      for (const file of state.files) {
        if (file.id === action.payload.id) {
          file.userProvidedName = action.payload.newName;
        }
      }
    },
  },
  selectors: {
    selectUploadingFiles: (state) => state.files,
  },
});

export const { addFile, changeDisplayName } = uploaderSlice.actions;
export const { selectUploadingFiles } = uploaderSlice.selectors;
