"use client";

import React from "react";
import { BarChart } from "@tremor/react";

const dataFormatter = (number: number) => Intl.NumberFormat("us").format(number).toString();

interface HistogramProps {
  chartAnalysisData: {
    query: string;
    prisma: number;
    drizzle: number;
    typeorm: number;
  }[];
}

const AnalysisBarChart: React.FC<HistogramProps> = ({ chartAnalysisData }) => {
  return (
    <div className="w-full">
      <div className="mt-6 w-full">
        <h3 className="text-lg font-semibold mb-4">Analysis</h3>
        <BarChart
          className="w-full"
          data={chartAnalysisData}
          index="query"
          categories={["prisma", "drizzle", "typeorm"]}
          colors={["blue", "teal", "amber"]}
          valueFormatter={dataFormatter}
          yAxisWidth={48}
        />
      </div>
    </div>
  );
};

export default AnalysisBarChart;

