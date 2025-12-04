// app/page.tsx
'use client';

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative overflow-hidden">
      {/* Background shapes */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-orange-400 rounded-full opacity-70"></div>
      <div className="absolute top-40 right-10 w-24 h-24 bg-blue-400 rounded-full opacity-70"></div>
      <div className="absolute bottom-10 right-20 w-8 h-8 bg-green-400 rounded-full"></div>
      <div className="absolute top-60 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-purple-500 rounded-lg rotate-45"></div>

      <div className="container mx-auto px-4 py-20 text-center relative z-10">
        <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 leading-tight">
          Solve problem with an <br /> integrated agency.
        </h1>
        <p className="text-gray-500 max-w-2xl mx-auto mb-8">
          Ehya is the Instagram analytics platform teams use to stay focused on the goals, track engagement for report your business.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
            See our portfolio
          </Button>
          <Button variant="outline" size="lg">
            More info
          </Button>
        </div>
      </div>
    </main>
  );
}