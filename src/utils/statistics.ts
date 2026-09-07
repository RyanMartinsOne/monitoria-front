import { MATERIAS } from "@/types/materia";
import type { EncontroResponse } from "@/types/encontro";
import type {
  CancellationBySubject,
  MonitorRanking,
  PieChartData,
  StatisticsKpis,
  SubjectData,
} from "@/types/statistics";

export { buildTimeSeries } from "./period-buckets";

export const CHART_COLORS = {
  primary: "#0E7C86",
  highlight: "#D98E04",
  secondary: "#171A2D",
  cancellation: "#C2410C",
  softGrid: "#EEF2F1",
  inactiveBar: "#F1F5F9",
  rankingText: "#64748B",
  border: "var(--color-border)",
} as const;

const MEETING_STATUS = {
  concluido: "CONCLUIDO",
  agendado: "AGENDADO",
  cancelado: "CANCELADO",
} as const;

const SUBJECT_LABELS: Record<string, string> = Object.fromEntries(
  MATERIAS.map(({ value, label }) => [value, label]),
);

export function formatNumber(value: number) {
  return value.toLocaleString("pt-BR");
}

export function getSubjectLabel(subject: string) {
  return SUBJECT_LABELS[subject] ?? subject;
}

export function calculateKpis(meetings: EncontroResponse[]): StatisticsKpis {
  let completed = 0;
  let scheduled = 0;
  let cancelled = 0;

  for (const meeting of meetings) {
    if (meeting.status === MEETING_STATUS.concluido) {
      completed += 1;
    }

    if (meeting.status === MEETING_STATUS.agendado) {
      scheduled += 1;
    }

    if (meeting.status === MEETING_STATUS.cancelado) {
      cancelled += 1;
    }
  }

  const total = meetings.length;

  return {
    total,
    completed,
    scheduled,
    cancelled,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
  };
}

export function calculateCompletedPercentage(kpis: StatisticsKpis) {
  if (kpis.total === 0) {
    return 0;
  }

  return Math.round((kpis.completed / kpis.total) * 100);
}

export function groupBySubject(meetings: EncontroResponse[]): SubjectData[] {
  const quantityBySubject = new Map<string, number>();

  for (const meeting of meetings) {
    quantityBySubject.set(
      meeting.materia,
      (quantityBySubject.get(meeting.materia) ?? 0) + 1,
    );
  }

  return Array.from(quantityBySubject, ([subject, quantity]) => ({
    subject: getSubjectLabel(subject),
    quantity,
  })).sort((a, b) => b.quantity - a.quantity);
}

export function buildMonitorRanking(
  meetings: EncontroResponse[],
): MonitorRanking[] {
  const attendancesByMonitor = new Map<string, number>();

  for (const meeting of meetings) {
    if (meeting.status !== MEETING_STATUS.concluido) {
      continue;
    }

    const monitorName = meeting.monitor?.nome ?? "Sem monitor";

    attendancesByMonitor.set(
      monitorName,
      (attendancesByMonitor.get(monitorName) ?? 0) + 1,
    );
  }

  return Array.from(attendancesByMonitor, ([name, attendances]) => ({
    name,
    attendances,
  }))
    .sort((a, b) => b.attendances - a.attendances)
    .slice(0, 6);
}

export function calculateCancellationBySubject(
  meetings: EncontroResponse[],
): CancellationBySubject[] {
  const dataBySubject = new Map<
    string,
    {
      total: number;
      cancelled: number;
    }
  >();

  for (const meeting of meetings) {
    const currentData = dataBySubject.get(meeting.materia) ?? {
      total: 0,
      cancelled: 0,
    };

    currentData.total += 1;

    if (meeting.status === MEETING_STATUS.cancelado) {
      currentData.cancelled += 1;
    }

    dataBySubject.set(meeting.materia, currentData);
  }

  return Array.from(dataBySubject, ([subject, data]) => ({
    subject: getSubjectLabel(subject),
    total: data.total,
    cancelled: data.cancelled,
    rate:
      data.total >= 3 ? Math.round((data.cancelled / data.total) * 100) : 0,
  }))
    .filter(({ total }) => total >= 3)
    .sort((a, b) => b.rate - a.rate)
    .slice(0, 6);
}

export function buildCompletedChartData(kpis: StatisticsKpis): PieChartData[] {
  return [
    {
      name: "Concluídos",
      value: kpis.completed,
      color: CHART_COLORS.primary,
    },
    {
      name: "Não concluídos",
      value: kpis.total - kpis.completed,
      color: CHART_COLORS.softGrid,
    },
  ];
}