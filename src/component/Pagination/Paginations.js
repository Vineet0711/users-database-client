import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

const Paginations = ({handlePrevious,handleNext,page,pagecnt,setPage}) => {
  return (
    <div>
      {pagecnt>0?
      <div className='pagination_div d-flex justify-content-center mx-5'>
        <Pagination>
          <Pagination.Prev onClick={handlePrevious}/>
          {
            Array(pagecnt).fill(null).map((element,index)=>{
              return(
                <>
                    <Pagination.Item active={page===index+1?true:false} onClick={()=>setPage(index+1)}>{index+1}</Pagination.Item>
                </>
              )
            })
          }
          
          <Pagination.Next onClick={handleNext}/>
        </Pagination>
      </div>
      :""}
      
    </div>
  )
}

export default Paginations