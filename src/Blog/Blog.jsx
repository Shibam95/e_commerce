import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { fetchBlog } from "../redux/slice/BlogSlice";
import {fetchCategory,LatestPost} from '../redux/slice/CategorySlice'
import { blogimage } from '../images/helper/Helper';
import { Link } from 'react-router-dom';
import { Vortex } from 'react-loader-spinner'
import { useState } from 'react';
import { Searchblog } from '../redux/slice/SearchSlice';


export const Blog = () => {
    const dispatch = useDispatch()
    const [user,setUser]=useState('')
    const { blog_data } = useSelector((state) => state?.blog)
    const { category_data } = useSelector((state) => state?.category)
    console.log(category_data);
    const { letest_post_data } = useSelector((state) => state?.category)
    const { search_blog }=useSelector((state)=> state?.searchblog)
   
    useEffect(() => {
        dispatch(fetchBlog());
        dispatch(fetchCategory());
        dispatch(LatestPost());
        
    }, [dispatch])
const handleSubmit=()=>{
    dispatch(Searchblog())
}
    

    return (
        <div>
            <main id="main">
                <section id="breadcrumbs" className="breadcrumbs mt-1">
                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Blog</h2>
                            <ol>
                                <li><a href="index.html">Home</a></li>
                                <li>Blog</li>
                            </ol>
                        </div>
                    </div>
                </section>
                <section id="blog" className="blog">
                    <div className="container">

                        <div className="row">

                            <div className="col-lg-8 entries">
                                {blog_data !== null ? (
                                    <>
                                        {blog_data?.data?.map((blog, key) => {
                                            return (
                                                <article className="entry" data-aos="fade-up" key={key}>

                                                    <div className="entry-img">
                                                        <img src={blog.image} alt="" className="img-fluid" />
                                                    </div>

                                                    <h2 className="entry-title">
                                                        <a href="blog-single.html">{blog.title}</a>
                                                    </h2>

                                                    <div className="entry-meta">
                                                        <ul>
                                                            <li className="d-flex align-items-center"><i className="icofont-user"></i> <a href="blog-single.html">Admin</a></li>
                                                            <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime="2020-01-01">{(new Date(blog.createdAt)).toLocaleDateString()}</time></a></li>
                                                            <li className="d-flex align-items-center"><i className="icofont-comment"></i> <a href="blog-single.html">Comments</a></li>
                                                        </ul>
                                                    </div>

                                                    <div className="entry-content">
                                                        <p dangerouslySetInnerHTML={{
                                                            __html: blog?.postText.slice(0, 350)
                                                        }}>

                                                        </p>
                                                        <div className="read-more">
                                                            <Link to={`/blogdetails/${blog?._id}`}>Read More</Link>
                                                        </div>
                                                    </div>

                                                </article>
                                            )
                                        })}
                                    </>
                                ) : (
                                    <>
                                        <Vortex
                                            visible={true}
                                            height="80"
                                            width="80"
                                            ariaLabel="vortex-loading"
                                            wrapperStyle={{}}
                                            wrapperclassName="vortex-wrapper"
                                            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
                                        />
                                    </>
                                )}
                                
                            </div>

                            <div className="col-lg-4">

                                <div className="sidebar" data-aos="fade-left">
                                    <h3 className="sidebar-title">Search</h3>
                                    <div>
    <form onSubmit={handleSubmit} className="form-inline my-2 my-lg-0" style={{display:"flex",justifyContent:"center",margin:"auto"}}>
      <input className="form-control mr-sm-100" type="search" value={user} onChange={(e)=>setUser(e.target.value)}
       placeholder="Search" aria-label="Search"/>
       <button type='submit'className='btn btn-outline-success'>enter</button>
    </form>
    </div>
                                    

                                    <h3 className="sidebar-title">Categories</h3>
                                    <div className="sidebar-item categories">
                                        <ul>
                                            {category_data !== null ? (
                                                <>
                                                    {category_data?.data?.map((category, key) => {
                                                        return (
                                                            <>
                                                                <li key={key}><Link to={`/categorywithblog/${category?._id}`}>{category.category}<span>(25)</span></Link></li>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            ) : (
                                                <>
                                                    <span>Loading.......</span>
                                                </>
                                            )}
                                        </ul>
                                    </div>

                                    <h3 className="sidebar-title">Recent Posts</h3>
                                    <div className="sidebar-item recent-posts">
                                        {letest_post_data !== null ? (
                                            <>
                                                {letest_post_data?.data?.map((latest, key) => {
                                                    return (
                                                        <>
                                                            <div className="post-item clearfix" key={key}>
                                                                <img src="assets/img/blog-recent-posts-4.jpg" alt="" />
                                                                <h4><a href="blog-single.html">{latest.title}</a></h4>
                                                                <time dateTime="2020-01-01">{(new Date(latest.createdAt)).toLocaleDateString('en-us', { month: 'short', year: 'numeric' })}</time>
                                                            </div>
                                                        </>
                                                    )
                                                })}
                                            </>
                                        ) : (
                                            <span>Loading....</span>
                                        )}

                                    </div>

                                    <h3 className="sidebar-title">Tags</h3>
                                    <div className="sidebar-item tags">
                                        <ul>
                                            <li><a href="#">App</a></li>
                                            <li><a href="#">IT</a></li>
                                            <li><a href="#">Business</a></li>
                                            <li><a href="#">Business</a></li>
                                            <li><a href="#">Mac</a></li>
                                            <li><a href="#">Design</a></li>
                                            <li><a href="#">Office</a></li>
                                            <li><a href="#">Creative</a></li>
                                            <li><a href="#">Studio</a></li>
                                            <li><a href="#">Smart</a></li>
                                            <li><a href="#">Tips</a></li>
                                            <li><a href="#">Marketing</a></li>
                                        </ul>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>
                </section>

            </main>
        </div>
    )
}


