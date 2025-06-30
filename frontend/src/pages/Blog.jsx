import React from 'react'
import Navbar from "../components/Navbar.jsx"

const blog = {
  authorname: "krushnadev",
  content: "content of the blog goes here",
}

const Blog = () => {
  return (
    <div>
      <Navbar/>
      <article className="p-8">
        <header>
          <p className="text-lg font-semibold">{blog.authorname}</p>
        </header>
        <section className="mt-4">
          <p>{blog.content}</p>
        </section>
      </article>
    </div>
  )
}

export default Blog
