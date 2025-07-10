import { createContext, useContext, useState } from "react";
import { axiosInstance } from "../lib/axios";


const BlogContext = createContext();

export const BlogProvider = ({ children }) => {
  const [blog, setBlog] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/blog/getBlogs");
      setBlogs(res.data);
    } catch (error) {
      console.log("error in getBlogs method", error.response?.data?.message || error.message);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  };

  const getBlog = async (blogId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/blog/${blogId}`);
      setBlog(res.data);
    } catch (error) {
      console.log("error in getBlog method", error.response?.data?.message || error.message);
      setBlog(null);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorBlogs = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get('/blog/getAuthorBlogs');
      setBlogs(res.data);
    } catch (error) {
      console.log("error in getAuthorBlogs method in BlogContext", error.response?.data?.message || error.message);
      setBlogs(null);
    } finally {
      setLoading(false);
    }
  }

  const getComments = async (blogId) => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/blog/${blogId}/comments`);
      setComments(res.data);
    } catch (error) {
      console.log("error in getComments method", error.response?.data?.message || error.message);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const postBlog = async (blogData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post(`/blog/createBlog`, blogData);
      return res.data;
    } catch (error) {
      console.log("error in postBlog", error.response?.data?.message || error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const likeBlog = async (blogId) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/blog/${blogId}/like`);
    } catch (error) {
      console.log("error in likeBlog", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const commentOnBlog = async (blogId, commentData) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/blog/${blogId}/comment`, commentData);
    } catch (error) {
      console.log("error in commentOnBlog", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const unlikeBlog = async (blogId) => {
    setLoading(true);
    try {
      await axiosInstance.post(`/blog/${blogId}/unlike`);
    } catch (error) {
      console.log("error in unlikeBlog", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const editBlog = async (blogId, blogData) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/blog/${blogId}/edit`, blogData);
    } catch (error) {
      console.log("error in editBlog", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteComment = async (blogId, commentId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/blog/${blogId}/deleteComment/${commentId}`);
    } catch (error) {
      console.log("error in deleteComment", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteBlog = async (blogId) => {
    setLoading(true);
    try {
      await axiosInstance.delete(`/blog/${blogId}/deleteBlog`);
    } catch (error) {
      console.log("error in deleteBlog", error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider
      value={{
        blog,
        blogs,
        comments,
        loading,
        getBlogs,
        getBlog,
        getComments,
        postBlog,
        likeBlog,
        commentOnBlog,
        unlikeBlog,
        editBlog,
        deleteComment,
        getAuthorBlogs,
        deleteBlog,
      }}
    >
      {children}
    </BlogContext.Provider>
  );
};

const useBlog = () => useContext(BlogContext);
export {useBlog}