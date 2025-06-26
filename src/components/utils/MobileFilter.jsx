import React from 'react'
import { ChevronRight, X, ArrowLeft } from 'lucide-react';

const chosenFilters = [
  { label: 'Region: USA: Michigan' },
  { label: 'Volatility: Low' },
  { label: 'Region: USA: Pennsylvania' },
  { label: 'Studio: Apparat Gaming' },
];

const filterCounts = {
  Studios: 1,
  Region: 2,
  Volatility: 1,
  Theme: 0,
  Features: 0,
  Family: 0,
  'Game Type': 0,
  Jackpots: 0,
};
const MobileFilter = () => {
  return (
    <div className="w-full max-w-sm mx-auto p-4 text-sm font-medium">
      {/* Header */}
      <div className="flex items-center mb-4">
        <ArrowLeft className="mr-2 h-5 w-5" />
        <h2 className="text-lg font-semibold">Filters</h2>
      </div>

      {/* Chosen Filters */}
      <p className="text-sm text-gray-600 mb-2">Choosen Filters</p>
      <div className="flex flex-wrap gap-2 mb-4">
        {chosenFilters.map((item, i) => (
          <div
            key={i}
            className="flex items-center bg-gray-100 rounded-md px-2 py-1 text-xs text-gray-700"
          >
            {item.label}
            <X className="ml-1 h-4 w-4 text-gray-500 cursor-pointer" />
          </div>
        ))}
      </div>

      {/* Filter Options */}
      <div className="space-y-3 mb-6">
        {Object.entries(filterCounts).map(([name, count]) => (
          <div
            key={name}
            className="flex items-center justify-between border-b pb-2 cursor-pointer"
          >
            <span className="text-gray-800">{name}</span>
            <div className="flex items-center space-x-2">
              {count > 0 && (
                <span className="text-white bg-green-400 text-xs px-2 py-0.5 rounded-full">
                  {count}
                </span>
              )}
              <ChevronRight className="h-4 w-4 text-gray-400" />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        <button className="bg-green-500 text-white text-sm font-semibold px-4 py-2 rounded-md flex-1 mr-2">
          Show Options: 4
        </button>
        <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md flex-1">
          Clear All
        </button>
      </div>
    </div>
  )
}

export default MobileFilter