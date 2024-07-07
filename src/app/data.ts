import fs from 'fs';
import path from 'path';

export type ORM = "prisma" | "drizzle" | "typeorm";

type CSVData = { [key: string]: number; };
export type ChartDataEntry = {
  benchmarkRunIndex: number;
  prisma: number;
  drizzle: number;
  typeorm: number;
};
export type ChartData = { [key: string]: ChartDataEntry[]; };

function readFileContent(orm: ORM, sampleSize: number): string {
  try {
    const filePath = path.join(process.cwd() + `/src/app/data/${orm}-${sampleSize}.csv`);
    const data = fs.readFileSync(filePath, 'utf-8');
    // console.log(`return for file content ${orm} with size ${sampleSize}\n`);
    return data;
  } catch (err) {
    console.error(err);
    return "";
  }
}


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

export function getChartData(sampleSize: number): ChartData {

  const prismaRawCSV = readFileContent('prisma', sampleSize);
  const drizzleRawCSV = readFileContent('drizzle', sampleSize);
  const typeormRawCSV = readFileContent('typeorm', sampleSize);

  const prismaData = parseCSV(prismaRawCSV);
  const drizzleData = parseCSV(drizzleRawCSV);
  const typeORMData = parseCSV(typeormRawCSV);

  // console.log(`getChartData: prisma`, prismaData)
  // console.log(`getChartData: drizzle`, drizzleData)
  // console.log(`getChartData: typeORM`, typeORMData)

  const chartData: ChartData = transformData(prismaData, drizzleData, typeORMData);
  return chartData;
}

function median(arr: number[]): number {
  const sorted = [...arr].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);

  if (sorted.length % 2 === 0) {
    return (sorted[mid - 1] + sorted[mid]) / 2;
  } else {
    return sorted[mid];
  }
}

export function getAnalysisData(sampleSize: number): {
  query: string;
  prisma: number;
  drizzle: number;
  typeorm: number;
}[] {

  const prismaRawCSV = readFileContent('prisma', sampleSize);
  const drizzleRawCSV = readFileContent('drizzle', sampleSize);
  const typeormRawCSV = readFileContent('typeorm', sampleSize);

  const prismaData = parseCSV(prismaRawCSV);
  const drizzleData = parseCSV(drizzleRawCSV);
  // console.log(` DATA`, drizzleData)
  const typeORMData = parseCSV(typeormRawCSV);

  const prismaDataCollected = transformToAnalysisData(prismaData);
  const drizzleDataCollected = transformToAnalysisData(drizzleData);
  const typeORMDataCollected = transformToAnalysisData(typeORMData);
  const data: {
    query: string;
    prisma: number;
    drizzle: number;
    typeorm: number;
  }[] = Object.keys(prismaDataCollected).map(query => {
    const key = query.replace('prisma-', '');
    if (query.includes('findMany-1-level-nesting')) {
      return null;
    }
    return {
      query: key,
      prisma: median(prismaDataCollected[query]),
      drizzle: median(drizzleDataCollected[`drizzle-${key}`]),
      typeorm: median(typeORMDataCollected[`typeorm-${key}`])
    };
  }).filter(data => Boolean(data)) as {
    query: string;
    prisma: number;
    drizzle: number;
    typeorm: number;
  }[];
  return data;

}



const transformToAnalysisData = (data: Array<Record<string, number>>): Record<string, number[]> => {
  const result: Record<string, number[]> = {};

  data.forEach((item) => {
    Object.entries(item).forEach(([key, value]) => {
      if (!result[key]) {
        result[key] = [];
      }
      result[key].push(value);
    });
  });

  return result;
};
