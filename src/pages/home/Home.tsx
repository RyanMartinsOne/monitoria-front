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
import { EyeIcon } from "lucide-react";
 
export default function Home() {
  return (
    <div className="w-full p-6 flex flex-col items-center space-y-7">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight">Página Inicial</h1>
        <p className="mt-2 text-base">Bem-vindo à plataforma de monitoria!</p>
      </div>

      <div className="w-full space-y-4">
        <h2 className="text-xl font-semibold">Próximos Encontros</h2>

        <div className="w-full overflow-x-auto rounded-xl border">
          <Table>
            <TableCaption className="text-mauve-700">
              Histórico de monitorias agendadas.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-45">Aluno</TableHead>
                <TableHead>Matéria</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Horário</TableHead>
                <TableHead>Data</TableHead>
                <TableHead className="text-right">Detalhes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">Brian O' Conner</TableCell>
                <TableCell>Matemática</TableCell>
                <TableCell>Progressão Geométrica</TableCell>
                <TableCell>10:00 - 12:00</TableCell>
                <TableCell>2023-10-15</TableCell>
                <TableCell className="text-right">
                  <Button variant="outline" size="sm">
                    <EyeIcon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
