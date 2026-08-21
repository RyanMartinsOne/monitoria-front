import { api } from "../lib/api";
import type { UsuarioResponse } from "../types/usuarios";

export async function getMe(): Promise<UsuarioResponse> {
  const response = await api.get("/usuario/eu");
  return response.data;
}