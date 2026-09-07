import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { SubjectData } from "@/types/statistics";
import { CHART_COLORS } from "@/utils/statistics";

import { StatCard } from "./stat-card";
import { ChartTooltip } from "./chart-tooltip";

type SubjectQuantityChartProps = {
  data: SubjectData[];
};

export function SubjectQuantityChart({ data }: SubjectQuantityChartProps) {
  const hasNoData = data.length === 0;

  return (
    <StatCard
      className="min-w-0"
      title="Quantidade por matéria"
      description="Total de encontros registrados"
    >
      {hasNoData ? (
        <div className="flex h-[240px] items-center justify-center rounded-md border border-dashed bg-muted/20 px-6 text-center text-sm text-muted-foreground">
          Nenhum encontro registrado por matéria ainda.
        </div>
      ) : (
        <div className="h-[240px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{
                top: 0,
                right: 16,
                bottom: 0,
                left: 8,
              }}
            >
              <CartesianGrid stroke={CHART_COLORS.border} horizontal={false} />

              <XAxis
                type="number"
                allowDecimals={false}
                tick={{ fontSize: 11 }}
                axisLine={true}
                tickLine={false}
              />

              <YAxis
                type="category"
                dataKey="subject"
                width={60}
                tick={{ fontSize: 11 }}
                axisLine={false}
                tickLine={false}
              />

              <Tooltip content={<ChartTooltip />} />

              <Bar
                dataKey="quantity"
                name="Encontros"
                fill={CHART_COLORS.primary}
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
