import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sidebar } from "@/components/layout/sidebar";
import { Button } from "@/components/ui/button";
import { Download, FileText, TrendingDown, AlertCircle } from "lucide-react";
import { generateReport, generateForecast, historicalData, type ScenarioType } from "@/lib/data";

export default function Reports() {
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>("Aggressive");
  const [reportData, setReportData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Generate forecast and report
    const scenario = selectedScenario as ScenarioType;
    const forecast = generateForecast(scenario);
    const lastHistorical = historicalData[historicalData.length - 1];
    const finalForecast = forecast[forecast.length - 1];
    const totalEmissionsCurrent = lastHistorical.scope1 + lastHistorical.scope2 + lastHistorical.scope3;
    const totalEmissionsFinal = finalForecast.scope1 + finalForecast.scope2 + finalForecast.scope3;
    const percentChange = ((totalEmissionsFinal - totalEmissionsCurrent) / totalEmissionsCurrent) * 100;

    // Create structured report data
    const report = {
      scenario: selectedScenario,
      executiveSummary: getExecutiveSummary(selectedScenario, totalEmissionsFinal, percentChange),
      metrics: {
        currentEmissions: totalEmissionsCurrent.toFixed(1),
        projectedEmissions: totalEmissionsFinal.toFixed(1),
        percentChange: percentChange.toFixed(1),
        scope1Current: lastHistorical.scope1,
        scope1Projected: finalForecast.scope1.toFixed(1),
        scope2Current: lastHistorical.scope2,
        scope2Projected: finalForecast.scope2.toFixed(1),
        scope3Current: lastHistorical.scope3,
        scope3Projected: finalForecast.scope3.toFixed(1),
      },
      detailedAnalysis: getDetailedAnalysis(selectedScenario),
      recommendations: getRecommendations(selectedScenario),
      risks: getRisks(selectedScenario),
    };

    setReportData(report);
    setIsLoading(false);
  }, [selectedScenario]);

  const handleDownloadPDF = () => {
    alert("PDF download feature coming soon. Report content is above.");
  };

  const handleDownloadCSV = () => {
    alert("CSV export feature coming soon. Report content is above.");
  };

  // Helper functions for report content
  const getExecutiveSummary = (scenario: ScenarioType, emissions: number, percentChange: number) => {
    const scenarios: Record<string, string> = {
      BAU: `Under the Business-as-Usual (BAU) scenario, emissions are projected to continue rising, tracking production growth. By 2055, total emissions are expected to reach ${emissions.toFixed(1)} MT, a ${percentChange.toFixed(1)}% increase from current levels. This trajectory is non-compliant with Paris Agreement goals and exposes the company to significant carbon tax liability.`,
      Moderate: `The Moderate Decarbonization scenario assumes incremental efficiency improvements and grid greening. Total emissions stabilize and begin a slow decline, reaching ${emissions.toFixed(1)} MT by 2055 (${percentChange.toFixed(1)}% change). While this mitigates some regulatory risk, it fails to achieve Net Zero.`,
      Aggressive: `The Aggressive / Net-Zero Aligned scenario implements deep structural changes including hydrogen-based reduction, 100% renewable electricity, and circular supply chains. This forecasts a rapid decoupling of growth and emissions, with total emissions dropping to ${emissions.toFixed(1)} MT by 2055 (${percentChange.toFixed(1)}% reduction), aligning with a 1.5°C pathway.`,
    };
    return scenarios[scenario] || "";
  };

  const getDetailedAnalysis = (scenario: ScenarioType) => {
    const analyses: Record<string, any[]> = {
      BAU: [
        {
          title: "Baseline Analysis",
          content: "Production growth (3%/year) drives emissions growth. Without intervention, Scope 1 emissions grow ~1.5%/year, Scope 2 ~1%/year due to natural grid improvement, and Scope 3 tracks production at ~2%/year.",
        },
        {
          title: "Regulatory & Market Risks",
          content: "Carbon taxes (estimated $15-30/ton by 2035) create $500M-$2B cumulative liability. ESG downgrade limits access to capital. Supply chain pressure as customers demand decarbonization.",
        },
        {
          title: "Recommendation",
          content: "Not sustainable long-term. Business will face increasing regulatory and financial pressure. Transition planning needed within 5 years.",
        },
      ],
      Moderate: [
        {
          title: "Efficiency Improvements",
          content: "Active efficiency projects reduce Scope 1 by ~1%/year. Grid greening reduces Scope 2 by ~2%/year. Supplier engagement reduces Scope 3 by ~0.5%/year.",
        },
        {
          title: "Capital Requirements",
          content: "Estimated $150M capex over 10 years ($15M/year average). Renewable PPAs (500 MW) cost $60-90M. Efficiency retrofits cost $50-80M. Payback period ~7 years through energy savings.",
        },
        {
          title: "Strategy Assessment",
          content: "Achieves regulatory compliance but insufficient for ESG leadership. Competitors pursuing aggressive pathways will have competitive advantage. Mid-tier strategy.",
        },
      ],
      Aggressive: [
        {
          title: "Transformation Investment",
          content: "Hydrogen-based reduction in blast furnaces ($150-200M), 100% renewable electricity via PPAs ($150-200M), and circular supply chain initiatives ($50-75M). Total ~$500-700M over 15 years.",
        },
        {
          title: "Technology Roadmap",
          content: "Phase 1 (Years 1-2): Renewable PPAs, hydrogen pilot projects. Phase 2 (Years 3-8): Blast furnace retrofit, operational scaling. Phase 3 (Years 9-15): Optimization, circular economy.",
        },
        {
          title: "Value Creation",
          content: "Avoid carbon taxes ($500M-$2B), ESG valuation premium ($500M-$1B), energy savings ($750M+), supply chain advantage. Net benefit $750M-$1.2B with positive ROI by Year 8.",
        },
      ],
    };
    return analyses[scenario] || [];
  };

  const getRecommendations = (scenario: ScenarioType) => {
    const recs: Record<string, any[]> = {
      BAU: [
        {
          title: "Not Recommended",
          description: "This pathway is not recommended due to regulatory and financial exposure.",
          investment: "$0",
          timeline: "N/A",
        },
      ],
      Moderate: [
        {
          title: "Renewable Energy Procurement",
          description: "Procure 30% renewable electricity via Power Purchase Agreements (PPAs) to reduce Scope 2 emissions.",
          investment: "$60-90M",
          timeline: "Years 1-3",
        },
        {
          title: "Energy Efficiency Projects",
          description: "Implement efficiency retrofits in facilities, including LED upgrades, HVAC optimization, and waste heat recovery.",
          investment: "$50-80M",
          timeline: "Years 1-5",
        },
        {
          title: "Supply Chain Engagement",
          description: "Launch supplier engagement program to set emission reduction targets and monitor progress.",
          investment: "$20-30M",
          timeline: "Years 1+",
        },
      ],
      Aggressive: [
        {
          title: "Hydrogen Infrastructure Development",
          description: "Convert blast furnaces to hydrogen-based reduction. Includes infrastructure for hydrogen production, storage, and integration.",
          investment: "$150-200M",
          timeline: "Years 2-8",
        },
        {
          title: "100% Renewable Electricity",
          description: "Secure 2000 MW renewable energy via PPAs covering 100% of facility electricity needs by Year 8.",
          investment: "$150-200M",
          timeline: "Years 1-8",
        },
        {
          title: "Circular Supply Chain Transformation",
          description: "Develop circular economy initiatives with suppliers, focusing on material reuse, recycling, and low-carbon sourcing.",
          investment: "$50-75M",
          timeline: "Years 5-15",
        },
        {
          title: "Carbon Capture & Utilization (CCUS)",
          description: "Implement CCUS technology to capture process emissions from steel making for storage or utilization.",
          investment: "$100-150M",
          timeline: "Years 8-15",
        },
      ],
    };
    return recs[scenario] || [];
  };

  const getRisks = (scenario: ScenarioType) => {
    const risks: Record<string, string> = {
      BAU: "High regulatory risk. Potential carbon taxes ($500M-$2B). ESG downgrade (-10-15% valuation). Supply chain pressure. Long-term business viability at risk.",
      Moderate: "Technology risk: Renewable costs may not decrease as expected. Policy risk: Carbon prices may be higher than projected. Competitive risk: Aggressive competitors gain market advantage.",
      Aggressive: "Execution risk: Hydrogen infrastructure unproven at scale. Technology risk: Hydrogen costs may remain high. Market risk: Future renewable prices uncertain. Phased approach with pilot projects recommended.",
    };
    return risks[scenario] || "";
  };

  if (isLoading || !reportData) {
    return (
      <div className="min-h-screen bg-background">
        <Sidebar />
        <div className="ml-64 flex flex-col min-h-screen">
          <div className="flex-1 p-8">
            <div className="animate-pulse space-y-4">
              <div className="h-10 bg-muted rounded w-1/3"></div>
              <div className="h-64 bg-muted rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      <div className="ml-64 flex flex-col min-h-screen">
        <div className="flex-1 p-8 space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold tracking-tight mb-2" data-testid="heading-reports">
              Emissions Reports
            </h1>
            <p className="text-muted-foreground">
              Detailed analysis and strategic recommendations for decarbonization pathways
            </p>
          </div>

          {/* Scenario Selector */}
          <Card className="border-sidebar-border">
            <CardHeader>
              <CardTitle className="text-lg">Select Report Scenario</CardTitle>
              <CardDescription>Choose a decarbonization pathway to view detailed analysis</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex gap-3">
                {[
                  { id: "BAU", label: "Business As Usual", color: "bg-red-500/10 border-red-500/20" },
                  { id: "Moderate", label: "Moderate", color: "bg-yellow-500/10 border-yellow-500/20" },
                  { id: "Aggressive", label: "Aggressive / Net Zero", color: "bg-green-500/10 border-green-500/20" },
                ].map((scenario) => (
                  <button
                    key={scenario.id}
                    onClick={() => {
                      setSelectedScenario(scenario.id as ScenarioType);
                      setIsLoading(true);
                    }}
                    className={`px-4 py-2 rounded-lg border-2 font-medium text-sm transition-all ${
                      selectedScenario === scenario.id
                        ? `${scenario.color} border-current`
                        : "bg-muted border-muted-foreground/20 text-muted-foreground hover:bg-muted/80"
                    }`}
                    data-testid={`button-scenario-${scenario.id.toLowerCase()}`}
                  >
                    {scenario.label}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Report Tabs */}
          <Tabs defaultValue="executive" className="space-y-6">
            <TabsList className="grid w-full max-w-2xl grid-cols-4">
              <TabsTrigger value="executive">Executive Summary</TabsTrigger>
              <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
              <TabsTrigger value="detailed">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            {/* Executive Summary */}
            <TabsContent value="executive" className="space-y-4">
              <Card className="border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Executive Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-foreground/90 leading-relaxed" data-testid="text-executive-summary">
                      {reportData.executiveSummary}
                    </p>
                  </div>
                  <div className="bg-muted/50 border border-muted-foreground/20 rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">
                      <strong>Report Generated:</strong> {new Date().toLocaleDateString()} | 
                      <strong className="ml-2">Scenario:</strong> {reportData.scenario}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Key Metrics */}
            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="border-sidebar-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Current Emissions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary" data-testid="metric-current-emissions">
                      {reportData.metrics.currentEmissions}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">MT CO2e (FY2024-25)</p>
                  </CardContent>
                </Card>

                <Card className="border-sidebar-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Projected Emissions 2055</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold text-primary" data-testid="metric-projected-emissions">
                      {reportData.metrics.projectedEmissions}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">MT CO2e</p>
                  </CardContent>
                </Card>

                <Card className="border-sidebar-border">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Change</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-3xl font-bold flex items-center gap-2 ${
                      reportData.metrics.percentChange < 0 ? "text-green-400" : "text-red-400"
                    }`} data-testid="metric-percent-change">
                      {reportData.metrics.percentChange > 0 ? "+" : ""}{reportData.metrics.percentChange}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">By 2055</p>
                  </CardContent>
                </Card>
              </div>

              <Card className="border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-lg">Scope Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {[
                    { name: "Scope 1", current: reportData.metrics.scope1Current, projected: reportData.metrics.scope1Projected, color: "bg-orange-500" },
                    { name: "Scope 2", current: reportData.metrics.scope2Current, projected: reportData.metrics.scope2Projected, color: "bg-cyan-500" },
                    { name: "Scope 3", current: reportData.metrics.scope3Current, projected: reportData.metrics.scope3Projected, color: "bg-blue-500" },
                  ].map((scope) => (
                    <div key={scope.name} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium" data-testid={`text-${scope.name.toLowerCase()}`}>{scope.name}</span>
                        <span className="text-muted-foreground">{scope.current} → {scope.projected} MT</span>
                      </div>
                      <div className="flex gap-2 h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`${scope.color}/30 rounded-full`} style={{width: `${(scope.current / 70) * 100}%`}}></div>
                        <div className={`${scope.color} rounded-full`} style={{width: `${(scope.projected / 70) * 100}%`}}></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Detailed Analysis */}
            <TabsContent value="detailed" className="space-y-4">
              <Card className="border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-lg">Detailed Analysis</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {reportData.detailedAnalysis.map((section: any, idx: number) => (
                    <div key={idx} className="space-y-2">
                      <h3 className="font-semibold text-foreground flex items-center gap-2" data-testid={`heading-analysis-${idx}`}>
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                          {idx + 1}
                        </div>
                        {section.title}
                      </h3>
                      <p className="text-foreground/80 leading-relaxed" data-testid={`text-analysis-${idx}`}>
                        {section.content}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Recommendations */}
            <TabsContent value="recommendations" className="space-y-4">
              <Card className="border-sidebar-border">
                <CardHeader>
                  <CardTitle className="text-lg">Strategic Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {reportData.recommendations.map((rec: any, idx: number) => (
                    <div key={idx} className="border-l-4 border-primary/50 bg-primary/5 rounded-r-lg p-4">
                      <h4 className="font-semibold text-foreground flex items-center gap-2 mb-2" data-testid={`heading-rec-${idx}`}>
                        <TrendingDown className="w-4 h-4 text-primary" />
                        {rec.title}
                      </h4>
                      <p className="text-foreground/80 text-sm mb-2" data-testid={`text-rec-${idx}`}>
                        {rec.description}
                      </p>
                      <p className="text-xs text-muted-foreground font-medium">
                        💰 Investment: {rec.investment} | ⏱️ Timeline: {rec.timeline}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-sidebar-border bg-yellow-500/5 border-yellow-500/20">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2 text-yellow-600 dark:text-yellow-400">
                    <AlertCircle className="w-5 h-5" />
                    Implementation Risks
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-foreground/80" data-testid="text-risks">
                  {reportData.risks}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Download Actions */}
          <Card className="border-sidebar-border bg-muted/30">
            <CardHeader>
              <CardTitle className="text-lg">Export Report</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-3">
              <Button 
                onClick={handleDownloadPDF}
                className="gap-2"
                variant="default"
                data-testid="button-download-pdf"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </Button>
              <Button 
                onClick={handleDownloadCSV}
                className="gap-2"
                variant="outline"
                data-testid="button-download-csv"
              >
                <Download className="w-4 h-4" />
                Export CSV
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
