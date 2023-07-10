import React from 'react'
import { useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { BlogDetailspart } from '../redux/slice/BlogDetailsSlice'
export const BlogDetails = () => {
    const {blog_details} = useSelector((state) => state?.blogdetails)
    console.log(blog_details?.data, 'blog_details')
    const id = useParams()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(BlogDetailspart(id))
    }, [id])
    return (
        <div>
            <main id="main">
                <section id="breadcrumbs" className="breadcrumbs mt-1">
                    <div className="container">

                        <div className="d-flex justify-content-between align-items-center">
                            <h2>Blog</h2>
                            <ol>
                                <li><a href="index.html">Home</a></li>
                                <li>Blog-Details</li>
                            </ol>
                        </div>
                    </div>
                </section>
                <section id="blog" className="blog">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 entries">

                                <article className="entry" data-aos="fade-up" >
                                    <h2 className="entry-title">
                                        <a href="blog-single.html">{blog_details?.data?.title}</a>
                                    </h2>
                                    <li className="d-flex align-items-center"><i className="icofont-wall-clock"></i> <a href="blog-single.html"><time dateTime="2020-01-01">{(new Date(blog_details?.data?.createdAt)).toLocaleDateString()}</time></a></li>
                                    <div className="entry-content">
                                        <p dangerouslySetInnerHTML={{
                                            __html: blog_details?.data?.postText
                                        }}></p>
                                    </div>

                                </article>
                            </div>
                        </div>
                    </div>
                </section>

            </main>
        </div>
    )
}

