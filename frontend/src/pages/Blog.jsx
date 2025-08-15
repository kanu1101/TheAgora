import React, { useEffect } from 'react'
import Navbar from "../components/Navbar.jsx"
import { useBlog } from '../contexts/BlogContext.jsx'
import { useParams } from 'react-router-dom'

// const blog = {
//   authorProfile: "",
//   authorname: "krushnadev",
//   content: "content of the blog goes here",
// }

const Blog = () => {
  const {blogId} = useParams();
  const {getBlog, loading, blog} = useBlog();
  console.log(blogId);
  useEffect(() => {
    console.log("useEffect triggered with blodId: ", blogId);
    const fetchBlog = async () => {
      if(blogId){
        await getBlog(blogId);
      }
    }
    fetchBlog();
  }, [blogId]);

  if(loading || !blog) return <p>Loading...</p>

  return (
    <div>
      <Navbar/>
      <article className="p-8">
        <div>
          <img src={blog.authorId.profilePic || "../assets/placeholder.jpg"} className='rounded-full w-5 h-5' alt="Author Profile Pic" />
          <header>
            <p className="text-lg font-semibold">{blog.authorId.userName}</p>
          </header>

        </div>
        <section className="mt-4">
          <p>{blog.content}</p>
        </section>
      </article>
    </div>
  )
}

export default Blog
