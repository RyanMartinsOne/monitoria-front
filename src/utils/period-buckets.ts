import type { EncontroResponse } from "@/types/encontro";
import type { StatisticsPeriod, TimeSeriesPoint } from "@/types/statistics";

type PeriodConfig = {
  windowCount: number;
  getKey: (date: Date) => string;
  getLabel: (key: string) => string;
  subtractPeriod: (date: Date, amount: number) => Date;
};

function formatDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getStartOfWeek(date: Date) {
  const startOfWeek = new Date(date);
  const dayOfWeek = (startOfWeek.getDay() + 6) % 7;

  startOfWeek.setDate(startOfWeek.getDate() - dayOfWeek);

  return startOfWeek;
}

function getDayKey(date: Date) {
  return formatDateKey(date);
}

function getWeekKey(date: Date) {
  return formatDateKey(getStartOfWeek(date));
}

function getMonthKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");

  return `${year}-${month}`;
}

function getDayLabel(key: string) {
  const [, month, day] = key.split("-");

  return `${day}/${month}`;
}

function getWeekLabel(key: string) {
  const [, month, day] = key.split("-");

  return `sem. ${day}/${month}`;
}

function getMonthLabel(key: string) {
  const [year, month] = key.split("-");

  return new Date(Number(year), Number(month) - 1, 1)
    .toLocaleDateString("pt-BR", {
      month: "short",
    })
    .replace(".", "");
}

const PERIOD_CONFIGS: Record<StatisticsPeriod, PeriodConfig> = {
  day: {
    windowCount: 21,
    getKey: getDayKey,
    getLabel: getDayLabel,
    subtractPeriod: (date, amount) =>
      new Date(date.getFullYear(), date.getMonth(), date.getDate() - amount),
  },

  week: {
    windowCount: 10,
    getKey: getWeekKey,
    getLabel: getWeekLabel,
    subtractPeriod: (date, amount) =>
      new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() - amount * 7,
      ),
  },

  month: {
    windowCount: 6,
    getKey: getMonthKey,
    getLabel: getMonthLabel,
    subtractPeriod: (date, amount) =>
      new Date(date.getFullYear(), date.getMonth() - amount, 1),
  },
};

export function buildTimeSeries(
  meetings: EncontroResponse[],
  period: StatisticsPeriod,
): TimeSeriesPoint[] {
  const now = new Date();
  const config = PERIOD_CONFIGS[period];
  const quantityByPeriod = new Map<string, number>();

  for (const meeting of meetings) {
    const meetingDate = new Date(meeting.dataHora);

    const wasCompleted = meetingDate <= now && meeting.status === "CONCLUIDO";

    if (!wasCompleted) {
      continue;
    }

    const key = config.getKey(meetingDate);

    quantityByPeriod.set(key, (quantityByPeriod.get(key) ?? 0) + 1);
  }

  return Array.from({ length: config.windowCount }, (_, index) => {
    const periodsAgo = config.windowCount - 1 - index;

    const date = config.subtractPeriod(now, periodsAgo);

    const key = config.getKey(date);

    return {
      key,
      label: config.getLabel(key),
      quantity: quantityByPeriod.get(key) ?? 0,
    };
  });
}
