import { Eye, EyeOff, Trash, ChevronUp, ChevronDown, Search } from "lucide-react";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import convertTimeSlot from "../../functions/TimeFormatConverter";
import { dateFormat } from "../../../constants";

const InputField = ({
  label,
  className,
  isDisable,
  min,
  options,
  deleteCta,
  type = "text",
  id,
  value,
  max,
  handleInputChange,
  handleEditorChange,
  required = false,
  placeholder = "",
  checked,
  prefix = false,
}) => {
  const [showPass, setShowPass] = useState(false);
  const [open, setOpen] = useState(false);
   const ref = useRef(null)
  const [searchTerm, setSearchTerm] = useState("");
  const handleChange = (e) => {
    const { type, value } = e.target;
    if (type === "tel") {
      const numericValue = value.replace(/[^0-9]/g, '');
      e.target.value = numericValue;
    }
    handleInputChange && handleInputChange(e);
  };

  useEffect(() => {
    if (!value && type === "file") {
      ref.current.value = null;
    } else {
      return;
    }
  }, [value]);

  const toggleDropdown = () => {
    setOpen(!open);
  };

   useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); 
    };
  }, []);






 console.log(options);
 

  const filteredData = options?.filter((data) =>{
    const dataName =data?.name || data?.title
    
    return(
dataName.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

    
  );
  const [selected, setSelected] = useState([]);


const handleCheck = (selectedData) => {
  const updatedSelection = selected.includes(selectedData)
    ? selected.filter((item) => item !== selectedData)
    : [...selected, selectedData];

  setSelected(updatedSelection);
};
const handleAddFilter = () => {
  if (handleInputChange && selected.length > 0) {
    const filterPayload = selected.map((item) => ({
      name: item.name,          
      value: item.value,      
    }));
    
console.log(filterPayload);

    handleInputChange(filterPayload);
  }
  setOpen(false); // Close dropdown after adding filter
};

console.log(selected);

  return (
    <div className={`${className} ${(type === "textarea" || type === "textEditor") ? "md:col-span-2 xl:col-span-3" : type === "checkbox" ? "flex gap-1 items-center" : "space-y-2 w-full "} normal-case`}>
      {label && (
        <div className="flex gap-1 items-center">
          <label className="capitalize font-medium block whitespace-nowrap" htmlFor={id}>
            {label}
          </label>

          {required && <span className="text-red-500 text-sm">*</span>}
        </div>
      )}

      {type === "selects" ? (
        <div ref={ref} className={`relative w-full`}>
         
            <div
              className="border-2 border-gray-200 rounded-md p-2 cursor-pointer flex items-center justify-between bg-[#F4F4F4]"
              onClick={toggleDropdown}
            >
              <span className="text-[#6F6F6F] font-semibold text-base capitalize">{id}</span>
              {open ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
            </div>
          

          {open && (
            <div className={`absolute mt-2 bg-white shadow-lg rounded-md border border-gray-200 z-50 p-4 w-full`}>
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
                {filteredData?.map((data, index) => (
                  <label key={data.value} className="flex items-center space-x-2 py-1">
                    <input
                      type="checkbox"
                     checked={selected.some(item => item.value === data.value)}
                      onChange={() => handleCheck(data)}
                      className="accent-green-600"
                    />
                    <span className="text-sm text-gray-800">{data?.name || data?.title}</span>
                  </label>
                ))}
                {filteredData?.length === 0 && (
                  <div className="text-sm text-gray-500 text-center py-2">No results found</div>
                )}
              </div>


                <div className="flex justify-between items-center px-3 py-2">
                  <button
                    className="cursor-pointer bg-[#00B290] hover:bg-black text-white px-4 py-1 rounded-md text-sm"
                     onClick={handleAddFilter}
                  >
                    Add Filters
                  </button>
                  <button
                    className="px-3 py-1 text-sm border rounded-md bg-white hover:text-black hover:border-black border-[#A8A8A8] text-gray-700" onClick={() => setSelected([])} 
                  >
                    Clear All
                  </button>
                </div>
              
            </div>
          )}
        </div>
      ): type === "select" ? (
          <select
            value={value}
            onChange={handleInputChange}
            name={id}
            id={id}
            className="block w-full bg-transparent p-[0.6rem] border-2 border-gray-200 placeholder:font-light focus:outline-primary-dark rounded-xl text-desc"
          >
            {options?.map((option, key) => {
              
              return (
                <option
                  key={option?.id || key}
                  disabled={option?.disable}
                  selected={option?.selected}
                  value={option?.id || option?.value}
                >
                  {option?.name}
                </option>
              );
            })}
          </select>
      ) : type === "textarea" ? (
        <textarea
          id={id}
          name={id}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange && handleInputChange}
          className="bg-transparent p-3 text-desc placeholder:font-light border-2 border-gray-200 focus:outline-primary-dark rounded-xl w-full"
        ></textarea>
      ) : type === "switch" ? (
        <label className="flex justify-end cursor-pointer text-right">
          <input type="checkbox" name={id} id={id} onChange={handleInputChange} checked={value} className="sr-only peer" />
          <div className="relative text-desc w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border-2 after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-dark" />
        </label>
      ) : type === "textEditor" ? (
        <JoditEditor value={value} onChange={handleEditorChange} />
      ) : (
        <div className="flex items-center border border-black-v4 rounded-xl outline-none">
          {prefix && prefix()}
          <input
            id={id}
            type={type === "password" ? (showPass ? "text" : "password") : type}
            name={id}
            ref={ref}
            value={
              type === "file"
                ? undefined
                : type === "date"
                ? moment(value)?.format("YYYY-MM-DD")
                : type === "time"
                ? convertTimeSlot(value, "24h")
                : value
            }
            placeholder={placeholder}
            checked={checked}
            maxLength={type === "tel" ? max : undefined}
            max={max}
            min={min}
            pattern={type === "tel" ? "[0-9]*" : undefined}
            inputMode={type === "tel" ? "numeric" : undefined}
            accept={type === "file" ? "image/*" : undefined}
            onChange={handleChange}
            className={`bg-white-v1 accent-primary-dark text-desc bg-transparent leading-0 p-1 sm:p-2 w-full placeholder:font-light placeholder:text-sm focus:outline-none disabled:bg-gray-200 ${type !== "password" ? "rounded-xl" : "rounded-l-xl"}`}
            disabled={isDisable}
          />

          {deleteCta && (
            <div onClick={deleteCta} className="cursor-pointer bg-red-500 p-2 rounded-r-xl text-white">
              <Trash />
            </div>
          )}
          {type === "password" && (
            <button type="button" onClick={() => setShowPass(!showPass)} className="bg-primary-dark text-white cursor-pointer p-2 rounded-r-lg">
              {showPass ? <Eye /> : <EyeOff />}
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default InputField;
