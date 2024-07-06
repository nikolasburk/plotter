"use client"

import React, { Component } from 'react';
import Histogram from "./components/Histogram";
import { getChartData, ChartData } from './data';


export default class Home extends Component {

  componentDidMount() {
    console.log(`render home`);

  }
  
  render() {

    const chartData: ChartData = getChartData()

    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <Histogram  chartData={chartData}/>
      </main>
    );
  }
}
