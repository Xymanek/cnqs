import { createListenerMiddleware } from '@reduxjs/toolkit';
import { backendApi } from '../backendApi';
import { FileToUpload, uploaderSlice } from './uploaderSlice';

export function getUploadMutationKey(file: FileToUpload): string {
  return `upload-${file.id}`;
}

export const uploaderTriggerMiddleware = createListenerMiddleware();

uploaderTriggerMiddleware.startListening({
  actionCreator: uploaderSlice.actions.addFile,
  effect: (action, api) => {
    api.dispatch(
      backendApi.endpoints.uploadFile.initiate(
        {
          file: new Blob([action.payload.file]),
          autoShare: true,
        },
        {
          fixedCacheKey: getUploadMutationKey(action.payload),
        }
      )
    );
  },
});
