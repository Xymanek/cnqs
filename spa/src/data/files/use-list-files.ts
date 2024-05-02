import { useQuery } from '@tanstack/react-query';
import { Client } from '../backend-api';

export function useListFiles(options?: { refreshOnFocus?: boolean }) {
  return useQuery({
    queryKey: ['uploaded-files'],
    queryFn: (ctx) => {
      const client = new Client();
      return client.listFilesEndpoint(ctx.signal);
    },
    refetchOnWindowFocus: options?.refreshOnFocus,
  });
}
