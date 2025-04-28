import React from 'react'
 
function GameCard({gameImage,title,by,date}) {
  return (
    <>
  
 
   
    <div className='bg-white-v2 pb-9 rounded-2xl max-w-72'>
        <div className='relative'>
        <img className='w-72 h-96 rounded-3xl mb-5' src={gameImage} alt="" />
{date && <p className='absolute top-3 left-3 font-semibold px-3.5 py-2.5 primary-gradient rounded-xl '>{date}</p>}
        </div>
        <div className='px-7 '>
        <p className='text-2xl font-medium max-w-56 mb-3'>
{title}
        </p>
        <p className=''>
            By: {by}
        </p>
        </div>
 
    </div>
    
    </>
  )
}
 
export default GameCard