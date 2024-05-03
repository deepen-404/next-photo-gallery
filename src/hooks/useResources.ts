import { CloudinaryResourceT } from "@/types/Cloudinary";
import { useQuery, useQueryClient } from "@tanstack/react-query";

interface UseResourcesT {
    initialResources?: Array<CloudinaryResourceT>
    disabledFetch?: boolean;
    tag?:string;
}

export function useResources (options?: UseResourcesT) {
  const queryClient = useQueryClient();
  const {disabledFetch = false} = options || {}
    const { data: resources } = useQuery({
        queryKey: ["resources", options?.tag],
        queryFn: async () => {
          const { data } = await fetch("/api/resources").then(r => r.json());
          return data;
        },
        initialData: options?.initialResources,
        enabled:!disabledFetch
      });

      function addResorces (results : CloudinaryResourceT[]) {
        queryClient.setQueryData(["resources",String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)], (old:CloudinaryResourceT[])=>([...results, ...(old || [])]))
        queryClient.invalidateQueries({queryKey:["resources",String(process.env.NEXT_PUBLIC_CLOUDINARY_LIBRARY_TAG)]})
      }
      return {resources, addResorces}
}