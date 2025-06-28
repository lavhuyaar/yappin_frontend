import { NavLink } from "react-router";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const { logoutUser } = useAuth();
  const { theme } = useTheme();
  return (
    <header className="bg-primary flex justify-center items-center max-w-auto text-primary-txt px-6 md:px-10 py-4 z-999 sticky top-0">
      <nav className="flex justify-between w-full max-w-[1800px]">
        <NavLink to="/" className="text-3xl font-black flex items-center">
          <img src={`/yappin-logo-${theme}.png`} alt="Yappin" className="object-center w-[120px] md:w-[220px]" />
        </NavLink>
        <div className="flex items-center gap-1 md:gap-4">
          <ThemeToggler />
          <button
            onClick={logoutUser}
            className="cursor-pointer text-primary-txt px-2 md:px-4 font-semibold py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Log Out
          </button>
        </div>
      </nav>
    </header>
  );
};
export default Header;
