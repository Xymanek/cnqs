import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { ListFilesResponse, type UploadFileResponse } from '@/backend-api/models';
import { UploadFileEndpointRequest } from '@/backend-api/apis';

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
  }),
});

export const { useListUploadedFilesQuery, useUploadFileMutation } = backendApi;
