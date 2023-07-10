// import React, { useState } from "react";
// import {  useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { toast } from "react-toastify";

// const initialState = {
//   email: "",
//   newPassword: "",
//   answer:""
// };

// function Forget() {
//   const [formValue, setFormValue] = useState(initialState);
//   const { email, newPassword, answer } = formValue;
//   const Registerinfo = useSelector((state) => ({ ...state.auth }));
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

  

//   const handleForget = (e) => {
//     e.preventDefault();
//       dispatch(forgetpassword({ formValue }));
//       if(Registerinfo.success===true){
//         toast.success(Registerinfo.msg,{position:'top-center'})
//         navigate('/login')
//       }
//       if(Registerinfo.success===false){
//         toast.error(Registerinfo.msg,{position:"top-center"})
//       }
      
    
//     if(Registerinfo?.serverError==="Something went wrong"){
//     toast.error(Registerinfo?.serverError,{position:"top-center"})
//     }
    
//   };
//   const onInputChange = (e) => {
//     let { name, value } = e.target;
//     setFormValue({ ...formValue, [name]: value });
//   };

  
//   return (
    
//     <div className="login">
//     <div className="container" style={{width:"20%",backgroundColor:"gray",opacity:"0.8",borderRadius:"5%"}}>
//         <span className="logintitle" style={{fontSize:"30px"}}>Forget-Password</span>
//         <form onSubmit={handleForget}  className="loginform">

//         <label>Email<span style={{color:"red"}}>*</span></label>
//         <input type="email" name="email" value={email} onChange={onInputChange} placeholder="abc@gmail.com" />

//         <label>NewPassword<span style={{color:"red"}}>*</span></label>
//         <input type="password" name='newPassword' value={newPassword} onChange={onInputChange} />

//         <label>Answer<span style={{color:"red"}}>*</span></label>
//         <input type="text" name="answer" value={answer} onChange={onInputChange} placeholder="abc@gmail.com" />

//         <button className="loginbtn">Forget-Password</button>
        
//          </form>
//          </div>
//          </div>
//   )
// }
// export default Forget