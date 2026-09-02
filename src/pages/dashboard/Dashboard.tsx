import DashboardMenubar from "@/components/dashboard/menu-bar";
import EncontroCard from "@/components/meeting/encontro-card";
import { Button } from "@/components/ui/button";
import { useEncontroWithFilters, useUsuarios } from "@/hooks/useDashboard";
import { TrashIcon } from "lucide-react";
import { useState } from "react";
import { STATUS_OPTIONS } from "@/types/badge";
import { MATERIAS } from "@/types/materia";
import type { ViewMode } from "@/types/dashboard";
import UsuarioCard from "@/components/dashboard/usuario-card";

export default function Dashboard() {
  const [mode, setMode] = useState<ViewMode>({ type: "usuario" });

  const usuarioFilter = mode.type === "usuario" ? mode.materia : undefined;
  const encontroFilter = mode.type === "encontro" ? mode.filter : {};

  const {
    data: usuarios = [],
    isLoading: loadingUsuarios,
    error: errorUsuarios,
  } = useUsuarios(usuarioFilter);

  const {
    data: encontros = [],
    isLoading: loadingEncontros,
    error: errorEncontros,
  } = useEncontroWithFilters(encontroFilter);

  const isLoading =
    mode.type === "usuario" ? loadingUsuarios : loadingEncontros;

  const error = mode.type === "usuario" ? errorUsuarios : errorEncontros;

  const activeFilters =
    mode.type === "usuario"
      ? Boolean(mode.materia)
      : Boolean(mode.filter.materia || mode.filter.status);

  function cleanFilters() {
    if (mode.type === "usuario") {
      setMode({ type: "usuario" });
    } else {
      setMode({ type: "encontro", filter: {} });
    }
  }

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Bem-vindo ao painel de controle!
        </p>
      </header>

      <main className="space-y-3">
        <h2 className="text-xl font-semibold">O que deseja buscar?</h2>
        <div>
          <DashboardMenubar mode={mode} onModeChange={setMode} />

          {activeFilters && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <span>Filtros ativos:</span>

              {mode.type === "usuario" && mode.materia && (
                <span className="px-2 py-1">
                  Matéria:{" "}
                  {MATERIAS.find((m) => m.value === mode.materia)?.label}
                </span>
              )}

              {mode.type === "encontro" && mode.filter.materia && (
                <span className="px-2 py-1">
                  Matéria:{" "}
                  {MATERIAS.find((m) => m.value === mode.filter.materia)?.label}
                </span>
              )}

              {mode.type === "encontro" && mode.filter.status && (
                <span className="px-2 py-1">
                  Status:{" "}
                  {
                    STATUS_OPTIONS.find((s) => s.value === mode.filter.status)
                      ?.label
                  }
                </span>
              )}

              <Button
                variant="ghost"
                onClick={cleanFilters}
                className="text-red-700 hover:text-red-800"
              >
                <TrashIcon /> Remover
              </Button>
            </div>
          )}
        </div>

        {isLoading && <p>Carregando...</p>}

        {error && <p>Ocorreu um erro na busca.</p>}

        {mode.type === "usuario" && !isLoading && !error && (
          <div>
            {usuarios.length === 0 ? (
              <p>Nada foi encontrado ao filtrar, tente ser mais abrangente.</p>
            ) : (
              <div className="grid col-auto gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {usuarios.map((usuario) => (
                  <UsuarioCard key={usuario.id} usuario={usuario} />
                ))}
              </div>
            )}
          </div>
        )}

        {mode.type === "encontro" && !isLoading && !error && (
          <div>
            {encontros.length === 0 ? (
              <p>Nada foi encontrado ao filtrar, tente ser mais abrangente.</p>
            ) : (
              <div className="grid col-auto gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {encontros.map((encontro) => (
                  <EncontroCard key={encontro.id} encontro={encontro} />
                ))}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
