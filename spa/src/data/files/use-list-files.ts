import { useQuery } from '@tanstack/react-query';
import { Client } from '../backend-api';

export function useListFiles() {
  return useQuery({
    queryKey: ['uploaded-files'],
    queryFn: (ctx) => {
      const client = new Client('http://localhost:5041'); // TODO: temp
      return client.listFilesEndpoint(ctx.signal);
    },
  });
}
