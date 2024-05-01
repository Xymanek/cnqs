import { useQuery } from '@tanstack/react-query';
import type { UseQueryOptions } from '@tanstack/react-query/src/types';
import { Client } from '../backend-api';

export function useListFiles(params?: Partial<UseQueryOptions>) {
  return useQuery({
    queryKey: ['uploaded-files'],
    queryFn: async (ctx) => {
      const client = new Client('http://localhost:5041'); // TODO: temp
      return client.listFilesEndpoint(ctx.signal);
    },
    ...(params || {}),
  });
}
