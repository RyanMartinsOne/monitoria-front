import { api } from "../lib/api";
import type {
  EncontroRequest,
  EncontroResponse,
  StatusEncontro,
} from "../types/encontro";

export async function createEncontro(data: EncontroRequest) {
  const response = await api.post("/encontros", data);
  return response.data;
}

export async function getEncontros(params?: {
  status?: string;
}): Promise<EncontroResponse[]> {
  const response = await api.get("/encontros", { params });
  return response.data;
}

export async function updateEncontro(id: string, data: EncontroRequest) {
  const response = await api.put(`/encontros/${id}`, data);
  return response.data;
}

export async function updateEncontroStatus(id: string, status: StatusEncontro) {
  const response = await api.patch(`/encontros/status/${id}`, status);
  return response.data;
}

export async function deleteEncontro(id: string) {
  const response = await api.delete(`/encontros/${id}`);
  return response.data;
}
