import { useEffect, useState } from "react";
import { NavLink } from "react-router";
import { LuMessageSquareText } from "react-icons/lu";

import useAuth from "../hooks/useAuth";

import Footer from "../components/Footer";
import Header from "../components/Header";
import PageNotFound from "./PageNotFound";

import type { IUser } from "../interfaces";

import { axiosInstance } from "../api/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";
import Loading from "../components/Loading";

const Users = () => {
  const [users, setUsers] = useState<IUser[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>("");

  const { userData } = useAuth();

  const getUsers = async () => {
    setError(undefined);
    setLoading(true);
    try {
      const response = await axiosInstance.get("/user");
      setUsers(response.data?.users);
    } catch (err) {
      handleAxiosError(err, "Failed to get Users", setError, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!userData) return;

    getUsers();
  }, [userData]);

  if (!userData) return <PageNotFound />;

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Header />
      {!error ? (
        <main className="text-text-primary p-3 sm:p-6">
          <h2 className="text-3xl text-primary mb-4">People to Explore</h2>

          <section className=" flexflex-col gap-3 h-[75vh] overflow-auto chat">
            {users && users.length > 0 ? (
              users.map((user) => (
                <div
                  key={user?.id}
                  className="flex p-4 sm:p-5 bg-surface items-center gap-2 sm:gap-6 rounded-md w-full"
                >
                  <img
                    src={user?.profilePicture ?? "/blank-pfp.webp"}
                    alt=""
                    className="size-[45px] sm:size-[60px] object-center object-cover rounded-full"
                  />
                  <div className="flex flex-col w-3/5 break-all">
                    <h3 className="text-lg sm:text-xl font-semibold">{`${user?.firstName} ${user?.lastName}`}</h3>
                    <h4>@{user?.username}</h4>
                  </div>
                  <NavLink
                    to={`/chats?with=${user?.id}`}
                    className="ml-auto text-md sm:text-lg flex gap-4 items-center cursor-pointer font-semibold text-primary-txt bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
                  >
                    Message{" "}
                    <span className="hidden sm:block">
                      <LuMessageSquareText />
                    </span>
                  </NavLink>
                </div>
              ))
            ) : (
              <div className="flexflex-col gap-3 h-[75vh]">
                <h3>No other users found :(</h3>
              </div>
            )}
          </section>
        </main>
      ) : (
        <main className=" p-6 h-[80vh] w-full text-center justify-center text-lg sm:text-xl text-red-700 font-semibold">
          <h3>{error}</h3>
          <button
            onClick={getUsers}
            className="mt-2 text-sm md:text-md self-center cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Retry
          </button>
        </main>
      )}
      <Footer />
    </>
  );
};
export default Users;
