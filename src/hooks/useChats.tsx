import { useEffect, useState } from "react";

import useAuth from "./useAuth";

import { axiosInstance } from "../api/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";

import type { IChat } from "../interfaces";

const useChats = () => {
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const { userData } = useAuth();

  useEffect(() => {
    if (!userData) return;

    const getChats = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/chats");
        setChats(response.data?.chats);
      } catch (err) {
        handleAxiosError(err, "Failed to get chats!", setError, false);
      } finally {
        setLoading(false);
      }
    };

    getChats();
  }, []);

  return {
    chats,
    loading,
    error,
  };
};
export default useChats;
