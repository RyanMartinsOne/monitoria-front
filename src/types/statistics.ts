export type StatisticsPeriod = "day" | "week" | "month";

export type PeriodOption = {
  key: StatisticsPeriod;
  label: string;
};

export type StatisticsKpis = {
  total: number;
  completed: number;
  scheduled: number;
  cancelled: number;
  completionRate: number;
};

export type TimeSeriesPoint = {
  key: string;
  label: string;
  quantity: number;
};

export type SubjectData = {
  subject: string;
  quantity: number;
};

export type MonitorRanking = {
  name: string;
  attendances: number;
};

export type CancellationBySubject = {
  subject: string;
  total: number;
  cancelled: number;
  rate: number;
};

export type PieSliceName = "Concluídos" | "Não concluídos";

export type PieChartData = {
  name: PieSliceName;
  value: number;
  color: string;
};
