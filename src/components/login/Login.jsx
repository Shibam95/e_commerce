import React, { useEffect } from 'react'
import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RegLog, loginRequest } from '../../redux/slice/AuthSlice'
import './login.css'

const initialValue = {
    email: "",
    password: ""
}
const Login = () => {

    const [user, setUser] = useState(initialValue)
    const  redirectTo  = useSelector((state) => state?.Auth);
    const navigate = useNavigate();
    const [error, setError] = useState({});
    const dispatch = useDispatch();
//form validation
    const validation = () => {
        let error = {}
        if (!user.email) {
            error.email = "Email is Required"
        } else if (
            !/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(user.email)
        ) {
            error.email = "Enter a valid Email"
        }
        if (!user.password) {
            error.password = "Password is Required"
        }
        return error
    }
//onchange validation
    let name, value
    const postUserData = (e) => {
        name = e.target.name
        value = e.target.value
        setUser({ ...user, [name]: value })
        if (name === "email") {
            if (value.length === 0) {
                setError({ ...error, email: "Email is required" })
                setUser({ ...user, email: "" })
            } else {
                setError({ ...error, email: "" })
                setUser({ ...user, email: value })
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

    const SubmitInfo = async e => {
        e?.preventDefault()
        let ErrorList = validation()
        setError(ErrorList)
        let data = {
            "email": user.email,
            "password": user.password,
        }
        dispatch(loginRequest(data))
        navigate('/')
    }


    //redirect if get the token or not get the token 
    const redirectUser = () => {
        let token = localStorage.getItem("token")
        let isInLoginPage = window.location.pathname.toLowerCase() === "/login";

        if (token !== null && token !== undefined && token !== "") {
            // window.location.pathname = getPathname;
            isInLoginPage && navigate("/");
        }
    }
    useEffect(() => {
        redirectUser()
    }, [redirectTo])

const log=()=>{
    dispatch(RegLog())
}
  return (
    
    <div className="login">
    <div className="container" style={{width:"20%",backgroundColor:"gray",opacity:"0.8",borderRadius:"5%"}}>
        <span className="logintitle">Login</span>
        <form   className="loginform">
        <label>Email<span style={{color:"red"}}>*</span></label>
        <input type="email" value={user.email} name='email'  onChange={e=>postUserData(e)} placeholder="abc@gmail.com" />
        <span style={{ color: "red" }}> {error.email} </span>
        <label>Password<span style={{color:"red"}}>*</span></label>
        <input type="password" value={user.password} name='password'  onChange={e=>postUserData(e)} />
        <span style={{ color: "red" }}> {error.password} </span>
        <button onClick={SubmitInfo} className="loginbtn">Login</button>
        <button className="loginbtn"><Link  to="/forget" style={{color:"white",textDecoration:"none"}}>Forget Password</Link></button>
         </form>
         </div>
         <div className="loginregister1">If you don't have an acount please register   <i class="fa-solid fa-arrow-right"></i> </div>
         <button onClick={{log}} className="loginregister"><Link style={{textDecoration:"none",color:"white"}} to="/register">Register</Link></button>
        
        </div>
        
  )
}
export default Login