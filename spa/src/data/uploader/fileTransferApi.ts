import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import axios from 'axios';
import { RootState } from '@/data/store';
import { selectFileByClientId, setUploadProgress } from '@/data/uploader/uploaderSlice';

export const fileTransferApi = createApi({
  reducerPath: 'fileTransferApi',
  baseQuery: fetchBaseQuery(),
  endpoints: (builder) => ({
    uploadFile: builder.mutation<void, string>({
      queryFn: async (arg, api) => {
        const fileToUpload = selectFileByClientId(api.getState() as RootState, arg);
        if (!fileToUpload) throw new Error('Failed to find file to upload');
        if (!fileToUpload.uploadUrl) throw new Error('Missing upload URL');

        await axios.put(fileToUpload.uploadUrl!, fileToUpload.file, {
          onUploadProgress: (progressEvent) => {
            api.dispatch(setUploadProgress({ id: arg, progress: progressEvent.progress }));
          },
          // cancelToken: new Ca // TODO
        });

        return {
          data: undefined,
        };
      },
    }),
  }),
});
