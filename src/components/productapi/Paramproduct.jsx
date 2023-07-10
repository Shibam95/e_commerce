import './Paramproduct.css'
import { Link, useNavigate, useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { AddToCart } from '../../redux/slice/Cartslice'
import { useDispatch } from 'react-redux'
export const Paramproduct = () => {
    const { id }=useParams()
    const [product,setproduct]=useState([])
    const dispatch= useDispatch()
    const navigate=useNavigate()
    const BaseUrl=`https://fakestoreapi.com/products`
    const getUser =()=>{setTimeout(async()=>{
        const response=await axios.get(`${BaseUrl}`)
        const User=response.data.find((profile)=>profile.id===parseInt(id))
        setproduct(User)
      },1000)
        
    }
   
  
    useEffect(()=>{
        getUser()
    })
   

    const handleAddtocart = (product) => {
      dispatch(AddToCart(product));
      navigate("/cartproduct")
    }
    
  return (
    <>
    <div className='product-container'>
      <img className='image' src={product?.image} alt={product?.title} />
        <div className="product">
          <h4>{product?.title}</h4>
          <h4>{product?.description}</h4>
          <h4>Category:{product?.category}</h4>
          <h4>Price:${product?.price}</h4>
          
        <button onClick={()=>handleAddtocart(product)} className='btn btn-outline-danger '
        style={{marginTop:"50px"}}>Add To Cart</button>

        <Link style={{marginTop:"50px",marginLeft:"50px"}}  className='btn btn-outline-danger' >Buy Now</Link>
      
        </div>
        
        </div>
    
    </>
  )
}
