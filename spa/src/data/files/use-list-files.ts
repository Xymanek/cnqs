import { useQuery } from '@tanstack/react-query';
import { FilesApi } from '@/backend-api/apis';

export function useListFiles(options?: { refreshOnFocus?: boolean }) {
  return useQuery({
    queryKey: ['uploaded-files'],
    queryFn: (ctx) => new FilesApi().listFilesEndpoint({ signal: ctx.signal }),
    refetchOnWindowFocus: options?.refreshOnFocus,
  });
}
