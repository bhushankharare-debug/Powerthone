import { LucideIcon } from "lucide-react";
import { fetchForecast, fetchHistoricalData, type EmissionData } from "./api";

// Types
export interface AnnualData {
  year: string;
  scope1: number;
  scope2: number;
  scope3: number;
  production: number; // Million Tonnes
  revenue: number; // Cr INR
  isHistorical: boolean;
}

export type ScenarioType = "BAU" | "Moderate" | "Aggressive";

// Re-export for compatibility
export type { EmissionData } from "./api";

// Historical Data from the provided text
export const historicalData: AnnualData[] = [
  { year: "2020-21", scope1: 33, scope2: 4, scope3: 5, production: 12.19, revenue: 156294, isHistorical: true },
  { year: "2021-22", scope1: 49, scope2: 5, scope3: 6, production: 18.38, revenue: 243959, isHistorical: true },
  { year: "2022-23", scope1: 50, scope2: 6, scope3: 7, production: 18.97, revenue: 243353, isHistorical: true },
  { year: "2023-24", scope1: 59, scope2: 5, scope3: 22, production: 20.12, revenue: 140987, isHistorical: true },
  { year: "2024-25", scope1: 61, scope2: 5, scope3: 23, production: 20.72, revenue: 218543, isHistorical: true },
];

// Forecasting Logic - Now uses backend API
export async function generateForecastFromAPI(scenario: ScenarioType): Promise<AnnualData[]> {
  try {
    const response = await fetchForecast(scenario);
    const historical = await fetchHistoricalData();
    return [...historical, ...response.data];
  } catch (error) {
    console.error("Failed to fetch from API, using fallback:", error);
    return generateForecast(scenario);
  }
}

// Legacy function for fallback
export function generateForecast(scenario: ScenarioType): AnnualData[] {
  const lastYear = historicalData[historicalData.length - 1];
  let currentScope1 = lastYear.scope1;
  let currentScope2 = lastYear.scope2;
  let currentScope3 = lastYear.scope3;
  let currentProduction = lastYear.production;
  let currentRevenue = lastYear.revenue;
  
  const forecast: AnnualData[] = [...historicalData];
  const startYear = 2025;
  const horizon = 30; // 30 year forecast

  for (let i = 1; i <= horizon; i++) {
    const yearLabel = `${startYear + i - 1}-${(startYear + i).toString().slice(2)}`;
    
    // Production Growth Assumptions (same for all scenarios generally, unless decoupled)
    const productionGrowth = 0.02; // 2% annual growth
    currentProduction *= (1 + productionGrowth);
    currentRevenue *= (1 + productionGrowth); // Assuming revenue tracks production roughly

    // Emission Drivers based on Scenario
    let s1Change = 0;
    let s2Change = 0;
    let s3Change = 0;

    switch (scenario) {
      case "BAU":
        s1Change = 0.015; // +1.5%
        s2Change = 0.01;  // +1.0%
        s3Change = 0.02;  // +2.0%
        break;
      case "Moderate":
        s1Change = -0.01; // -1.0%
        s2Change = -0.02; // -2.0%
        s3Change = -0.005; // -0.5%
        break;
      case "Aggressive":
        s1Change = -0.08; // -8%
        s2Change = -0.15; // -15%
        s3Change = -0.05; // -5%
        break;
    }

    // Apply change with some randomness for "simulation" feel
    const noise = (Math.random() - 0.5) * 0.01;
    
    currentScope1 *= (1 + s1Change + noise);
    currentScope2 *= (1 + s2Change + noise);
    currentScope3 *= (1 + s3Change + noise);

    // Floor at 0
    currentScope1 = Math.max(0, currentScope1);
    currentScope2 = Math.max(0, currentScope2);
    currentScope3 = Math.max(0, currentScope3);

    forecast.push({
      year: yearLabel,
      scope1: parseFloat(currentScope1.toFixed(2)),
      scope2: parseFloat(currentScope2.toFixed(2)),
      scope3: parseFloat(currentScope3.toFixed(2)),
      production: parseFloat(currentProduction.toFixed(2)),
      revenue: parseFloat(currentRevenue.toFixed(2)),
      isHistorical: false,
    });
  }

  return forecast;
}

export function generateReport(scenario: ScenarioType, data: AnnualData[]) {
  const lastHistorical = historicalData[historicalData.length - 1];
  const finalForecast = data[data.length - 1];
  const totalEmissionsCurrent = lastHistorical.scope1 + lastHistorical.scope2 + lastHistorical.scope3;
  const totalEmissionsFinal = finalForecast.scope1 + finalForecast.scope2 + finalForecast.scope3;
  const percentChange = ((totalEmissionsFinal - totalEmissionsCurrent) / totalEmissionsCurrent) * 100;

  const baselineText = `
    Based on the historical data from FY2020-21 to FY2024-25, the facility has seen a significant increase in Scope 1 emissions (from 33MT to 61MT), driven largely by production capacity expansion (12.19MT to 20.72MT). Scope 3 emissions saw a sharp recalculation/increase in FY23-24 (22MT), likely due to improved reporting boundaries or upstream activity.
  `;

  let scenarioText = "";
  if (scenario === "BAU") {
    scenarioText = `
      Under the Business-as-Usual (BAU) scenario, emissions are projected to continue rising, tracking production growth. By 2055, total emissions are expected to reach ${totalEmissionsFinal.toFixed(1)} MT, a ${percentChange.toFixed(1)}% increase from current levels. This trajectory is non-compliant with Paris Agreement goals and exposes the company to significant carbon tax liability.
    `;
  } else if (scenario === "Moderate") {
    scenarioText = `
      The Moderate Decarbonization scenario assumes incremental efficiency improvements and grid greening. Total emissions stabilize and begin a slow decline, reaching ${totalEmissionsFinal.toFixed(1)} MT by 2055 (${percentChange.toFixed(1)}% change). While this mitigates some regulatory risk, it fails to achieve Net Zero.
    `;
  } else {
    scenarioText = `
      The Aggressive / Net-Zero Aligned scenario implements deep structural changes including hydrogen-based reduction, 100% renewable electricity, and circular supply chains. This forecasts a rapid decoupling of growth and emissions, with total emissions dropping to ${totalEmissionsFinal.toFixed(1)} MT by 2055 (${percentChange.toFixed(1)}% reduction), aligning with a 1.5°C pathway.
    `;
  }

  return {
    title: `Emissions Forecast Report: ${scenario} Scenario`,
    summary: baselineText + scenarioText,
    keyMetrics: [
      { label: "Current Emissions (FY25)", value: `${totalEmissionsCurrent.toFixed(1)} MT` },
      { label: "Projected Emissions (FY55)", value: `${totalEmissionsFinal.toFixed(1)} MT` },
      { label: "Total Change", value: `${percentChange > 0 ? '+' : ''}${percentChange.toFixed(1)}%` }
    ]
  };
}
