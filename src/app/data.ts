import { prismaCSV } from './data/prisma';
import { drizzleCSV } from './data/drizzle';
import { typeORMCSV } from './data/typeorm';

export type ORM = "prisma" | "drizzle" | "typeorm";
export type BenchmarkRunForQuery = {
  benchmarkRunIndex: number;
} & {
  [key in ORM]: number;
};

// Assume the CSV data is already defined in your code as prismaCSV, drizzleCSV, and typeORMCSV
// Example: const prismaCSV = `...`;

type CSVData = { [key: string]: number; };
export type ChartDataEntry = {
  benchmarkRunIndex: number;
  prisma: number;
  drizzle: number;
  typeorm: number;
};
export type ChartData = { [key in ORM]: ChartDataEntry[]; };

function parseCSV(csv: string): CSVData[] {
  const [header, ...rows] = csv.trim().split('\n');
  const columns = header.split(',');

  return rows.map(row => {
    const values = row.split(',');
    return columns.reduce((acc, col, i) => {
      acc[col] = parseFloat(values[i]);
      return acc;
    }, {} as CSVData);
  });
}

function transformData(prismaCSVData: CSVData[], drizzleCSVData: CSVData[], typeORMCSVData: CSVData[]): ChartData {
  const queries = Object.keys(prismaCSVData[0]);
  const chartData: ChartData = {};

  queries.forEach(query => {
    const key = query.replace('prisma-', '');
    chartData[key] = prismaCSVData.map((_, index) => ({
      benchmarkRunIndex: index + 1,
      prisma: prismaCSVData[index][`prisma-${key}`],
      drizzle: drizzleCSVData[index][`drizzle-${key}`],
      typeorm: typeORMCSVData[index][`typeorm-${key}`]
    }));
  });

  return chartData;
}

export function getChartData(): ChartData {
  const prismaData = parseCSV(prismaCSV);
  const drizzleData = parseCSV(drizzleCSV);
  const typeORMData = parseCSV(typeORMCSV);

  const chartData = transformData(prismaData, drizzleData, typeORMData);
  // console.log(JSON.stringify(chartData, null, 2));
  return chartData;
}




