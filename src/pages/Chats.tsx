import { useEffect, useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router";

import useChats from "../hooks/useChats";
import useAuth from "../hooks/useAuth";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatSection from "../sections/ChatSection";
import ChatList from "../components/ChatList";

import { SECTIONS_TO_SHOW } from "../constants";
import Loading from "../components/Loading";

const Chats = () => {
  const { userData } = useAuth();
  const { chats, loading, error } = useChats();
  const navigate = useNavigate();

  const [sectionToShow, setSectionToShow] = useState<"chats-list" | "chatBox">(
    SECTIONS_TO_SHOW.CHATS_LISTS
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const receiverId: string | null = searchParams.get("with");

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userData]);

  useEffect(() => {
    if (!receiverId) return;

    setSectionToShow(SECTIONS_TO_SHOW.CHAT_BOX);
  }, [receiverId]);

  const chatOnClick = (receiverId: string) => {
    const params = new URLSearchParams();
    params.set("with", receiverId);
    setSearchParams(params);
  };

  // Navigates User back to chats list section (in Mobile viewport)
  const goBackFromSelectedChat = () => {
    setSearchParams((state) => {
      state.delete("with");
      return state;
    });
    setSectionToShow(SECTIONS_TO_SHOW.CHATS_LISTS);
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return (
      <>
        <Header />
        <main className=" p-6 h-[80vh] w-full text-center justify-center text-lg sm:text-xl text-red-700 font-semibold">
          <h3>{error}</h3>
          <NavLink
            to="/"
            className="mt-2 text-sm md:text-md self-center cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
          >
            Go back to homepage
          </NavLink>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="!flex-row mx-auto text-text-primary p-3 pt-6 md:p-6 gap-3">
        <section
          className={`w-full ${
            sectionToShow === SECTIONS_TO_SHOW.CHATS_LISTS ? "flex" : "hidden"
          } w-full md:flex flex-col md:w-1/3 h-[75vh] overflow-y-auto chat`}
        >
          <h2 className="text-3xl text-primary mb-4">Chats</h2>
          {chats && chats?.length > 0 ? (
            <>
              {chats.map((chat) => (
                <ChatList
                  messages={chat?.messages}
                  receiverId={receiverId}
                  chatOnClick={chatOnClick}
                  key={chat?.id}
                  userB={
                    chat?.userAId === userData?.id ? chat?.userB : chat?.userA
                  }
                />
              ))}
              <NavLink
                to="/users"
                className="text-md cursor-pointer self-center md:self-start  mt-4 font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Find more people
              </NavLink>
            </>
          ) : (
            <div className="flex flex-col items-center md:items-start gap-2 justify-self-center md:justify-self-start">
              <p className="text-xl">No ongoing chats</p>
              <NavLink
                to="/users"
                className="text-md cursor-pointer max-w-[120px] font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
              >
                Find people
              </NavLink>
            </div>
          )}
        </section>

        <ChatSection
          sectionToShow={sectionToShow}
          goBackFromSelectedChat={goBackFromSelectedChat}
          receiverId={receiverId}
        />
      </main>
      <Footer />
    </>
  );
};
export default Chats;
