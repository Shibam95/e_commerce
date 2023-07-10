import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { categoryWithBlog } from '../../redux/slice/CatBlogSlice'

export const Categorywithblog = () => {
  const item = useSelector((state) => state?.catblog)
console.log(item?.data);
  const id = useParams()
  const dispatch = useDispatch()

  useEffect((id)=>{
    dispatch(categoryWithBlog(id))
  },[id])

  return (
    <div>
    {item?.data?.map((blog, key) => {
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
                      __html: blog?.postText
                  }}>

                  </p>

              </div>
              </article>
              )
                })
              }
    </div>
  )
}


