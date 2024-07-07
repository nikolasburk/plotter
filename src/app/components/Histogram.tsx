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


// import React, { Component } from "react";
// import { BarChart } from "@tremor/react";

// const dataFormatter = (number: number) => Intl.NumberFormat("us").format(number).toString();

// // class Histogram extends Component<BenchmarkRunForQuery[]> {
// class Histogram extends Component<any> {
//   async componentDidMount() {
//     console.log(`render histogram, props: `, this.props);
//   }

//   render() {
//     const { chartData } = this.props;
//     return (
//       <div className="w-full">
//       {Object.keys(chartData).map((query, i) => {
//         console.log(query);
//         return (
//           <div key={i} className="mt-6 w-full">
//             <h3 className="text-lg font-semibold mb-4">{query}</h3>
//             <BarChart
//               title={query}
//               className="w-full"
//               data={chartData[query]}
//               index="benchmarkRunIndex"
//               categories={["prisma", "drizzle", "typeorm"]}
//               colors={["blue", "teal", "amber"]}
//               valueFormatter={dataFormatter}
//               yAxisWidth={48}
//             />
//           </div>
//         );
//       })}
//     </div>
//     );
//   }
// }

// export default Histogram;

