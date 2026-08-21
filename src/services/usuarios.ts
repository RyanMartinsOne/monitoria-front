import { api } from "../lib/api";
import type { UsuarioRequest, UsuarioResponse } from "../types/usuarios";

export async function createUsuario(data: UsuarioRequest) {
  const response = await api.post("/usuarios", data);
  return response.data;
}

export async function getMe(): Promise<UsuarioResponse> {
  const response = await api.get("/usuario/eu");
  return response.data;
}