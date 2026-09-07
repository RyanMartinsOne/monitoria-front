type TooltipItem = {
  name?: string;
  value?: string | number;
  color?: string;
  fill?: string;
  payload?: {
    name?: string;
    color?: string;
  };
};

type ChartTooltipProps = {
  active?: boolean;
  label?: string;
  suffix?: string;
  payload?: TooltipItem[];
};

export function ChartTooltip({
  active,
  payload,
  label,
  suffix = "",
}: ChartTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const firstItem = payload[0];

  const title =
    label ?? firstItem.payload?.name ?? firstItem.name ?? "Detalhes";

  return (
    <div
      role="tooltip"
      aria-live="polite"
      className="rounded-lg border bg-card px-3 py-2 text-xs shadow-md"
    >
      <p className="mb-1 font-medium text-foreground">{title}</p>

      {payload.map((item, index) => {
        const value =
          typeof item.value === "number"
            ? item.value.toLocaleString("pt-BR")
            : item.value;

        const name = item.name ?? item.payload?.name ?? "Valor";

        return (
          <p
            key={`${name}-${index}`}
            style={{
              color: item.color ?? item.fill ?? item.payload?.color,
            }}
          >
            {name}: {value}
            {suffix}
          </p>
        );
      })}
    </div>
  );
}
