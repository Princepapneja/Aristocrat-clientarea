   <div className=' bg-white  rounded-lg  p-10'>
                        <div className='flex justify-end gap-7'>
                            <Buttons type='download' name='Download Selected'></Buttons>
                            <Buttons type='download' name='Download All'></Buttons>
                        </div>

                        <hr className='border-1 border-[#A8A8A8] mt-5' />

                         <div className="space-y-1 max-h-[400px] overflow-y-auto">
        {data.map((row) => (
          <div key={row.id}>
            {/* Parent Row */}
            <div className="flex items-center justify-between py-3 border-b border-gray-200">
              <div className="flex items-center gap-2">
                <button onClick={() => toggleExpand(row.id)}>
                  {row.children.length > 0 ? (
                    expanded[row.id] ? (
                      <ChevronDown size={18} />
                    ) : (
                      <ChevronRight size={18} />
                    )
                  ) : (
                    <div className="w-[18px]" />
                  )}
                </button>
                <input type="checkbox"  />
                <span className="text-sm font-medium text-black">{row.name}</span>
              </div>
              <button className="flex bg-primary-dark hover:bg-[black] px-8 py-2.5 rounded-xl items-center gap-2.5 text-white">
                Download <Download size={14} />
              </button>
            </div>

            {/* Child Rows */}
            {expanded[row.id] &&
              row.children.map((child) => (
                <div
                  key={child.id}
                  className="ml-10 flex items-center justify-between py-2"
                >
                  <div className="flex items-center gap-2">
                    <input type="checkbox" className='cursor-pointer' />
                    <span className="text-lg text-black font-normal">{child.name}</span>
                  </div>
                              <Buttons type='download' name='Download' className="flex bg-primary-dark hover:bg-[black] px-8 py-2.5 rounded-xl items-center gap-2.5 text-white font-semibold">

                  </Buttons>
                </div>
              ))}
          </div>
        ))}
      </div>
                    </div>


const renderFiles=(newFolders)=>{
      return newFolders?.map((folder,i)=>{
                               return  <div className=''>
                                <div className='flex justify-between'>
<p>{folder?.name}</p>
                                    <button>Download</button>
                                </div>
                                    
                                    <div>
 
                                    {
                                        folder?.subfolders && <div className='ml-4 flex gap-4  justify-between'>
                                            <p>inner</p>
                                            <div className='grow'>

                                            {
                                                renderFiles(folder?.subfolders)
                                            }
                                            </div>
                                        </div>
                                    }
                                    </div>

                                    <div className='ml-4'>
                                        {
                                            folder?.files?.map((e)=>{
                                           return   <div className='flex justify-between'>
                                    <p>{e?.name}</p>
                                    <button>Download File</button>  
                                    </div>
                                            })
                                        }
                                    </div>
                                </div>
                            })
}