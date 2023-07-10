import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import './Cartproduct.css'
import { AddToCart, RemoveFromCart, clearCart, decreaseCart, getTotal } from '../../redux/slice/Cartslice'
export const Cartproduct = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
 

useEffect(()=>{
dispatch(getTotal())
},[Cartproduct])

  const cart=useSelector((state)=>state.cart)
  const handleRemove=(item)=>{
     dispatch(RemoveFromCart(item))
  }
  const handledecrease=(item)=>{
    dispatch(decreaseCart(item))
  }
  const handleIncrease=(item)=>{
    dispatch(AddToCart(item))
  }
  const handleClear=()=>{
    dispatch(clearCart())
  }
  return (
    <div className='cart-container'>
    <h2>Shopping cart</h2>
      {cart.cartItem.length === 0 ? (
        <div className='cart-empty'>
        <p>Your cart is empty</p >
        <div className='start-shopping'>
        <Link to='/'><span><i class="fa-sharp fa-solid fa-arrow-left"></i>  Start shopping  <i class="fa-solid fa-arrow-right"></i></span></Link>
        </div>
        </div>
      ) : (<>
        <div className='titles'>
        <h3 className='product-title'>Product</h3>
        <h3 className='price'>Price</h3>
        <h3 className='quantity'>Quantity</h3>
        <h3 className='total'>Total</h3>
        </div>
        <div className='cart-items'>
        {cart.cartItem?.map((item)=>(
          <div className='cart-item' key={item.id}>
          <div className='cart-product'>
          <img src={item.image} alt={item.title}/>
          <div>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <p>{item.catagory}</p>
          <button onClick={()=>handleRemove(item)}>Remove</button>
          </div>
          </div>
          <div className='cart-product-price'>
          ${item.price}</div>
          <div className='cart-product-quantity'>
          <button onClick={()=>handledecrease(item)}>-</button>
          <div className='count'>{item.cartQuantity}</div>
          <button onClick={()=>handleIncrease(item)}>+</button>
          </div>
             <div className='cart-product-total-price'>${item.price * item.cartQuantity}
             </div>
          </div>
          
        ))}
        </div>
        <div className='cart-summary'>
        <button className='clear-cart'onClick={()=>handleClear()}>Clear Cart</button>
        <div className='cart-checkout'>
        <div className='subtotal'>
        <span>Subtotal</span>
        <span className='amount'>${cart.cartTotalamount}</span>
        </div>
        <p>Taxes and shipping calculated at checkout</p>
        <button>Payment</button>
        <div className='continue-shopping'>
        <Link to='/' style={{fontWeight:"800"}}><i class="fa-sharp fa-solid fa-arrow-left"></i>  Continue shopping  <i class="fa-solid fa-arrow-right"></i></Link>
        </div>
        </div>
        </div>
        </>)}
    </div>
  )
}
