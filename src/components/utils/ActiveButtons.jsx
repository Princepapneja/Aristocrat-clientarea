import React, { useEffect } from 'react';

const ActiveButtons = ({ buttons, active, setActive,type }) => {
 
  return (
<div>
    {
      type === 'activePage' ? 
      <div className='flex bg-white-v2 gap-3 p-3 rounded-2xl '>
        {buttons?.map((button,index)=>{
          return(
<div className={`${active===index ? 'bg-black text-white': 'bg-white text-black-v3'}  rounded-xl py-5  text-center w-full font-semibold`} key={index}
onClick={() => {
  setActive(index);
  button?.func && button.func()
}}
>{button.name}</div>
          )
        })}

  </div>
      : <div className='flex gap-3 overflow-auto md:w-[calc(100vw-320px)] w-[calc(100vw-4rem)]'>
      {buttons?.map((button, index) => (
        <button
          className={`${
            active === index ? '!border-primary text-primary' : 'text-gray-600'
          } px-2 py-0.5 border-b-2 mb-1 border-transparent duration-300 hover:border-primary `}
          key={index}
          onClick={() => {
            setActive(index);
            button?.func && button.func()
          }}
        >
          {button.name}
        </button>
      ))}
    </div>
    }

</div>
  );
};

export default ActiveButtons;
