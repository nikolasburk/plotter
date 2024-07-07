"use server";

import React from "react";
import Histogram from "../components/Histogram";
import { getChartData } from "../data";

const Home: React.FC<{ searchParams: { size: number } }> = async ({ searchParams }) => {
  const chartData = await getChartData(searchParams.size);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Histogram chartData={chartData} />
    </main>
  );
};

export default Home;
