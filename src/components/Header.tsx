import useAuth from "../hooks/useAuth";
import ThemeToggler from "./ThemeToggler";

const Header = () => {
  const { logoutUser } = useAuth();
  return (
    <header className="bg-primary px-10 py-6  top-0">
      <nav>
        <ThemeToggler />
        <button onClick={logoutUser}>Log Out</button>
      </nav>
    </header>
  );
};
export default Header;
