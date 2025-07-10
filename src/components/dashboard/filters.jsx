import React, { useEffect, useState } from 'react'
import Buttons from '../utils/buttons'
import { ArrowLeft, X } from 'lucide-react'
import FilterDropdownGrouped from '../utils/multiSelect'
import FilterIcon from '../../assets/icons/Group 4519.svg'

const Filters = ({ filters, setFilters, items }) => {
    const [openFilter, setOpenFilter] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false);
const [chipsItems,setChipsItems]= useState([])

    const handleClear = (type) => {
        setFilters((prev) => ({ ...prev, [type]: [] }))
    }

    const clearAllFilters=()=>{
        setFilters({skip:0,limit:16})
    }
    const handleApplyButton = async (type, ids) => {
        setFilters((prev) => {
            return {
                ...prev,
                [type]: ids,
            };
        });
    };

    const handleOuterClear = (type, id) => {
        setFilters((prev) => ({ ...prev, [type]: prev?.[type]?.filter((q) => (q !== id)) }))
    }
    useEffect(() => {
        

        const chips = Object.entries(filters)
          .filter(([key, val]) => val && !['skip', 'limit'].includes(key))
          .flatMap(([key, val]) => {
            const optionSource = items?.find(q => q.name === key);
            const options = optionSource?.filterArray || optionSource?.options || [];
      
            if (Array.isArray(val)) {
              return val.map(v => {
                const matchedOption = options.find(opt => opt.value === v);
                return matchedOption ? { key, ...matchedOption } : { key, value: v, name: v };
              });
            } else {
              const matchedOption = options.find(opt => opt.value === val);
              return [matchedOption ? { key, ...matchedOption } : { key, value: val, name: val }];
            }
          });
      
        console.log(chips,"chips");
        setChipsItems(chips)
      }, [filters, items]);
      

    return (
        <div className=''>

            <Buttons type="border" className={"lg:hidden w-full flex items-center justify-center  gap-2"} onClick={() => { setOpenFilter(true) }} ><span>Filter</span><img src={FilterIcon} alt="" className='w-5' /></Buttons>
            <div className={`overflow-y-auto lg:overflow-y-visible  fixed w-full z-50 bg-white top-0 h-screen duration-300 lg:h-[unset] p-4 md:0 ${openFilter ? "left-0" : "left-[-100%] "} lg:static lg:grid grid-cols-4 gap-4 space-y-5`}>
                <div className='lg:hidden flex '>
                    <div className='flex items-center gap-2'>
                        <ArrowLeft />
                                                <button onClick={() => { setOpenFilter(false) }}>Back</button>

                    </div>
                    <h4 className='grow text-center'>Filters</h4>
                </div>
                <div className="flex flex-wrap gap-3  overflow-y-auto lg:hidden">
                {
    chipsItems?.map((item, i) => {
      return (
        <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
          <p className='text-sm text-black-v3'>
            {item.name}
          </p>
          <button onClick={() => handleOuterClear(item.key, item.value)}>
            <X />
          </button>
        </div>
      );
    })
  }
                </div>

                {items?.map(({ name, title, options }) => (
                    <FilterDropdownGrouped
                        key={name}
                        name={name}
                        selected={filters?.[name]}
                        options={options}
                        onApply={handleApplyButton}
                        onClear={handleClear}
                        title={
                            <div className='flex gap-2 items-center text-[#6F6F6F] font-semibold text-base capitalize'>
                                <h2>{title}</h2>
                                {filters?.[name]?.length > 0 && (
                                    <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">
                                        {filters?.[name]?.length}
                                    </span>
                                )}
                            </div>
                        }
                    />
                ))}

                <Buttons type='secondary'
                    onClick={clearAllFilters}
                    className='w-full lg:hidden'>
                    Clear All
                </Buttons>
            </div>
            <div className='hidden lg:flex justify-between items-center mb-20 '>
            <div className='flex gap-5 flex-wrap'>
  {
    chipsItems?.map((item, i) => {
        if(i>4) return null
      return (
        <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
          <p className='text-sm text-black-v3'>
            {item.name}
          </p>
          <button onClick={() => handleOuterClear(item.key, item.value)}>
            <X size={20}/>
          </button>
        </div>
      );
    })
  }
</div>

                <div className='flex gap-10'>
                    <div
                        onClick={() => setShowFilterModal(true)}
                        className='cursor-pointer font-semibold text-primary-dark flex gap-3.5 items-center bg-white-v2 rounded-xl px-5 py-2.5'
                    >
                        <p>View All Chosen Filters</p>
                        <img className='h-4 w-4' src='/logos/filterArrow.png' alt='' />
                    </div>

                    <button
                        onClick={clearAllFilters}
                        className='font-semibold text-black-v4'>
                        Clear All
                    </button>
                </div>
            </div>
            {showFilterModal && (
                    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center">
                        <div
                            className="bg-white rounded-[15px] shadow-lg p-6 w-[25%] h-[60vh] transform transition-all duration-300 translate-y-10 opacity-0 animate-popup"
                        >
                            <div className='flex items-baseline justify-end mb-5'>
                                <X
                                    size={20}
                                    className="text-black cursor-pointer hover:text-black"
                                    onClick={() => setShowFilterModal(false)}
                                />
                            </div>
                            <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto">
                            {
    chipsItems?.map((item, i) => {
      return (
        <div key={i} className='flex items-center gap-3 py-2.5 px-3.5 border-2 border-black-v4 rounded-xl'>
          <p className='text-sm text-black-v3'>
            {item.name}
          </p>
          <button onClick={() => handleOuterClear(item.key, item.value)}>
            <X size={20} />
          </button>
        </div>
      );
    })
  }
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default Filters