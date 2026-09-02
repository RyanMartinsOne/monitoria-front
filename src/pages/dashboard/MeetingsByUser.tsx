import { useParams, Link } from "react-router";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEncontroById, useUsuarioById } from "@/hooks/useDashboard";
import EncontroCard from "@/components/meeting/encontro-card";

export default function MeetingsByUser() {
  const { usuarioId } = useParams<{ usuarioId: string }>();
  const { data: usuario } = useUsuarioById(usuarioId ?? "");
  const {
    data: encontros = [],
    isLoading,
    isError,
  } = useEncontroById(usuarioId ?? "");
  const nomeMonitor = usuario?.nome ?? "Usuário"

  return (
    <div className="flex h-full w-full flex-col">
      <header className="flex items-center gap-3 p-4 sm:p-6">
        <Button variant="ghost" size="icon">
          <Link to="/dashboard" aria-label="Voltar ao dashboard">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">Monitorias de {nomeMonitor}</h1>
      </header>

      <main className="flex-1 p-4 sm:p-6">
        {isLoading && (
          <p className="text-sm text-muted-foreground">
            Carregando monitorias...
          </p>
        )}

        {isError && (
          <p className="text-sm text-destructive">
            Ocorreu um erro ao carregar as monitorias.
          </p>
        )}

        {!isLoading && !isError && encontros.length === 0 && (
          <p className="text-sm text-muted-foreground">
            Nenhuma monitoria encontrada para este usuário.
          </p>
        )}

        {!isLoading && !isError && encontros.length > 0 && (
          <div className="space-y-3">
            {encontros.map((encontro) => (
              <EncontroCard key={encontro.id} encontro={encontro} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
