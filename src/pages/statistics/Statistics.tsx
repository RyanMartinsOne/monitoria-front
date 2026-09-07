import { useMemo, useState } from "react";
import { CalendarCheck2, ClockIcon, Trophy, XCircle } from "lucide-react";
import type { PeriodOption, StatisticsPeriod } from "@/types/statistics";
import { useEncontroWithFilters } from "@/hooks/useDashboard";
import {
  buildCompletedChartData,
  buildMonitorRanking,
  buildTimeSeries,
  calculateCancellationBySubject,
  calculateCompletedPercentage,
  calculateKpis,
  CHART_COLORS,
  formatNumber,
  groupBySubject,
} from "@/utils/statistics";
import { KpiCard } from "@/components/statistics/kpi-card";
import { TimeSeriesChart } from "@/components/statistics/time-series-chart";
import { CompletedPieChart } from "@/components/statistics/completed-pie-chart";
import { SubjectQuantityChart } from "@/components/statistics/subject-quantity-chart";
import { MonitorRanking } from "@/components/statistics/monitor-ranking";
import { CancellationChart } from "@/components/statistics/cancellation-chart";

const PERIOD_OPTIONS: PeriodOption[] = [
  { key: "day", label: "Dia" },
  { key: "week", label: "Semana" },
  { key: "month", label: "Mês" },
];

export default function Statistics() {
  const [selectedPeriod, setSelectedPeriod] =
    useState<StatisticsPeriod>("week");

  const { data: meetings = [], isLoading, error } = useEncontroWithFilters({});

  const kpis = useMemo(() => calculateKpis(meetings), [meetings]);

  const timeSeries = useMemo(
    () => buildTimeSeries(meetings, selectedPeriod),
    [meetings, selectedPeriod],
  );

  const subjectData = useMemo(() => groupBySubject(meetings), [meetings]);

  const monitorRanking = useMemo(
    () => buildMonitorRanking(meetings),
    [meetings],
  );

  const cancellationBySubject = useMemo(
    () => calculateCancellationBySubject(meetings),
    [meetings],
  );

  const completedPieData = useMemo(() => buildCompletedChartData(kpis), [kpis]);

  const completedPercentage = useMemo(
    () => calculateCompletedPercentage(kpis),
    [kpis],
  );

  if (isLoading) {
    return (
      <div className="w-full p-6">
        <p className="text-sm text-muted-foreground">
          Carregando estatísticas...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full p-6">
        <p className="text-sm text-destructive">
          Ocorreu um erro ao buscar os dados das estatísticas.
        </p>
      </div>
    );
  }

  return (
    <div className="w-full space-y-6 p-6">
      <header>
        <h1 className="text-2xl font-bold">Estatísticas</h1>

        <p className="text-muted-foreground">
          Visão geral dos encontros registrados na plataforma
        </p>
      </header>

      <section
        aria-label="Indicadores gerais"
        className="grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        <KpiCard
          icon={CalendarCheck2}
          label="Total de encontros"
          value={formatNumber(kpis.total)}
          iconColor={CHART_COLORS.primary}
        />

        <KpiCard
          icon={Trophy}
          label="Concluídos"
          value={formatNumber(kpis.completed)}
          iconColor={CHART_COLORS.highlight}
        />

        <KpiCard
          icon={ClockIcon}
          label="Agendados"
          value={formatNumber(kpis.scheduled)}
          iconColor={CHART_COLORS.secondary}
        />

        <KpiCard
          icon={XCircle}
          label="Cancelados"
          value={formatNumber(kpis.cancelled)}
          iconColor={CHART_COLORS.cancellation}
        />
      </section>

      <section
        aria-label="Gráficos e rankings"
        className="grid grid-cols-1 gap-4 lg:grid-cols-3"
      >
        <TimeSeriesChart
          data={timeSeries}
          selectedPeriod={selectedPeriod}
          periodOptions={PERIOD_OPTIONS}
          onPeriodChange={setSelectedPeriod}
        />

        <CompletedPieChart
          data={completedPieData}
          completedPercentage={completedPercentage}
          total={kpis.total}
        />

        <SubjectQuantityChart data={subjectData} />

        <MonitorRanking data={monitorRanking} />

        <CancellationChart data={cancellationBySubject} />
      </section>
    </div>
  );
}
