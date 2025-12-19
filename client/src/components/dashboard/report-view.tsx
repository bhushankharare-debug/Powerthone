import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { generateReport, ScenarioType, AnnualData } from "@/lib/data";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ReportViewProps {
  scenario: ScenarioType;
  data: AnnualData[];
}

export function ReportView({ scenario, data }: ReportViewProps) {
  const report = generateReport(scenario, data);

  return (
    <Card className="h-full border-border/50 shadow-sm flex flex-col">
      <CardHeader className="border-b border-border/50 bg-muted/20">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-medium">AI Generated Insights</CardTitle>
          <Button variant="outline" size="sm" className="h-8 gap-2">
            <Download className="w-3 h-3" />
            Export PDF
          </Button>
        </div>
      </CardHeader>
      <ScrollArea className="flex-1">
        <CardContent className="p-6 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Executive Summary</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              {report.summary}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-border/50 bg-muted/10 -mx-6 px-6">
            {report.keyMetrics.map((metric, i) => (
              <div key={i}>
                <p className="text-xs text-muted-foreground font-medium">{metric.label}</p>
                <p className="text-lg font-bold font-mono text-foreground mt-1">{metric.value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-primary uppercase tracking-wider">Strategic Recommendations</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span className="text-chart-1 font-bold">•</span>
                <span>Prioritize Scope 1 reduction via fuel switching to natural gas/hydrogen in blast furnaces.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-chart-2 font-bold">•</span>
                <span>Accelerate renewable energy procurement (PPA) to mitigate Scope 2 risks as grid prices fluctuate.</span>
              </li>
              <li className="flex gap-2">
                <span className="text-chart-3 font-bold">•</span>
                <span>Engage top 20 suppliers for Scope 3 data accuracy improvements and carbon reduction targets.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
