import { AxiosRequestConfig } from "axios";
import { useQuery } from "react-query";

export function useAPI<D, E>({
  tag,
  options,
  enabled = true,
}: {
  tag: string;
  options: AxiosRequestConfig;
  enabled?: boolean;
}) {
  return useQuery<D, E>({
    queryKey: [tag, { options }],
    enabled: enabled,
    staleTime: Number.POSITIVE_INFINITY,
  });
}
