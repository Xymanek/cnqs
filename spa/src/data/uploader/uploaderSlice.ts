import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { FileWithPath } from '@mantine/dropzone';
import { v4 as uuidV4 } from 'uuid';
import { backendApi } from '@/data/backendApi';
import { fileDisplayNameUpdated } from '@/data/fileManagement/fileDisplayNameUpdated';

export interface UploaderState {
  files: FileToUpload[];
}

export type FileToUpload = {
  readonly clientId: string;
  readonly file: Readonly<FileWithPath>;

  serverId?: string;
  uploadUrl?: string;

  displayName: string;

  uploadProgress?: number;
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
          clientId: uuidV4(),
          file,
          displayName: file.name,
        },
      }),
    },
    setUploadProgress: (state, action: PayloadAction<{ id: string; progress?: number }>) => {
      for (const file of state.files) {
        if (file.clientId === action.payload.id) {
          file.uploadProgress = action.payload.progress;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(backendApi.endpoints.createFile.matchFulfilled, (state, action) => {
      const file = state.files.find(
        (f) => f.clientId === action.meta.arg.originalArgs.clientFileId
      );
      if (!file) return;

      file.serverId = action.payload.id;
      file.uploadUrl = action.payload.uploadUrl;
    });
    builder.addMatcher(fileDisplayNameUpdated.match, (state, action) => {
      const file = state.files.find(f => f.serverId === action.payload.backendFileId);
      if (!file) return;

      file.displayName = action.payload.newDisplayName;
    });
  },
  selectors: {
    selectUploadingFiles: (state) => state.files,
    selectFileByClientId: (state, clientId: string) =>
      state.files.find((f) => f.clientId === clientId),
  },
});

export const { addFile, setUploadProgress } = uploaderSlice.actions;
export const { selectUploadingFiles, selectFileByClientId } = uploaderSlice.selectors;
