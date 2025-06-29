import { NavLink } from "react-router";

import useAuth from "../hooks/useAuth";

import Footer from "../components/Footer";
import Header from "../components/Header";

const Home = () => {
  const { userData } = useAuth();

  return (
    <>
      <Header />
      <main className="text-text-primary p-4 mx-auto justify-center items-center w-full gap-6">
        <section className="flex items-center justify-center flex-col">
          <img src="/yappin-logo.png" alt="Yappin" width={400} />
        </section>

        <section className="flex flex-col gap-1 text-text-primary text-center font-medium">
          <h3 className="text-2xl">
            Chat your way. Stay close. No drama. Just Yappin.
          </h3>
          <h4>
            Whether it’s rants, deep talks, or random 2 AM thoughts — we’ve got
            you.
          </h4>
        </section>

        <div className="flex gap-3 items-center mt-2 p-4">
          {userData ? (
            <>
              <NavLink
                to="/users"
                className="text-md cursor-pointer max-w-[120px] font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Find People
              </NavLink>
              <NavLink
                to="/chats"
                className="text-md cursor-pointer max-w-[120px] font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Go to Chats
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/register"
                className="text-md cursor-pointer max-w-[120px] font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                className="text-md cursor-pointer max-w-[120px] font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};
export default Home;
