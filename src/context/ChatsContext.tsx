import { createContext, useEffect, useState } from "react";

import useAuth from "../hooks/useAuth";

import { axiosInstance } from "../api/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";

import type { IChat } from "../interfaces";

interface IChatContextValues {
  chats: IChat[] | null;
  loading: boolean;
  error: string | undefined;
  refreshChats: VoidFunction;
}

const ChatsContext = createContext<IChatContextValues | null>(null);

export const ChatsProvider = ({ children }: { children: React.ReactNode }) => {
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const { userData } = useAuth();

  const getChats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get("/chats");
      setChats(response.data?.chats);
    } catch (err) {
      handleAxiosError(err, "Failed to get chats!", setError, true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) return;
    getChats();
  }, [userData]);

  return (
    <ChatsContext.Provider
      value={{ chats, loading, error, refreshChats: getChats }}
    >
      {children}
    </ChatsContext.Provider>
  );
};
export default ChatsContext;
