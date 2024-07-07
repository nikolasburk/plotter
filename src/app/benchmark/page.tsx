"use server";

import React from "react";
import Histogram from "../components/Histogram";
import { getChartData } from "../data";
import { getAnalysisData } from "../data";
import AnalysisBarChart from '../components/AnalysisBarChart'

const Home: React.FC<{ searchParams: { size: number } }> = async ({ searchParams }) => {
  console.log(`get chart data for: `, searchParams.size)
  const chartData = await getChartData(searchParams.size);
  const analysisData = await getAnalysisData(searchParams.size);

  // console.log(chartData)
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AnalysisBarChart chartAnalysisData={analysisData} />
      <Histogram chartData={chartData} />
    </main>
  );
};

export default Home;
