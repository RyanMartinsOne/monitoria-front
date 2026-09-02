import EncontroCard from "@/components/meeting/encontro-card";
import EncontroTable from "@/components/meeting/encontro-table";
import { toast } from "@/components/ui/toast";
import { useEncontros, useUpdateEncontroStatus } from "@/hooks/useEncontro";
import { useCurrentUser } from "@/hooks/useUsuarios";
import type { StatusEncontro } from "@/types/encontro";

export default function Home() {
  const { data: usuario } = useCurrentUser();
  const { data: encontros = [], isLoading, isError } = useEncontros("AGENDADO");
  const { mutate: updateStatus, isPending: isUpdatingStatus } =
    useUpdateEncontroStatus();

  function handleStatusChange(id: string, novoStatus: StatusEncontro) {
    updateStatus(
      {
        encontroId: id,
        status: novoStatus,
      },
      {
        onSuccess: () => {
          toast.add({
            title: `Encontro ${novoStatus.toLocaleLowerCase()}`,
            description: `O status do encontro foi marcado como ${novoStatus.toLocaleLowerCase()}.`,
            type: "success",
          });
        },

        onError: () => {
          toast.add({
            title: "Erro ao atualizar status",
            description: "Não foi possível atualizar o status do encontro.",
            type: "error",
          });
        },
      },
    );
  }

  return (
    <div className="w-full p-6 flex flex-col items-center space-y-7">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Página Inicial</h1>
        <p className="mt-2 text-base">Bem-vindo, {usuario?.nome}</p>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold">Próximos Encontros</h2>

        {isLoading && (
          <div className="pt-2 text-sm text-muted-foreground">
            Carregando encontros...
          </div>
        )}

        {isError && (
          <div className="pt-2 text-sm text-destructive">
            Ocorreu um erro ao carregar as monitorias. Por favor, tente
            novamente mais tarde.
          </div>
        )}

        {!isLoading && !isError && encontros && encontros.length === 0 && (
          <div className="pt-2 text-sm text-muted-foreground">
            Nenhuma monitoria agendada para os próximos dias.
          </div>
        )}

        {!isLoading && !isError && encontros && encontros.length > 0 && (
          <div className="w-full overflow-x-auto rounded-xl border">
            {/* Visualização mobile */}
            <div className="space-y-3 md:hidden">
              {encontros.map((encontro) => (
                <EncontroCard
                  key={encontro.id}
                  encontro={encontro}
                  onStatusChange={(novoStatus) =>
                    handleStatusChange(encontro.id, novoStatus)
                  }
                  isUpdatingStatus={isUpdatingStatus}
                />
              ))}
            </div>

            {/* Visualização desktop e tablet */}
            <div className="hidden w-full overflow-x-auto rounded-xl border md:block">
              <EncontroTable
                encontros={encontros}
                onStatusChange={handleStatusChange}
                isUpdatingStatus={isUpdatingStatus} statusLabel={"agendado"} isTodas={false}              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
