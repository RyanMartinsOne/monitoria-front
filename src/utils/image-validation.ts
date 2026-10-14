export const IMAGE_MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10MB, igual ao backend
export const IMAGE_ACCEPTED_TYPES = ["image/jpeg", "image/png"];

export function validateImageFile(file: File): string | null {
  if (!IMAGE_ACCEPTED_TYPES.includes(file.type)) {
    return "Formato inválido. Envie uma imagem JPG, JPEG ou PNG.";
  }

  if (file.size > IMAGE_MAX_SIZE_BYTES) {
    return "A imagem é muito grande. O tamanho máximo é 10MB.";
  }

  return null;
}