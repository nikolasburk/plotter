"use client"

import React, { Component } from 'react';
import Histogram from "./components/Histogram";
import { getChartData, ChartData } from './data';


export default class Home extends Component {



  // Call the async function within componentDidMount
  componentDidMount() {
    console.log(`render home`);

  }


  
  render() {

    const chartData: ChartData = getChartData()

    // const chartData: BenchmarkRunForQuery[] = [
    //   {
    //     benchmarkRunIndex: 1,
    //     "prisma": 890,
    //     "drizzle": 338,
    //     "typeorm": 538,
    //   },
    //   {
    //     benchmarkRunIndex: 2,
    //     "prisma": 289,
    //     "drizzle": 233,
    //     "typeorm": 253,
    //   },
    //   {
    //     benchmarkRunIndex: 3,
    //     "prisma": 380,
    //     "drizzle": 535,
    //     "typeorm": 352,
    //   },
    //   {
    //     benchmarkRunIndex: 4,
    //     "prisma": 90,
    //     "drizzle": 98,
    //     "typeorm": 28,
    //   },
    // ];
    

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       {/* <p className="bg-red-200">Hello World</p> */}
       <Histogram  chartData={chartData}/>
      </main>
    );
  }
}
