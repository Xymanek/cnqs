import { createListenerMiddleware } from '@reduxjs/toolkit';
import { backendApi } from '../backendApi';
import { FileToUpload, uploaderSlice } from './uploaderSlice';

export function getCreateMutationKey(file: FileToUpload): string {
  return `upload-${file.clientId}`;
}

export function getUploadContentMutationKey(clientId: string): string {
  return `upload-content-${clientId}`;
}

export const uploaderTriggerMiddleware = createListenerMiddleware();

uploaderTriggerMiddleware.startListening({
  actionCreator: uploaderSlice.actions.addFile,
  effect: (action, api) => {
    api.dispatch(
      backendApi.endpoints.createFile.initiate(
        {
          clientFileId: action.payload.clientId,
          contentType: action.payload.file.type,
          fileNameWithExtension: action.payload.file.name,
          displayName: action.payload.displayName,
        },
        {
          fixedCacheKey: getCreateMutationKey(action.payload),
        }
      )
    );
  },
});

uploaderTriggerMiddleware.startListening({
  matcher: backendApi.endpoints.createFile.matchFulfilled,
  effect: (action, api) => {
    const clientId = action.meta.arg.originalArgs.clientFileId!; // TODO !

    api.dispatch(
      backendApi.endpoints.uploadFileContent.initiate(clientId, {
        fixedCacheKey: getUploadContentMutationKey(clientId),
      })
    );
  },
});
