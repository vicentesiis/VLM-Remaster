
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui";

export function KPICard({ title, value, subtitle, icon: Icon }) {
  return (
    <Card className="shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-xs font-medium text-muted-foreground">{title}</CardTitle>
        {Icon ? <Icon className="h-4 w-4" /> : null}
      </CardHeader>
      <CardContent>
        <div className="text-xl lg:text-2xl font-semibold leading-none">{value}</div>
        {subtitle ? (
          <p className="mt-1 text-[11px] text-muted-foreground">{subtitle}</p>
        ) : null}
      </CardContent>
    </Card>
  );
}