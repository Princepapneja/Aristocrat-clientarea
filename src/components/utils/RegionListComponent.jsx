import { filter } from "jszip";
import { ChevronUp, ChevronDown, Search, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const RegionListComponent = ({clearFlag,setClearFlag ,label, id, options, value, handleInputChange, className,name }) => {
    const [open, setOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [selected, setSelected] = useState([]);
    const [expandedRegions, setExpandedRegions] = useState({});
    const ref = useRef(null);

    const toggleDropdown = () => setOpen(!open);



    useEffect(() => {
        const handleClickOutside = (event) => {
            if (ref.current && !ref.current.contains(event.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleCheck = (selectedData) => {
        const updatedSelection = selected.some((item) => item.value === selectedData.value)
            ? selected.filter((item) => item.value !== selectedData.value)
            : [...selected, selectedData];
        setSelected(updatedSelection);
    };

    const handleAddFilter = () => {
        if (handleInputChange && selected.length > 0) {
            const filterPayload = selected.map((item) => ({ name: item?.name, value: item.value, id }));
            handleInputChange(filterPayload, selected);
        }
        setOpen(false);
    };

    const toggleRegion = (regionId) => {
        setExpandedRegions((prev) => ({ ...prev, [regionId]: !prev[regionId] }));
    };

    const filteredOptions = options?.filter((region) => {
        return region.region?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            region.countries?.some((c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()));
    });


      useEffect(() => {
    if (clearFlag) {
      
      setSelected([])
      setClearFlag(false)
    }
   
  }, [clearFlag]);
  

    return (
        <div ref={ref} className={`${className} relative w-full`}>
            {label && (
                <div className="flex gap-1 items-center mb-2">
                    <label className="capitalize font-medium block whitespace-nowrap" htmlFor={id}>
                        {label}
                    </label>


                </div>
            )}

            <div
                className="border-2 border-gray-200 rounded-md p-2 cursor-pointer flex items-center justify-between bg-[#F4F4F4]"
                onClick={toggleDropdown}
            >
                <span className="text-[#6F6F6F] font-semibold text-base capitalize">
                    {name} {selected?.length > 0 && (
                        <span className="ml-2 bg-[#94FF80] px-2 py-0.5 rounded text-xs text-black">{selected.length}</span>
                    )}
                </span>
                {open ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>


            {open && (
                <div className={`${className} absolute mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4 w-full`}>
                    <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md">
                        <Search size={16} className="text-gray-500 mr-2" />
                        <input
                            type="text"
                            className="w-full outline-none text-sm"
                            placeholder="Keyword"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="max-h-48 overflow-y-auto px-3 py-2 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100">
                        {filteredOptions?.map((region) => (
                            <div key={region?.id} className="mb-1">
                                <div className="flex justify-between items-center cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-md">
                                    <div className="flex items-center gap-3" onClick={() => toggleRegion(region?.id)}>
                                        {region?.countries?.length > 0 && (
                                            expandedRegions[region.id] ? <ChevronUp size={14} className={`font-semibold text-base ${expandedRegions[region?.id] ? 'text-black' : 'text-[#6F6F6F]'
                                                }`}  /> : <ChevronDown size={14}  className={`font-semibold text-base ${expandedRegions[region?.id] ? 'text-black' : 'text-[#6F6F6F]'
                                                }`} />
                                        )}
                                        <span
                                            className={`font-semibold text-base ${expandedRegions[region?.id] ? 'text-black' : 'text-[#6F6F6F]'
                                                }`}
                                        >
                                            {region?.name}
                                        </span>

                                    </div>
                                    <input
                                        type="checkbox"
                                          className="accent-[#00B290]"
                                        checked={region?.countries?.every((c) => selected.some((s) => s.value === c.id))}
                                        onChange={() => {
                                            const isAllSelected = region.countries?.every((c) => selected.some((s) => s.value === c.id));
                                            const updated = isAllSelected
                                                ? selected.filter((s) => !region.countries.some((c) => c.id === s.value))
                                                : [
                                                    ...selected,
                                                    ...region.countries.filter((c) => !selected.some((s) => s.value === c.id)).map((c) => ({
                                                        name: c.name,
                                                        value: c.id,
                                                    })),
                                                ];
                                            setSelected(updated);
                                        }}
                                    />
                                </div>
                                {expandedRegions[region.id] && (
                                    <div className="pl-6 space-y-1 mt-1">
                                        {region.countries.map((country) => (
                                            <label key={country.id} className="flex items-center gap-5 text-base text-[#6F6F6F] font-normal">
                                                <input
                                                    type="checkbox"
                                                      className="accent-[#00B290]"
                                                    checked={selected.some((item) => item.value === country.id)}
                                                    onChange={() => handleCheck({ name: country.name, value: country.id })}
                                                />
                                                {country.name}
                                            </label>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {filteredOptions?.length === 0 && (
                            <div className="text-sm text-gray-500 text-center py-2">No results found</div>
                        )}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                        <button
                            className="bg-[#00B290] hover:bg-black text-white px-4 py-1 rounded-md text-sm font-medium"
                            onClick={handleAddFilter}
                        >
                            Add Filters
                        </button>
                        <button
                            className="px-4 py-1 text-sm border rounded-md bg-white hover:text-black hover:border-black border-[#A8A8A8] text-gray-700"
                            onClick={() => setSelected([])}
                        >
                            Clear All
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RegionListComponent;
