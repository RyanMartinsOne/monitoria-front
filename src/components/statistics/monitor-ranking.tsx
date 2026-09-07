import type { MonitorRanking as MonitorRankingItem } from "@/types/statistics";
import { CHART_COLORS, formatNumber } from "@/utils/statistics";

import { StatCard } from "./stat-card";

type MonitorRankingProps = {
  data: MonitorRankingItem[];
};

export function MonitorRanking({ data }: MonitorRankingProps) {
  const maxAttendances = data[0]?.attendances ?? 1;

  return (
    <StatCard
      className="min-w-0"
      title="Quem mais atendeu"
      description="Ranking por encontros concluídos"
    >
      {data.length === 0 ? (
        <div className="flex h-[240px] items-center justify-center rounded-md border border-dashed bg-muted/20 px-6 text-center text-sm text-muted-foreground">
          Nenhum encontro concluído ainda.
        </div>
      ) : (
        <div className="flex flex-col gap-2.5">
          {data.map((monitor, index) => {
            const isFirstPlace = index === 0;

            const percentage = (monitor.attendances / maxAttendances) * 100;

            return (
              <div key={monitor.name} className="flex items-center gap-3">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold"
                  style={{
                    backgroundColor: isFirstPlace
                      ? CHART_COLORS.highlight
                      : CHART_COLORS.inactiveBar,
                    color: isFirstPlace ? "#FFFFFF" : CHART_COLORS.rankingText,
                  }}
                >
                  {index + 1}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-baseline justify-between gap-2">
                    <span className="truncate text-xs font-medium">
                      {monitor.name}
                    </span>

                    <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
                      {formatNumber(monitor.attendances)}
                    </span>
                  </div>

                  <div
                    className="h-1.5 w-full rounded-full"
                    style={{
                      backgroundColor: CHART_COLORS.inactiveBar,
                    }}
                  >
                    <div
                      className="h-1.5 rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: CHART_COLORS.highlight,
                      }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </StatCard>
  );
}
