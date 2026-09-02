import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DialogMeeting } from "../../components/meeting/encontro-form";
import EmptyMeetings from "@/components/empty-meetings";
import { useEncontros, useUpdateEncontroStatus } from "@/hooks/useEncontro";
import type { StatusEncontro } from "@/types/encontro";
import { toast } from "@/components/ui/toast";
import { STATUS_OPTIONS } from "@/types/badge";
import EncontroCard from "@/components/meeting/encontro-card";
import EncontroTable from "@/components/meeting/encontro-table";

const STATUS_TABS = STATUS_OPTIONS;

export default function Meeting() {
  const [status, setStatus] = useState<StatusEncontro>("TODAS");
  const {
    data: encontros,
    isLoading,
    isError,
  } = useEncontros(status === "TODAS" ? undefined : status);
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
    <div className="flex h-full w-full flex-col">
      <header className="flex flex-row items-center justify-between gap-6 p-6 sm:p-6 sm:pb-0">
        <h1 className="text-2xl font-bold">Monitoria</h1>

        <DialogMeeting>
          <Button className="w-auto cursor-pointer">
            <Pencil className="size-4" />
            Agendar
          </Button>
        </DialogMeeting>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        <Tabs
          value={status}
          onValueChange={(value) => setStatus(value as StatusEncontro)}
        >
          <TabsList>
            {STATUS_TABS.map((tab) => (
              <TabsTrigger
                className="cursor-pointer"
                key={tab.value}
                value={tab.value}
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {STATUS_TABS.map((tab) => (
            <TabsContent key={tab.value} value={tab.value} className="mt-4">
              {isLoading && status === tab.value && (
                <p className="text-sm text-muted-foreground">
                  Carregando monitorias...
                </p>
              )}

              {isError && status === tab.value && (
                <p className="text-sm text-destructive">
                  Ocorreu um erro ao carregar as monitorias. Por favor, tente
                  novamente mais tarde.
                </p>
              )}

              {!isLoading &&
                !isError &&
                status === tab.value &&
                encontros?.length === 0 && (
                  <div className="flex flex-1 justify-center p-4 sm:p-6">
                    {tab.value === "TODAS" ? (
                      <EmptyMeetings />
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        Ainda não existe monitorias {tab.label.toLowerCase()}.
                      </p>
                    )}
                  </div>
                )}

              {!isLoading &&
                !isError &&
                status === tab.value &&
                encontros &&
                encontros.length > 0 && (
                  <>
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
                        statusLabel={tab.label}
                        isTodas={tab.value === "TODAS"}
                        onStatusChange={handleStatusChange}
                        isUpdatingStatus={isUpdatingStatus}
                      />
                    </div>
                  </>
                )}
            </TabsContent>
          ))}
        </Tabs>
      </main>
    </div>
  );
}
