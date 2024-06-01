import { createListenerMiddleware } from '@reduxjs/toolkit';
import { backendApi } from '../backendApi';
import { FileToUpload, uploaderSlice } from './uploaderSlice';
import { fileTransferApi } from '@/data/uploader/fileTransferApi';

export function getCreateMutationKey(file: FileToUpload): string {
  return `upload-${file.clientId}`;
}

export function getUploadMutationKey(clientId: string): string {
  return `upload-${clientId}`;
}

export const uploaderTriggerMiddleware = createListenerMiddleware();

uploaderTriggerMiddleware.startListening({
  actionCreator: uploaderSlice.actions.addFile,
  effect: (action, api) => {
    api.dispatch(
      backendApi.endpoints.createFile.initiate(
        // {
        //   file: new Blob([action.payload.file]),
        //   autoShare: true,
        // },
        {
          clientId: action.payload.clientId,
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
    const clientId = action.meta.arg.originalArgs.clientId!;// TODO !

    api.dispatch(
      fileTransferApi.endpoints.uploadFile.initiate(
        clientId,
        {
          fixedCacheKey: getUploadMutationKey(clientId),
        }
      )
    );
  },
});
