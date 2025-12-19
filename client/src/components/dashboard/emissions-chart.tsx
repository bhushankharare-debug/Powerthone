"use client"

import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from "recharts";
import { AnnualData, ScenarioType } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

interface EmissionsChartProps {
  data: AnnualData[];
  scenario: ScenarioType;
}

export function EmissionsChart({ data, scenario }: EmissionsChartProps) {
  const currentYearIndex = data.findIndex(d => !d.isHistorical);
  const currentYearLabel = data[currentYearIndex]?.year;

  return (
    <Card className="w-full h-[500px] flex flex-col border-border/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-medium">Emissions Trajectory: {scenario}</CardTitle>
          <CardDescription>Historical Data vs. AI Forecast (Scope 1, 2, & 3)</CardDescription>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="font-mono text-xs">Model: XGBoost-Hybrid</Badge>
          <Badge variant="secondary" className="font-mono text-xs">Confidence: 89%</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="colorS1" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorS2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorS3" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(var(--chart-3))" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="hsl(var(--chart-3))" stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="year" 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              interval={4}
            />
            <YAxis 
              stroke="hsl(var(--muted-foreground))" 
              fontSize={12} 
              tickLine={false} 
              axisLine={false}
              tickFormatter={(value) => `${value}MT`}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'hsl(var(--popover))', 
                borderColor: 'hsl(var(--border))',
                borderRadius: '8px',
                fontSize: '12px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
              }}
              labelStyle={{ color: 'hsl(var(--foreground))', fontWeight: 600, marginBottom: '4px' }}
            />
            <Legend wrapperStyle={{ paddingTop: '20px' }}/>
            
            <ReferenceLine x={currentYearLabel} stroke="hsl(var(--foreground))" strokeDasharray="3 3" label={{ position: 'top', value: 'Forecast Start', fill: 'hsl(var(--foreground))', fontSize: 10 }} />

            <Area 
              type="monotone" 
              dataKey="scope1" 
              name="Scope 1 (Direct)" 
              stroke="hsl(var(--chart-1))" 
              fillOpacity={1} 
              fill="url(#colorS1)" 
              stackId="1"
            />
            <Area 
              type="monotone" 
              dataKey="scope2" 
              name="Scope 2 (Energy)" 
              stroke="hsl(var(--chart-2))" 
              fillOpacity={1} 
              fill="url(#colorS2)" 
              stackId="1"
            />
            <Area 
              type="monotone" 
              dataKey="scope3" 
              name="Scope 3 (Supply Chain)" 
              stroke="hsl(var(--chart-3))" 
              fillOpacity={1} 
              fill="url(#colorS3)" 
              stackId="1"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
