import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { CancellationBySubject } from "@/types/statistics";
import { CHART_COLORS } from "@/utils/statistics";

import { StatCard } from "./stat-card";
import { EmptyCancellationState } from "./empty-cancellation-state";
import { ChartTooltip } from "./chart-tooltip";

type CancellationChartProps = {
  data: CancellationBySubject[];
};

export function CancellationChart({ data }: CancellationChartProps) {
  const hasNotEnoughData = data.length === 0;

  return (
    <StatCard
      title="Matéria que mais cancela"
      description="% de cancelamento por matéria (mín. 3 encontros)"
    >
      {hasNotEnoughData ? (
        <EmptyCancellationState />
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ left: 8, right: 16 }}
            >
              <CartesianGrid stroke={CHART_COLORS.border} horizontal={false} />

              <XAxis
                type="number"
                domain={[0, 100]}
                unit="%"
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="subject"
                width={110}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<ChartTooltip suffix="%" />} />

              <Bar
                dataKey="rate"
                name="Cancelamento"
                fill={CHART_COLORS.cancellation}
                radius={[0, 4, 4, 0]}
                barSize={14}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </StatCard>
  );
}
