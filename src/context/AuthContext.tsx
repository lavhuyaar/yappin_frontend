import {
  createContext,
  type ReactNode,
  useEffect,
  useState,
  type SetStateAction,
} from "react";

interface IUserData {
  id: string;
  firstName: string;
  lastName: string;
  username: string;
}

interface IAuthValues {
  userData: IUserData | null;
  setUserData: React.Dispatch<SetStateAction<IUserData | null>>;
  logoutUser: VoidFunction;
}

const AuthContext = createContext<IAuthValues | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [userData, setUserData] = useState<IUserData | null>(null);

  const logoutUser = async () => {
    setUserData(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("userData");
  };

  useEffect(() => {
    const localUserData: IUserData | null = JSON.parse(
      localStorage.getItem("userData") || "null"
    );

    if (localUserData) {
      setUserData(localUserData);
    } else return;
  }, []);

  return (
    <AuthContext.Provider value={{ userData, setUserData, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
