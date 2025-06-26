import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) throw new Error("Auth context not found!");

  return context;
};
export default useAuth;
