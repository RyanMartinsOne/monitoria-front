import { XCircle } from "lucide-react";

export function EmptyCancellationState() {
  const message =
    "Ainda não há uma matéria com monitorias suficientes para calcular uma taxa confiável.";

  return (
    <div className="flex h-[240px] flex-col items-center justify-center gap-2 rounded-md border border-dashed bg-muted/20 px-6 text-center">
      <XCircle size={28} className="text-muted-foreground" aria-hidden="true" />

      <p className="text-sm font-medium">
        Dados insuficientes para exibir o gráfico
      </p>

      <p className="max-w-[280px] text-xs leading-relaxed text-muted-foreground">
        {message}
      </p>
    </div>
  );
}