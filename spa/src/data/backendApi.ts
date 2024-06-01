import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  CreateFileRequest,
  CreateFileRequestToJSON,
  CreateFileResponse,
  CreateFileResponseFromJSON,
  ListFilesResponse,
  type UploadFileResponse,
} from '@/backend-api/models';
import { UploadFileEndpointRequest } from '@/backend-api/apis';
import { RootState } from '@/data/store';

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    listUploadedFiles: builder.query<ListFilesResponse, void>({
      query: () => 'api/files',
    }),
    uploadFile: builder.mutation<UploadFileResponse, UploadFileEndpointRequest>({
      query: (req) => {
        const formData = new FormData();

        formData.append('file', req.file!);
        formData.append('autoShare', String(req.autoShare));

        return {
          url: '/api/upload',
          method: 'POST',
          body: formData,
        };
      },
    }),
    createFile: builder.mutation<CreateFileResponse, CreateFileRequest>({
      query: (req) => ({
        url: '/api/files',
        method: 'POST',
        body: CreateFileRequestToJSON(req),
      }),
      transformResponse: (baseQueryReturnValue): CreateFileResponse =>
        CreateFileResponseFromJSON(baseQueryReturnValue),
    }),
    transferFile: builder.mutation<CreateFileResponse, CreateFileRequest>({
      queryFn: async (arg, api) => {
        (api.getState() as RootState).uploader.files[0].file;

        await new Promise(() => {});

        return {
          data: {} as CreateFileResponse,
        };
      },
    }),
  }),
});

// backendApi.endpoints.createFile.select('').

export const { useListUploadedFilesQuery, useUploadFileMutation } = backendApi;
