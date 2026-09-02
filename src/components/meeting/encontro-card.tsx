import { format } from "date-fns";
import { EyeIcon } from "lucide-react";
import { MATERIAS } from "@/types/materia";
import type { EncontroResponse, StatusEncontro } from "@/types/encontro";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { STATUS_OPTIONS } from "@/types/badge";
import { StatusBadgeDropdown } from "@/components/meeting/status-badge-dropdown";
import { DialogMeeting } from "@/components/meeting/encontro-form";

type EncontroCardProps = {
  encontro: EncontroResponse;
  onStatusChange?: (novoStatus: StatusEncontro) => void;
  isUpdatingStatus?: boolean;
};

export default function EncontroCard({
  encontro,
  onStatusChange,
  isUpdatingStatus,
}: EncontroCardProps) {
  const selectedMateria = MATERIAS.find((item) => item.value === encontro.materia);
  const statusInfo = STATUS_OPTIONS.find(
    (opt) => opt.value === encontro.status,
  );

  return (
    <article className="rounded-xl border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="truncate font-semibold">{encontro.beneficiado}</h3>

            {onStatusChange ? (
              <StatusBadgeDropdown
                status={encontro.status}
                onStatusChange={onStatusChange}
                disabled={isUpdatingStatus}
              />
            ) : (
              <Badge variant={statusInfo?.badgeVariant ?? "default"}>
                {statusInfo?.label ?? "indefinido"}
              </Badge>
            )}
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            {selectedMateria?.label ?? "Matéria não informada"}
          </p>
          {encontro.assunto && (
            <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">
              {encontro.assunto}
            </p>
          )}
        </div>

        <DialogMeeting encontro={encontro} mode="view">
          <Button
            variant="outline"
            size="icon"
            className="shrink-0"
            aria-label={`Ver detalhes da monitoria de ${encontro.beneficiado}`}
          >
            <EyeIcon className="size-4" />
          </Button>
        </DialogMeeting>
      </div>

      <div className="mt-4 flex items-center justify-between gap-3 border-t pt-3 text-sm">
        <span className="font-medium">
          {format(new Date(encontro.dataHora), "dd/MM/yyyy")}
        </span>
        <span className="text-muted-foreground">
          {format(new Date(encontro.dataHora), "HH:mm")}
        </span>
      </div>
    </article>
  );
}
