import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router";

import useChats from "../hooks/useChats";
import useAuth from "../hooks/useAuth";

import { formatTime } from "../utils/formatTime";

import Header from "../components/Header";
import Footer from "../components/Footer";
import ChatSection from "../sections/ChatSection";

const Chats = () => {
  const { userData } = useAuth();
  const { chats } = useChats();
  const navigate = useNavigate();

  const [searchParams, setSearchParams] = useSearchParams();
  const receiverId: string | null = searchParams.get("with");

  useEffect(() => {
    if (!userData) {
      navigate("/login", { replace: true });
      return;
    }
  }, [userData]);

  const chatOnClick = (receiverId: string) => {
    const params = new URLSearchParams();
    params.set("with", receiverId);
    setSearchParams(params);
  };

  return (
    <>
      <Header />
      <main className="!flex-row text-text-primary p-6 gap-3">
        <section className="w-1/3 h-full">
          <h2 className="text-3xl text-primary mb-4">Chats</h2>
          {chats && chats?.length > 0 ? (
            chats.map((chat) => (
              <div
                title={chat?.users[0]?.username}
                onClick={() => chatOnClick(chat?.users[0]?.id)}
                key={chat.id}
                className={`p-3 flex items-center w-full cursor-pointer border-b border-primary-hover/10 ${
                  chat?.users[0]?.id === receiverId
                    ? "bg-primary-hover/10"
                    : "bg-surface"
                }`}
              >
                <img
                  className="!size-[35px] rounded-full shrink-0 bg-background object-cover object-center"
                  src={chat?.users[0]?.profilePicture ?? "/blank-pfp.webp"}
                />

                <div className="flex flex-col ml-4">
                  {" "}
                  {/* Other User's username */}
                  <h4 className="font-semibold">{chat.users[0].username}</h4>
                  {/* Latest message preview */}
                  {chat?.messages.length > 0 ? (
                    <p className="text-xs text-wrap break-all h-5 overflow-ellipsis overflow-hidden">
                      {/* If User is the sender of the last message */}
                      {chat.messages[0]?.sender?.id === userData?.id
                        ? "You: "
                        : `${chat.messages[0]?.sender?.firstName}: `}
                      {chat.messages[0]?.content}
                    </p>
                  ) : (
                    <p className="text-xs whitespace-break-spaces overflow-ellipsis overflow-hidden">
                      Click here to start the conversation
                    </p>
                  )}
                </div>
                <p className="ml-auto text-[10px] self-start mt-1 text-end">
                  {formatTime(chat?.messages[0]?.createdAt)}
                </p>
              </div>
            ))
          ) : (
            <p>No ongoing chats</p>
          )}
        </section>

        <ChatSection receiverId={receiverId} />
      </main>
      <Footer />
    </>
  );
};
export default Chats;
