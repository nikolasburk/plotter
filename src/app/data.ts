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

function readFileContent(orm: ORM, sampleSize: number = 5000): string {
  try {
    const filePath = path.join(process.cwd() + `/src/app/data/${orm}-${sampleSize}.csv`);
    const data = fs.readFileSync(filePath, 'utf-8');
    // console.log(`return for ${orm}\n`, data);
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

export function getChartData(sampleSize?: number): ChartData {

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




