import { useContext } from "react";

import ChatsContext from "../context/ChatsContext";

const useChats = () => {
  const context = useContext(ChatsContext);

  if (!context) throw new Error("Chats context not found!");

  return context;
};
export default useChats;
