import React from 'react'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '../../redux/slice/AuthSlice'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import './register.css'
const initialValue = {
    name: "",
    email: "",
    mobile: "",
    password: "",
}

const Register = () => {
    const  redirectReg  = useSelector((state) => state?.Auth);
    const [user, setUser] = useState(initialValue);
    const [error, setError] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const validation = () => {
        let error = {}

        if (!user.name) {
            error.name = "Name is Required"
        }

        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }

        if (!user.mobile) {
            error.mobile = "Mobile is Required"
        }
        if (!user.password) {
            error.password = "Password is Required"
        }

        return error
    }

    let name, value
    const postUserData = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })


        if (name === "name") {
            if (value.length === 0) {
                setError({ ...error, name: "@Name is Required" })
                setUser({ ...user, name: "" })
            } else {
                setError({ ...error, name: "" })
                setUser({ ...user, name: value })
            }
        }
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
            }
        }
        if (name === "mobile") {
            if (value.length === 0) {
                setError({ ...error, mobile: "@mobile is Required" })
                setUser({ ...user, mobile: "" })
            } else {
                setError({ ...error, mobile: "" })
                setUser({ ...user, mobile: value })
            }
        }
        if (name === "password") {
            if (value.length === 0) {
                setError({ ...error, password: "@password is Required" })
                setUser({ ...user, password: "" })
            } else {
                setError({ ...error, password: "" })
                setUser({ ...user, password: value })
            }
        }
    }
 
    const SubmitInfo = async (e) => {
        e?.preventDefault()
        let ErrorList = validation()
        setError(validation())
        let formData = new FormData();
        if (Object.keys(ErrorList).length === 0) {
            formData.append("name", user.name);
            formData.append("email", user.email);
            formData.append("mobile", user.mobile);
            formData.append("password", user.password);
            dispatch(registerUser(formData))
             navigate('/login')
        }
    }
    const redirectUser = () => {
        let name = localStorage.getItem("name")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/register";
        if (name !== null && name !== undefined && name !== "") {
            isInLoginPage && navigate("/login");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectReg])
  return (
    <div className="register">
    <div className="container" style={{width:"20%",maxWidth:"100%",backgroundColor:"gray",borderRadius:"5%",opacity:"0.7"}}>
        <span className="registertitle">Register</span>
        <form  className="registerform"style={{height:"90%"}}>

        <label>Name<span style={{color:"red"}}>*</span></label>
        <input type="text" value={user.name} name='name'  required="pls" onChange={e=>postUserData(e)} placeholder="Enter Firstname" />
        <span style={{ color: "red" }}> {error.name} </span>
        <label>Mobile<span style={{color:"red"}}>*</span></label>
        <input type="number" value={user.mobile} name='mobile'  onChange={e=>postUserData(e)} placeholder="Enter Lastname" />
        <span style={{ color: "red" }}> {error.mobile} </span>
        <label>Email<span style={{color:"red"}}>*</span></label>
        <input type="email" value={user.email} name='email'  onChange={e=>postUserData(e)} placeholder="Enter Email" />
        <span style={{ color: "red" }}> {error.email} </span>
        <label>Password<span style={{color:"red"}}>*</span></label>
        <input type="password" value={user.password} name='password'  onChange={e=>postUserData(e)}  />
        <span style={{ color: "red" }}> {error.password} </span>
        
        
        <button onClick={SubmitInfo} className="registerbtn">Register</button>
         </form>
         </div>
         <div className="loginregister1">If you have an acount please login   <i class="fa-solid fa-arrow-right"></i> </div>
         <button className="registerregister"><Link style={{textDecoration:"none",color:"white"}} to={"/login"} >Login</Link></button>
        </div>
  )
}
export default Register