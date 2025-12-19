import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, ArrowDownRight, Activity, Zap, Factory } from "lucide-react";
import { AnnualData } from "@/lib/data";

interface MetricsProps {
  currentData: AnnualData;
  previousData: AnnualData;
}

export function OverviewMetrics({ currentData, previousData }: MetricsProps) {
  const totalCurrent = currentData.scope1 + currentData.scope2 + currentData.scope3;
  const totalPrev = previousData.scope1 + previousData.scope2 + previousData.scope3;
  const change = ((totalCurrent - totalPrev) / totalPrev) * 100;
  
  const intensityCurrent = totalCurrent / currentData.production;
  const intensityPrev = totalPrev / previousData.production;
  const intensityChange = ((intensityCurrent - intensityPrev) / intensityPrev) * 100;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card className="border-l-4 border-l-chart-1 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Total Emissions (FY25)</p>
            <Factory className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-3">
            <div className="text-2xl font-bold">{totalCurrent.toFixed(1)} MT</div>
            <div className={`text-xs font-medium flex items-center ${change > 0 ? 'text-destructive' : 'text-green-500'}`}>
              {change > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(change).toFixed(1)}% YoY
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-2">Scope 1 is the primary driver (68%)</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-2 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Emission Intensity</p>
            <Zap className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-3">
            <div className="text-2xl font-bold">{intensityCurrent.toFixed(2)} <span className="text-sm font-normal text-muted-foreground">tCO2e/t</span></div>
            <div className={`text-xs font-medium flex items-center ${intensityChange > 0 ? 'text-destructive' : 'text-green-500'}`}>
               {intensityChange > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
              {Math.abs(intensityChange).toFixed(1)}% YoY
            </div>
          </div>
           <p className="text-xs text-muted-foreground mt-2">Per tonne of physical output</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-chart-3 shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-0 pb-2">
            <p className="text-sm font-medium text-muted-foreground">Forecast Accuracy</p>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex items-baseline space-x-3">
            <div className="text-2xl font-bold">94.2%</div>
            <div className="text-xs font-medium text-green-500 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2.1%
            </div>
          </div>
           <p className="text-xs text-muted-foreground mt-2">Against actuals (Trailing 12M)</p>
        </CardContent>
      </Card>
    </div>
  );
}
