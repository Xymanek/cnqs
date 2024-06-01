import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import type { components } from './backendApi.types';
import { selectFileByClientId, setUploadProgress } from '@/data/uploader/uploaderSlice';
import { RootState } from '@/data/store';

// noinspection SpellCheckingInspection
export type BEAS = components['schemas'];

export const backendApi = createApi({
  reducerPath: 'backendApi',
  baseQuery: fetchBaseQuery({ baseUrl: '/' }),
  endpoints: (builder) => ({
    listUploadedFiles: builder.query<BEAS['ListFilesResponse'], void>({
      query: () => 'api/files',
    }),
    uploadFile: builder.mutation<BEAS['UploadFileResponse'], BEAS['UploadFileRequest']>({
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
    createFile: builder.mutation<BEAS['CreateFileResponse'], BEAS['CreateFileRequest']>({
      query: (req) => ({
        url: '/api/files',
        method: 'POST',
        body: req,
      }),
    }),
    uploadFileContent: builder.mutation<void, string>({
      queryFn: async (arg, api) => {
        const fileToUpload = selectFileByClientId(api.getState() as RootState, arg);
        if (!fileToUpload) throw new Error('Failed to find file to upload');
        if (!fileToUpload.uploadUrl) throw new Error('Missing upload URL');

        await axios.put(fileToUpload.uploadUrl!, fileToUpload.file, {
          headers: {
            'Content-Type': null,
          },
          onUploadProgress: (progressEvent) => {
            api.dispatch(setUploadProgress({ id: arg, progress: progressEvent.progress }));
          },
          signal: api.signal,
        });

        return {
          data: undefined,
        };
      },
    }),
  }),
});

export const { useListUploadedFilesQuery } = backendApi;
