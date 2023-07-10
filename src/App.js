import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import {Navbar} from './components/Navbar'
import Login from './components/login/Login'
import Register from './components/register/Register'
import {Product} from './components/productapi/Product'
import {Cartproduct} from './components/cart/Cartproduct'
import {Paramproduct} from './components/productapi/Paramproduct'
import Student from './components/crud/Student'
import EditStudent from './components/crud/EditStudent'
import  Addstudent  from './components/crud/Addstudent';
import { useDispatch } from 'react-redux';
import { check_token } from './redux/slice/AuthSlice';
import { useEffect } from 'react';
import { Categorywithblog } from './components/category/Categorywithblog';
import { Blog } from './Blog/Blog';
import { BlogDetails } from './Blog/BlogDetails';



function App() {
  const dispatch = useDispatch();
  //check token avable or not
  function PrivateRoute({ children }) {
    const token =localStorage.getItem("token") || sessionStorage.getItem("token");
    return token !== null && token !== undefined ? (
      children
    ) : (
      <Navigate to="/login" />
    );
  }

  //for Public Route
  const PublicRouteNames = [
    {
      path: "/login",
      Component: <Login/>
    },
    {

      path: "/register",
      Component: <Register/>
    },
    {
      path: '/',
      Component: <Product/>
    },
    {
      path: '/cartproduct',
      Component: <Cartproduct/>
    },
    {
      path: '/student',
      Component: <Student/>
    },

    {
      path: '/addstudent',
      Component: <Addstudent/>
    },

    {
      path: '/editstudent/:_id',
      Component: <EditStudent/>
    },

    {
      path: '/paramproduct/:id',
      Component: <Paramproduct/>
    },
    {
      path: '/blog',
      Component: <Blog/>
    },
    {
      path: '/blogdetails/:_id',
      Component: <BlogDetails/>
    },
    {
      path: '/categorywithblog/:id',
      Component: <Categorywithblog/>
    }
   
  ]
//for Private Route
  const PrivateRouteNames = [
    
    
  ]


  useEffect(() => {
   dispatch(check_token())
  }, [])
  
  return (
    <>
      {/* <Model/> */}
  
        <Router>
      
          <Navbar/>
          <Routes>
            {PublicRouteNames?.map((route, index) => {
              return (
                <Route
                  Key={index + 1}
                  exact
                  path={route.path}
                  element={route?.Component}
                />
              )
            })}

            {/* Protect Route */}
            {PrivateRouteNames?.map((route) => {
              return (
                <Route
                  path={route.path}
                  element={<PrivateRoute>{route?.Component}</PrivateRoute>}
                />
              )

            })}
           
          </Routes>
        
        </Router>

    

    </>
  );
}

export default App;
