import { EyeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DialogMeeting } from "./encontro-form";
import { StatusBadgeDropdown } from "@/components/meeting/status-badge-dropdown";
import { format } from "date-fns";
import { MATERIAS } from "@/types/materia";
import type { EncontroResponse, StatusEncontro } from "@/types/encontro";

interface EncontroTableProps {
  encontros: EncontroResponse[];
  statusLabel: string;
  isTodas: boolean;
  onStatusChange: (id: string, novoStatus: StatusEncontro) => void;
  isUpdatingStatus: boolean;
}

function EncontroTable({
  encontros,
  statusLabel,
  isTodas,
  onStatusChange,
  isUpdatingStatus,
}: EncontroTableProps) {
  return (
    <div className="hidden w-full overflow-x-auto rounded-xl border md:block">
      <Table>
        <TableCaption>
          Histórico de monitorias{" "}
          {isTodas ? "(todas)" : `com status ${statusLabel.toLowerCase()}`}.
        </TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead className="w-45">Aluno</TableHead>
            <TableHead>Matéria</TableHead>
            <TableHead>Assunto</TableHead>
            <TableHead>Horário</TableHead>
            <TableHead>Data</TableHead>
            <TableHead>Observações</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Detalhes</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {encontros.map((encontro) => {
            const materia = MATERIAS.find(
              (item) => item.value === encontro.materia,
            );

            return (
              <TableRow key={encontro.id}>
                <TableCell className="font-medium">
                  {encontro.beneficiado}
                </TableCell>

                <TableCell>{materia?.label ?? "-"}</TableCell>

                <TableCell>{encontro.assunto ?? "-"}</TableCell>

                <TableCell>
                  {format(new Date(encontro.dataHora), "HH:mm")}
                </TableCell>

                <TableCell>
                  {format(new Date(encontro.dataHora), "dd/MM/yyyy")}
                </TableCell>

                <TableCell className="max-w-62.5 truncate">
                  {encontro.observacoes ?? "-"}
                </TableCell>

                <TableCell>
                  <StatusBadgeDropdown
                    status={encontro.status}
                    onStatusChange={(novoStatus) =>
                      onStatusChange(encontro.id, novoStatus)
                    }
                    disabled={isUpdatingStatus}
                  />
                </TableCell>

                <TableCell className="text-right">
                  <DialogMeeting encontro={encontro} mode="view">
                    <Button
                      variant="outline"
                      size="icon"
                      aria-label={`Ver detalhes da monitoria de ${encontro.beneficiado}`}
                    >
                      <EyeIcon className="size-4" />
                    </Button>
                  </DialogMeeting>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

export default EncontroTable;