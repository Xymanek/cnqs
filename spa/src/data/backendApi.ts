import { emptySplitApi as api } from './emptyApi';
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    uploadFileEndpoint: build.mutation<UploadFileEndpointApiResponse, UploadFileEndpointApiArg>({
      query: (queryArg) => ({
        url: `/api/upload`,
        method: 'POST',
        body: queryArg.uploadFileRequest,
      }),
    }),
    listFilesEndpoint: build.query<ListFilesEndpointApiResponse, ListFilesEndpointApiArg>({
      query: () => ({ url: `/api/files` }),
    }),
    downloadFileEndpoint: build.query<DownloadFileEndpointApiResponse, DownloadFileEndpointApiArg>({
      query: (queryArg) => ({ url: `/l/${queryArg.fileId}` }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backendApi };
export type UploadFileEndpointApiResponse = /** status 200 Success */ UploadFileResponse;
export type UploadFileEndpointApiArg = {
  uploadFileRequest: UploadFileRequest;
};
export type ListFilesEndpointApiResponse = /** status 200 Success */ ListFilesResponse;
export type ListFilesEndpointApiArg = void;
export type DownloadFileEndpointApiResponse = /** status 200 Success */ any;
export type DownloadFileEndpointApiArg = {
  fileId: string;
};
export type UploadFileResponse = {
  viewUrl?: string;
  shareUrl?: string | null;
};
export type ErrorResponse = {
  /** the http status code sent to the client. default is 400. */
  statusCode?: number;
  /** the message for the error response */
  message?: string;
  /** the collection of errors for the current context */
  errors?: {
    [key: string]: string[];
  };
};
export type UploadFileRequest = {
  file?: Blob;
  autoShare?: boolean | null;
};
export type ListFilesFileModel = {
  fileName?: string;
  shareLink?: string;
};
export type ListFilesResponse = {
  files?: ListFilesFileModel[];
};
export const {
  useUploadFileEndpointMutation,
  useListFilesEndpointQuery,
  useDownloadFileEndpointQuery,
} = injectedRtkApi;
