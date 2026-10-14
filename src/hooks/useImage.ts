import { deleteImage, getImage, uploadImage } from "@/services/image";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";

export function useUploadImage() {
  return useMutation({
    mutationFn: ({ encontroId, file }: { encontroId: number; file: File }) =>
      uploadImage(encontroId, file),
  });
}

export function useMonitoriaImage(encontroId: number) {
  return useQuery<Blob | null>({
    queryKey: ["monitoria-image", encontroId],
    queryFn: async () => {
      try {
        return await getImage(encontroId);
      } catch (error) {
        // 404 = encontro sem imagem: não é erro
        if (isAxiosError(error) && error.response?.status === 404) {
          return null;
        }
        throw error;
      }
    },
    enabled: Number.isFinite(encontroId) && encontroId > 0,
    retry: false,
  });
}

export function useDeleteImage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (encontroId: number) => deleteImage(encontroId),

    onSuccess: (_data, encontroId) => {
      queryClient.setQueryData(["monitoria-image", encontroId], null);
    },
  });
}
