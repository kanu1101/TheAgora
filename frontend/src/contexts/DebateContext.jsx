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

  const createDebate = async (debateData) => {
    setLoading(true);
    try {
      const res = await axiosInstance.post('/debate/createUserDebate', debateData);
      setDebate(res.data);
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
      const res = await axiosInstance.get(`/debate/${debateId}/arguments`, { params: { type } });
      setDebate(res.data);
    } catch (error) {
      console.error("getArguments error:", error.response?.data?.message || error.message);
      setDebate();
    } finally {
      setLoading(false);
    }
  };

  const createArgument = async (debateId, content, side, type) => {
    try {
      const res = await axiosInstance.post(`/debate/${debateId}/createArgument?type=${type}`, { content, side });
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

  return (
    <DebateContext.Provider
      value={{
        debates,
        argumentsList,
        getCoreDebates,
        getUserDebates,
        getDebate,
        createArgument,
        deleteArgument,
        editArgument,
        createDebate,
        loading,
      }}
    >
      {children}
    </DebateContext.Provider>
  );
};

export const useDebate = () => useContext(DebateContext);
