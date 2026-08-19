import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createEncontro,
  deleteEncontro,
  getEncontros,
  updateEncontro,
  updateEncontroStatus,
} from "@/services/encontro";
import type {
  EncontroRequest,
  EncontroResponse,
  StatusEncontro,
} from "@/types/encontro";

export function useEncontros(status?: StatusEncontro) {
  return useQuery<EncontroResponse[]>({
    queryKey: ["encontros", status ?? "ALL"],
    queryFn: () => getEncontros(status ? { status } : undefined),
    select: (data) => {
      return [...data].sort((a, b) => {
        return new Date(a.dataHora).getTime() - new Date(b.dataHora).getTime();
      });
    },
  });
}

export function useCreateEncontro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createEncontro,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["encontros"] });
    },
  });
}

export function useUpdateEncontro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (updatedEncontro: EncontroRequest) => {
      return updateEncontro(updatedEncontro);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["encontros"] });
    },
  });
}

export function useUpdateEncontroStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      status,
      encontroId,
    }: {
      encontroId: string;
      status: StatusEncontro;
    }) => {
      return updateEncontroStatus(encontroId, status);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["encontros"],
      });
    },
  });
}

export function useDeleteEncontro() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (encontroId: string) => {
      return deleteEncontro(encontroId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["encontros"] });
    },
  });
}
