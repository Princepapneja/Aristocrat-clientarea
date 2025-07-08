import React from 'react'
import { ChevronRight, X, ArrowLeft } from 'lucide-react';
import InputField from './InputFields';
import cross from '/logos/cross.png';
import RegionListComponent from './RegionListComponent';
import useGlobal from '../../hooks/useGlobal';

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
const MobileFilter = ({ setShowFilter, filters, showFilterModal, onFilterChange, dropdowns, studios, clearFilter, clearAllFilters }) => {

  const { regions } = useGlobal()




  return (
    <div className="w-full  mx-auto p-4 text-sm font-medium  overflow-y-auto max-h-[100vh]
">
      {/* Header */}
      <div className="flex items-center  mb-4">
        <div className="flex items-center" onClick={() => setShowFilter(false)}>
          <ArrowLeft className="mr-2 h-5 w-5" />
          <span>Back</span>

        </div>
        <h2 className="text-lg font-semibold mx-auto">Filters</h2>

      </div>

      {/* Chosen Filters */}

      {showFilterModal || (
        <>

          <p className="text-sm text-gray-600 mb-2">Choosen Filters</p>
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto">
              {Object.entries(filters).map(([key, val]) => {
                if (['skip', 'limit'].includes(key) || !val) return null;

                return (
                  <div key={key} className='flex items-center gap-3 py-2.5 px-3.5  bg-[#F4F4F4]  rounded'>
                    <p className='text-sm text-black-v3'>{
                      key
                    }</p>
                    <button onClick={() => clearFilter(key)}>
                      <X className="text-black-v3" size={20} />
                    </button>

                  </div>
                );
              })}
            </div>
          </div>


        </>
      )}


      {/* Filter Options */}


      <InputField
        type='mobileSelect'
        id='studio'
        name="Studio"
        className=" top-0 mb-2 "
        value={filters?.studio}
        options={studios}
        handleInputChange={onFilterChange}
      />
      <RegionListComponent
        id='region'
        // label="Region"
        className=" top-0 mb-2 "
        name="Region"
        options={regions}
        handleInputChange={onFilterChange}
      />
      {
        dropdowns?.volatilityOption?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          id='categoryIds'
          name="Volatility"
          // value={filters?.volatility}
          options={dropdowns?.volatilityOption}
          handleInputChange={onFilterChange}
        />

      }

      {
        dropdowns?.themeOption?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          id='categoryIds'
          name="Theme"

          value={filters?.theme}
          options={dropdowns?.themeOption}
          handleInputChange={onFilterChange}
        />

      }


      {
        dropdowns?.themeOption?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          id='categoryIds'
          name="Features"

          value={filters?.features}
          options={dropdowns?.featuresOption}
          handleInputChange={onFilterChange}
        />

      }





      {
        dropdowns?.family?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          name="Family"

          id='categoryIds'
          value={filters?.family}
          options={dropdowns?.familyOption}
          handleInputChange={onFilterChange}
        />

      }

      {
        dropdowns?.gameType?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          id='categoryIds'
          name="Game Type"

          value={filters?.gameType}
          options={dropdowns?.gameTypeOption}
          handleInputChange={onFilterChange}
        />

      }


      {
        dropdowns?.jackpotOption?.length > 0 && <InputField
          type='mobileSelect'
          className="top-0 mb-2 "
          id='categoryIds'
          name="Jackpot"

          value={filters?.jackpot}
          options={dropdowns?.jackpotOption}
          handleInputChange={onFilterChange}
        />

      }



      {/* Footer Buttons */}
      <div className="flex justify-between items-center">
        <button className="bg-[#00B290] text-white text-sm font-semibold px-4 py-2 rounded-md flex-1 mr-2" onClick={() => setShowFilter(false)}>
          Show Options: {Object.entries(filters).length > 3 && Object.entries(filters)?.length - 3}
        </button>


        <button className="border border-gray-300 text-gray-700 text-sm px-4 py-2 rounded-md flex-1" onClick={clearAllFilters}>
          Clear All
        </button>
      </div>
    </div>
  )
}

export default MobileFilter