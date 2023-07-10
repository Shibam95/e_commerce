import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchApi } from '../../redux/slice/Apislice'
import { Link } from 'react-router-dom'
import { useState } from 'react'

export const Product = () => {
  
  const dispatch=useDispatch()
const state=useSelector(state=>state.api)

  const [user,setUser]=useState('')
  

useEffect(()=>{
dispatch(fetchApi())
},[dispatch])


  


let datasearch= state.data?.filter(item=>
  {
    return Object.keys(item).some(key=>item[key].toString()
    .toLowerCase().includes(user.toString().toLowerCase()))
  })
  
if(state.isLoading){
  return<h1>Loading....</h1>
}

  return (
    <>
    <h1 className='tect-center text-info' style={{margin:"auto",display:"flex",justifyContent:"center"}}>Let's Shop</h1><br/>
    
    <div>
    <form className="form-inline my-2 my-lg-0" style={{display:"flex",justifyContent:"center",margin:"auto"}}>
      <input className="form-control mr-sm-100" type="search" value={user} onChange={(e)=>setUser(e.target.value)}
       placeholder="Search" aria-label="Search"/>
    </form>
    </div>


    <div className='container-fluid'>
    <div className='row'>
    {
      datasearch?.map((product)=>{
        return(
          <>
         
          <div className='col-md-3'>
            <div className="card " style={{ width: "15rem",maxWidth:"100%",margin:"10px",borderRadius:"10%" }}>
              <img src={product?.image} alt=" " style={{height:"10rem",width:"8rem",justifyContent:"center",display:"flex",margin:"auto"}}/>
               <div style={{marginLeft:"15px"}}>
                   {product.title.slice(0,20)}....<br/>
                   {product.description.slice(0,20)}.....<br/>
                   {product.category}<br/>
                 
                   ${product.price}
                   
                </div>
                
                      <Link to={`/paramproduct/${product.id}`}  className='btn btn-outline-danger' style={{borderRadius:"20%",width:"50%",margin:"auto"}}>Buy Now</Link>
                       </div>
                      </div>
                  
        </>

        )
      })

      
    }
    </div>
    </div>
        
      
      
        )
    
    </>
  )
}
