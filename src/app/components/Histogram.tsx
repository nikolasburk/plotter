"use client"

import React from "react";
import { BarChart } from "@tremor/react";

const dataFormatter = (number: number) => Intl.NumberFormat("us").format(number).toString();

interface HistogramProps {
  chartData: {
    [key: string]: {
      benchmarkRunIndex: number;
      prisma: number;
      drizzle: number;
      typeorm: number;
    }[];
  };
}

const Histogram: React.FC<HistogramProps> = ({ chartData }) => {
  return (
    <div className="w-full">
      {Object.keys(chartData).map((query, i) => (
        <div key={i} className="mt-6 w-full">
          <h3 className="text-lg font-semibold mb-4">{query}</h3>
          <BarChart
            title={query}
            className="w-full"
            data={chartData[query]}
            index="benchmarkRunIndex"
            categories={["prisma", "drizzle", "typeorm"]}
            colors={["blue", "teal", "amber"]}
            valueFormatter={dataFormatter}
            yAxisWidth={48}
          />
        </div>
      ))}
    </div>
  );
};

export default Histogram;
