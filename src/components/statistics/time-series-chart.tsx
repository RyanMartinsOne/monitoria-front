import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type {
  PeriodOption,
  StatisticsPeriod,
  TimeSeriesPoint,
} from "@/types/statistics";
import { CHART_COLORS } from "@/utils/statistics";

import { StatCard } from "./stat-card";
import { PeriodSelector } from "./period-selector";
import { ChartTooltip } from "./chart-tooltip";

type TimeSeriesChartProps = {
  data: TimeSeriesPoint[];
  selectedPeriod: StatisticsPeriod;
  periodOptions: PeriodOption[];
  onPeriodChange: (period: StatisticsPeriod) => void;
};

export function TimeSeriesChart({
  data,
  selectedPeriod,
  periodOptions,
  onPeriodChange,
}: TimeSeriesChartProps) {
  return (
    <StatCard
      className="min-w-0 lg:col-span-2"
      title="Encontros ao longo do tempo"
      description="Considera apenas encontros concluídos até o momento"
    >
      <PeriodSelector
        options={periodOptions}
        selectedPeriod={selectedPeriod}
        onChange={onPeriodChange}
      />

      <div className="h-[220px] w-full sm:h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 8,
              right: 8,
              bottom: 0,
              left: -20,
            }}
          >
            <defs>
              <linearGradient id="meetingsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0.35}
                />

                <stop
                  offset="100%"
                  stopColor={CHART_COLORS.primary}
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid stroke={CHART_COLORS.border} vertical={false} />

            <XAxis
              dataKey="label"
              tick={{ fontSize: 11 }}
              axisLine={{
                stroke: CHART_COLORS.border,
              }}
              tickLine={false}
              minTickGap={24}
              interval="preserveStartEnd"
            />

            <YAxis
              tick={{ fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />

            <Tooltip content={<ChartTooltip />} />

            <Area
              type="monotone"
              dataKey="quantity"
              name="Encontros"
              stroke={CHART_COLORS.primary}
              strokeWidth={2}
              fill="url(#meetingsGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </StatCard>
  );
}
