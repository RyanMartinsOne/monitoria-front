import { api } from "@/lib/api";
import type { UploadImageResponse } from "@/types/image";

export async function uploadImage(
  encontroId: number,
  file: File,
): Promise<UploadImageResponse> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.put<UploadImageResponse>(
    `/encontros/${encontroId}/imagem`,
    formData,
  );

  return response.data;
}

export async function getImage(encontroId: number): Promise<Blob> {
  const response = await api.get<Blob>(`/encontros/${encontroId}/imagem`, {
    responseType: "blob",
  });

  return response.data;
}

export async function deleteImage(encontroId: number): Promise<void> {
  await api.delete(`/encontros/${encontroId}/imagem`);
}
