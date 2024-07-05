"use client";

import React, { Component } from "react";
import { BarChart } from "@tremor/react";
import { BenchmarkRunForQuery } from "../data";

const dataFormatter = (number: number) => Intl.NumberFormat("us").format(number).toString();

// class Histogram extends Component<BenchmarkRunForQuery[]> {
class Histogram extends Component<any> {
  async componentDidMount() {
    console.log(`render histogram, props: `, this.props);
  }

  render() {
    const { chartData } = this.props;
    return (
      <div className="w-full">
      {Object.keys(chartData).map((query, i) => {
        console.log(query);
        return (
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
        );
      })}
    </div>
    );
  }
}

export default Histogram;

// Object.keys(data).forEach((key) => {
//   // TypeScript doesn't know the type of `key` at this point, so we need to assert it
//   const typedKey = key as keyof Data;

//   // Now we can safely access the values with the correct type
//   console.log(`Key: ${typedKey}, Value: ${data[typedKey]}`);
// });

// export default async function Histogram() {
//   console.log(`render histogram`)
//   return (
//     <>
//       <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
//         Writing Contest: Entries
//       </h3>
//       <BarChart
//         className="mt-6"
//         data={chartdata}
//         index="name"
//         categories={[
//           'prisma',
//           'drizzle',
//           'typeorm',
//           'Group D',
//           'Group E',
//           'Group F',
//         ]}
//         colors={['blue', 'teal', 'amber', 'rose', 'indigo', 'emerald']}
//         valueFormatter={dataFormatter}
//         yAxisWidth={48}
//       />
//     </>
//   );
// }
