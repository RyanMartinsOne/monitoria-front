import { useState } from "react";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Sector,
  type PieSectorShapeProps,
} from "recharts";

import type { PieChartData, PieSliceName } from "@/types/statistics";
import { formatNumber } from "@/utils/statistics";

import { StatCard } from "./stat-card";

type CompletedPieChartProps = {
  data: PieChartData[];
  completedPercentage: number;
  total: number;
};

type PieSliceProps = PieSectorShapeProps & {
  payload?: PieChartData;
};

function PieSlice({ fill, payload, ...props }: PieSliceProps) {
  return <Sector {...props} fill={payload?.color ?? fill} stroke="none" />;
}

type SliceDescriptionProps = {
  sliceData: PieChartData | null;
  total: number;
};

function SliceDescription({ sliceData, total }: SliceDescriptionProps) {
  if (!sliceData) {
    return (
      <div className="flex min-h-12 items-center justify-center rounded-md border border-dashed bg-muted/30 px-3 py-2 text-center text-xs text-muted-foreground">
        Clique ou passe o mouse em uma fatia para ver os detalhes.
      </div>
    );
  }

  const percentage =
    total > 0 ? Math.round((sliceData.value / total) * 100) : 0;

  return (
    <div className="flex min-h-12 items-center justify-between gap-3 rounded-md border bg-muted/30 px-3 py-2">
      <div className="flex min-w-0 items-center gap-2">
        <span
          className="h-2.5 w-2.5 shrink-0 rounded-full"
          style={{
            backgroundColor: sliceData.color,
          }}
        />

        <span className="truncate text-xs font-medium">{sliceData.name}</span>
      </div>

      <span className="shrink-0 text-xs tabular-nums text-muted-foreground">
        {formatNumber(sliceData.value)} encontro
        {sliceData.value === 1 ? "" : "s"} · {percentage}%
      </span>
    </div>
  );
}

export function CompletedPieChart({
  data,
  completedPercentage,
  total,
}: CompletedPieChartProps) {
  const [selectedName, setSelectedName] = useState<PieSliceName | null>(null);

  const selectedData = data.find((item) => item.name === selectedName) ?? null;

  function selectSliceByIndex(index: number) {
    const sliceData = data[index];

    if (!sliceData) {
      return;
    }

    setSelectedName(sliceData.name);
  }

  return (
    <StatCard
      className="min-w-0"
      contentClassName="space-y-3"
      title="Concluído x total"
      description="Percentual de encontros concluídos"
    >
      <div className="relative h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={62}
              outerRadius={86}
              startAngle={90}
              endAngle={-270}
              stroke="none"
              shape={PieSlice}
              onMouseEnter={(_, index) => {
                selectSliceByIndex(index);
              }}
              onClick={(_, index) => {
                selectSliceByIndex(index);
              }}
            />
          </PieChart>
        </ResponsiveContainer>

        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-semibold tabular-nums">
            {completedPercentage}%
          </span>

          <span className="text-xs text-muted-foreground">concluídos</span>
        </div>
      </div>

      <SliceDescription sliceData={selectedData} total={total} />
    </StatCard>
  );
}
