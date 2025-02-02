"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Home: React.FC = () => {
  const router = useRouter();

  const sampleSizes = [1000, 5000, 7500, 10000];

  return (
    <main className="flex min-h-screen flex-col items-center p-12 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8">Sample Sizes</h1>
      {sampleSizes.map((sampleSize) => (
        <div key={sampleSize} className="flex flex-col">
          <button
            className="px-6 py-3 m-4 bg-blue-500 text-white font-semibold rounded-lg shadow-md"
            key={sampleSize}
            onClick={() => router.push(`/benchmark?size=${sampleSize}`)}
          >
            Size: {sampleSize}
          </button>
          <div>test</div>
        </div>
      ))}
    </main>
  );
};

export default Home;
