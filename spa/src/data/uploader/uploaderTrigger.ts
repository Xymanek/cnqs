import { createAction, createListenerMiddleware } from '@reduxjs/toolkit';
import { backendApi } from '../backendApi';
import { FileToUpload, selectFileByClientId, uploaderSlice } from './uploaderSlice';
import { RootState } from '@/data/store';

export function getCreateMutationKey(file: FileToUpload): string {
  return `upload-${file.clientId}`;
}

export function getUploadContentMutationKey(clientId: string): string {
  return `upload-content-${clientId}`;
}

/**
 * Payload is `fileClientId`
 */
export const initiateCreateFile = createAction<string>('uploaderTrigger/initiateCreateFile');

export const uploaderTriggerMiddleware = createListenerMiddleware();

uploaderTriggerMiddleware.startListening({
  actionCreator: uploaderSlice.actions.addFile,
  effect: (action, api) => {
    api.dispatch(initiateCreateFile(action.payload.clientId));
  },
});

uploaderTriggerMiddleware.startListening({
  actionCreator: initiateCreateFile,
  effect: (action, api) => {
    const fileToUpload = selectFileByClientId(api.getState() as RootState, action.payload);
    if (!fileToUpload) throw new Error('Failed to find file to upload');

    api.dispatch(
      backendApi.endpoints.createFile.initiate(
        {
          clientFileId: fileToUpload.clientId,
          contentType: fileToUpload.file.type,
          fileNameWithExtension: fileToUpload.file.name,
          displayName: fileToUpload.displayName,
        },
        {
          fixedCacheKey: getCreateMutationKey(fileToUpload),
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
