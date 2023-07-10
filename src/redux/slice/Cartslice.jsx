import { createSlice } from "@reduxjs/toolkit"
import { toast } from "react-toastify"
 
const initialState={
  cartItem: localStorage.getItem("cartItem") ? JSON.parse(localStorage.getItem("cartItem"))
  :[],
  cartTotalquantity: 0,
  cartTotalamount: 0
}
const Cartslice=createSlice({
    name: 'cart',
    initialState,
    reducers:{
        AddToCart(state,action) {
        const itemIndex=  state.cartItem.findIndex((item)=>item.id===action.payload.id)
        if(itemIndex>=0){
          state.cartItem[itemIndex].cartQuantity += 1
          toast.info(`increased ${ state.cartItem[itemIndex].title} quantity`,{
            position:'top-center'
          })
          
        }else{
          const tempProduct={...action.payload, cartQuantity: 1}
          state.cartItem.push(tempProduct)
          toast.success(`${action.payload.title} added to cart`,{
            position:'top-center'
          })
        }
        localStorage.setItem("cartItem",JSON.stringify(state.cartItem)) 
        },
      RemoveFromCart(state,action){
        const nextCartitem= state.cartItem.filter(cartItem=>cartItem.id !== action.payload.id)
        state.cartItem= nextCartitem;
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        toast.error(`${action.payload.title} remove from cart succesfully`,
        {position:"top-center"})
      }, 
       decreaseCart(state,action){
          const itemIndex=state.cartItem.findIndex(cartItem=>cartItem.id === action.payload.id)
          if(state.cartItem[itemIndex].cartQuantity >1){
            state.cartItem[itemIndex].cartQuantity -= 1
            toast.info(` Decreased ${action.payload.title} cart quantity`,
            {position:"top-center"});
          }else if(state.cartItem[itemIndex].cartQuantity === 1){
            const nextCartitem= state.cartItem.filter(cartItem=>cartItem.id !== action.payload.id)
        state.cartItem= nextCartitem;
     
        toast.error(`${action.payload.title} remove from cart succesfully`,
        {position:"top-center"})
          }
          localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
       },
        clearCart(state,action){
           state.cartItem=[]
           toast.error(`Cart clear`,
        {position:"top-center"});
        localStorage.setItem("cartItem", JSON.stringify(state.cartItem))
        },
        getTotal(state,action){
         let {total,quantity}=  state.cartItem.reduce((cartTotal,cartItem)=>{
            const {price,cartQuantity}=cartItem
            const itemTotal= price * cartQuantity;
            cartTotal.total += itemTotal
            cartTotal.quantity += cartQuantity
             
            return cartTotal
          },{
            total: 0,
            quantity: 0
           })
           state.cartTotalquantity= quantity;
           state.cartTotalamount = total
        }
    }
})
export  const {AddToCart,RemoveFromCart,decreaseCart,clearCart,getTotal} = Cartslice.actions
export default Cartslice.reducer