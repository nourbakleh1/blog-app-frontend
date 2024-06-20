import React from 'react';

const Pagination = ({pages,setCurrent,current}) => {
    const postArray=[];
    for(let i=1;i<=pages;i++){
      postArray.push(i);
    }
  return (
    <>
        <div className='flex justify-center items-center bg-white gap-5 p-[20px] border-y-2 border-l-primary_color '>
            <button disabled={current === 1} onClick={()=>setCurrent(current - 1)} className='text-blue_color bg-white cursor-pointer border-2 p-1 font-bold text-sm border-blue_color rounded-[10px]'>Previous</button>
            {
                    postArray.map((page)=>{
                        return <div className={ current === page ? `active`:`` +`text-blue_color cursor-pointer rounded-lg`} key={page}
                        onClick={()=>{setCurrent(page)
                        }
                        }>{page}</div>
                    })
            }
            <button disabled={current === postArray.length} onClick={()=>setCurrent(current + 1)} className='text-blue_color cursor-pointer bg-white border-2 p-1 font-bold text-sm border-blue_color rounded-[10px]'>Next</button>

        </div>
    </>
  )
}

export default Pagination;