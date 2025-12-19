import { useState, useMemo } from "react";
import { Shell } from "@/components/layout/shell";
import { EmissionsChart } from "@/components/dashboard/emissions-chart";
import { OverviewMetrics } from "@/components/dashboard/overview-metrics";
import { ReportView } from "@/components/dashboard/report-view";
import { historicalData, generateForecast, ScenarioType } from "@/lib/data";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { RefreshCw, CalendarRange } from "lucide-react";
import generatedImage from '@assets/generated_images/industrial_factory_at_sunset_with_clean_energy_visualizations.png';

export default function Dashboard() {
  const [scenario, setScenario] = useState<ScenarioType>("Moderate");
  
  // Memoize forecast generation so it doesn't re-run on every render unless scenario changes
  const forecastData = useMemo(() => generateForecast(scenario), [scenario]);
  
  const lastHistorical = historicalData[historicalData.length - 1];
  const prevHistorical = historicalData[historicalData.length - 2];

  return (
    <Shell>
      {/* Hero Header */}
      <div className="relative w-full h-48 bg-sidebar-primary overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent z-10" />
        <img 
          src={generatedImage} 
          alt="Industrial Header" 
          className="absolute right-0 top-0 h-full w-2/3 object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700"
        />
        <div className="relative z-20 h-full flex flex-col justify-center px-8 max-w-4xl">
          <h1 className="text-3xl font-bold tracking-tight mb-2">Emissions Forecasting Model v2.1</h1>
          <p className="text-muted-foreground max-w-xl">
            Predictive analytics for Scope 1, 2, and 3 emissions based on production variables, 
            market growth, and decarbonization strategies.
          </p>
        </div>
      </div>

      <div className="p-8 space-y-8 max-w-[1600px] mx-auto -mt-8 relative z-30">
        <OverviewMetrics currentData={lastHistorical} previousData={prevHistorical} />

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Main Chart Column */}
          <div className="flex-1 space-y-6">
            <div className="flex items-center justify-between bg-card p-4 rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-4">
                <div className="p-2 bg-primary/10 rounded-md text-primary">
                  <CalendarRange className="w-5 h-5" />
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground block mb-1">Select Scenario</label>
                  <Select value={scenario} onValueChange={(v) => setScenario(v as ScenarioType)}>
                    <SelectTrigger className="w-[240px] h-9">
                      <SelectValue placeholder="Select Scenario" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BAU">Business As Usual (BAU)</SelectItem>
                      <SelectItem value="Moderate">Moderate Transition</SelectItem>
                      <SelectItem value="Aggressive">Net Zero / Aggressive</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground" onClick={() => window.location.reload()}>
                <RefreshCw className="w-4 h-4" />
                Reset Model
              </Button>
            </div>

            <EmissionsChart data={forecastData} scenario={scenario} />
          </div>

          {/* Sidebar Report Column */}
          <div className="w-full lg:w-[400px]">
            <ReportView scenario={scenario} data={forecastData} />
          </div>
        </div>
      </div>
    </Shell>
  );
}
