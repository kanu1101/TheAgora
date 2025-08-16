// DebateContext.jsx
import { createContext, useContext, useState } from "react";
import { axiosInstance } from "../lib/axios";

const DebateContext = createContext();

export const DebateProvider = ({ children }) => {
  const [debates, setDebates] = useState([]);
  const [debate, setDebate] = useState(null);
  const [loading, setLoading] = useState(false);

  const getCoreDebates = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/debate/coreDebates");
      setDebates(res.data);
    } catch (error) {
      console.error("getCoreDebates error:", error.response?.data?.message || error.message);
      setDebates([]);
    } finally {
      setLoading(false);
    }
  };

  const getAuthorDebates = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/debate/getAuthorDebates`);
      if(!res) return res.status(404).json({message: "no debates found."});
      setDebates(res.data);
    } catch (error) {
      alert("error in fetching Debates by you.")
      console.log("error in getAuthorDebates", error.response?.data?.message || error.message);
      setDebates(null);
    } finally {
      setLoading(false);
    }
  }

  const createDebate = async (debateData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/debate/createUserDebate', debateData);
      setDebate(res.data);
      console.log("debate received successfully.")
    } catch (error) {
      console.error('createDebate error', error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  }

  const getUserDebates = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/debate/userDebates");
      setDebates(res.data);
    } catch (error) {
      console.error("getUserDebates error:", error.response?.data?.message || error.message);
      setDebates([]);
    } finally {
      setLoading(false);
    }
  };

  const getDebate = async (debateId, type) => {
    setLoading(true);
    try {
      console.log("sending request")
      const res = await axiosInstance.get(`/debate/${debateId}/arguments`, { params: { type } });
      setDebate(res.data);
      console.log("received arguments for debate");
    } catch (error) {
      console.error("getArguments error:", error.response?.data?.message || error.message);
      setDebate(null);
    } finally {
      setLoading(false);
    }
  };

  const createArgument = async ({debateId, content, side, type}) => {
    try {
      const res = await axiosInstance.post(`/debate/${debateId}/createArgument?type=${type}`, { content, side });
      console.log("argument created");
      return res.data;
    } catch (error) {
      console.error("createArgument error:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const deleteArgument = async (debateId, argumentId, type) => {
    try {
      await axiosInstance.delete(`/debate/${debateId}/deleteArgument/${argumentId}?type=${type}`);
    } catch (error) {
      console.error("deleteArgument error:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const editArgument = async (debateId, argumentId, content, type) => {
    try {
      const res = await axiosInstance.put(`/debate/${debateId}/editArgument/${argumentId}?type=${type}`, { content });
      return res.data;
    } catch (error) {
      console.error("editArgument error:", error.response?.data?.message || error.message);
      throw error;
    }
  };

  const deleteDebate = async (debateId) => {
    try {
      await axiosInstance.delete(`/debate/${debateId}`);
    } catch (error) {
      console.log("error in deleteDebate", error.response?.data?.message || error.message);
      alert("unable to delete the requested debate");
    }
  }

  return (
    <DebateContext.Provider
      value={{
        debates,
        getCoreDebates,
        getUserDebates,
        getDebate,
        createArgument,
        editArgument,
        createDebate,
        getAuthorDebates,
        deleteArgument,
        deleteDebate,
        loading,
        debate,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
};

const useDebate = () => useContext(DebateContext);
export {useDebate}
