import { useEncontroById } from "@/hooks/useDashboard";
import { MATERIAS } from "@/types/materia";
import { Button } from "../ui/button";
import { EyeIcon } from "lucide-react";
import { Link } from "react-router";

export default function UsuarioCard({
  usuario,
}: {
  usuario: { id: string; nome: string; materia: string };
}) {
  const { data: encontros = [] } = useEncontroById(usuario.id);

  return (
    <article className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-semibold">
            {usuario.nome || "Usuário não encontrado"}
          </h3>

          <p className="text-muted-foreground">
            {MATERIAS.find((item) => item.value === usuario.materia)?.label ||
              "Sem matéria"}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3 text-sm">
            <p className="text-muted-foreground">
              {encontros.length} Monitorias agendadas
            </p>
          </div>
        </div>

        <Button variant="outline" size="sm">
          <Link
            to={`/dashboard/usuario/${usuario.id}`}
            aria-label={`Ver monitorias de ${usuario.nome}`}
          >
            <EyeIcon className="size-4" />
          </Link>
        </Button>
      </div>
    </article>
  );
}
