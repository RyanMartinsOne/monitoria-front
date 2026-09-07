import type { PeriodOption, StatisticsPeriod } from "@/types/statistics";

type PeriodSelectorProps = {
  options: PeriodOption[];
  selectedPeriod: StatisticsPeriod;
  onChange: (period: StatisticsPeriod) => void;
};

export function PeriodSelector({
  options,
  selectedPeriod,
  onChange,
}: PeriodSelectorProps) {
  return (
    <div className="mb-3 flex gap-1">
      {options.map((option) => {
        const isActive = option.key === selectedPeriod;

        return (
          <button
            key={option.key}
            type="button"
            onClick={() => onChange(option.key)}
            className={`rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted"
            }`}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
