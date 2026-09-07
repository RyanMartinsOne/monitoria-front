import type { ElementType } from "react";

import { Card, CardContent } from "@/components/ui/card";

type KpiCardProps = {
  icon: ElementType;
  label: string;
  value: string;
  iconColor: string;
};

export function KpiCard({ icon: Icon, label, value, iconColor }: KpiCardProps) {
  return (
    <Card size="sm" className="flex-row items-center gap-3">
      <CardContent className="flex w-full items-center gap-3 px-4">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
          style={{
            backgroundColor: `${iconColor}1A`,
          }}
        >
          <Icon size={20} color={iconColor} />
        </div>

        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-semibold tabular-nums">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}
