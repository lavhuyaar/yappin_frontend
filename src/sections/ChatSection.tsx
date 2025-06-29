import { useEffect, useState } from "react";
import { LuRefreshCw } from "react-icons/lu";
import { IoArrowBack } from "react-icons/io5";

import { handleAxiosError } from "../utils/handleAxiosError";
import { axiosInstance } from "../api/axiosInstance";

import MessageInput from "../components/MessageInput";
import ChatSkeleton from "../components/skeletons/ChatSkeleton";

import type { IChat } from "../interfaces";

import { formatTime } from "../utils/formatTime";

import { SECTIONS_TO_SHOW } from "../constants";

interface IChatSectionProps {
  goBackFromSelectedChat: VoidFunction;
  sectionToShow: "chats-list" | "chatBox";
  receiverId: string | null;
}

const ChatSection = ({
  goBackFromSelectedChat,
  sectionToShow,
  receiverId,
}: IChatSectionProps) => {
  const [chat, setChat] = useState<IChat | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | undefined>(undefined);

  const refreshChat = async () => {
    setLoading(true);
    setError(undefined);
    try {
      const response = await axiosInstance.get(`/chats/chat/${receiverId}`);
      setChat(response.data?.chat);
    } catch (err) {
      handleAxiosError(err, "Failed to fetch Chat messages!", setError, false);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!receiverId) return;

    const getChat = async () => {
      setLoading(true);
      setError(undefined);
      try {
        const response = await axiosInstance.get(`/chats/chat/${receiverId}`);
        setChat(response.data?.chat);
      } catch (err) {
        handleAxiosError(
          err,
          "Failed to fetch Chat messages!",
          setError,
          false
        );
      } finally {
        setLoading(false);
      }
    };
    getChat();
  }, [receiverId]);

  // Default section (no chats selected)
  if (!receiverId) {
    return (
      <section
        className={`w-full hidden md:flex md:w-2/3 h-[80vh] flex-col items-center justify-center`}
      >
        <img src="/yappin-logo.png" alt="Yappin" width={400} />
        <h3 className="text-2xl text-primary">Yap the way you want!</h3>
      </section>
    );
  }

  // Loading skeleton
  if (loading) {
    return <ChatSkeleton />;
  }

  // Error
  if (error) {
    return (
      <section
        className={`${
          sectionToShow === SECTIONS_TO_SHOW.CHAT_BOX ? "flex" : "hidden"
        } w-full md:flex md:w-2/3 h-[80vh] flex-col items-center justify-center`}
      >
        <h3 className="text-center text-xl text-red-600 font-semibold">
          {error}
        </h3>
        <button
          onClick={refreshChat}
          className="mt-2 text-md cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
        >
          Retry
        </button>
        <button
          onClick={goBackFromSelectedChat}
          className="md:hidden mt-2 text-md cursor-pointer font-semibold text-primary-txt  bg-primary px-4 py-2 rounded-lg hover:bg-primary-hover transition"
        >
          Go back to chats
        </button>
      </section>
    );
  }

  return (
    <section
      className={`${
        sectionToShow === SECTIONS_TO_SHOW.CHAT_BOX ? "block" : "hidden"
      } w-full md:block md:w-2/3 h-full bg-surface/5 border-2 border-surface rounded-md`}
    >
      {chat && (
        <>
          <div className="flex gap-3 items-center p-2 bg-surface w-full">
            <IoArrowBack
              onClick={goBackFromSelectedChat}
              className="text-xl md:hidden"
              title="Back to chats"
            />
            <img
              className="!size-[60px] rounded-full shrink-0 m-1 bg-background object-cover object-center"
              src={
                chat?.userB?.id === receiverId
                  ? chat?.userB?.profilePicture ?? "/blank-pfp.webp"
                  : chat?.userA?.profilePicture ?? "/blank-pfp.webp"
              }
            />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">
                {chat?.userB?.id === receiverId
                  ? `${chat?.userB?.firstName} ${chat?.userB?.lastName}`
                  : `${chat?.userA?.firstName} ${chat?.userA?.lastName}`}
              </h2>
              <h4 className="text-xs font-semibold">
                @
                {chat?.userB?.id === receiverId
                  ? chat?.userB?.username
                  : chat?.userA?.username}
              </h4>
            </div>

            <LuRefreshCw
              className="justify-self-end cursor-pointer text-xl"
              title="Refresh"
              onClick={refreshChat}
            />
          </div>

          <div className="flex flex-col w-full h-[50vh] gap-2 py-5 px-2 overflow-y-auto chat">
            {chat?.messages.length > 0 ? (
              chat.messages.map((message) => (
                <div
                  key={message?.id}
                  className={`w-5/6 md:w-1/2 flex gap-3 items-start ${
                    message?.sender?.id === receiverId
                      ? "self-start flex-row"
                      : "self-end flex-row-reverse"
                  }`}
                >
                  <img
                    className="!size-[30px] mt-1 rounded-full shrink-0 bg-background object-cover object-center"
                    src={message?.sender?.profilePicture ?? "/blank-pfp.webp"}
                  />
                  <div
                    className={`break-all rounded-lg py-2 px-3 ${
                      message?.sender?.id === receiverId
                        ? "justify-self-start text-start bg-surface"
                        : "justify-self-end text-end bg-primary/15"
                    }`}
                  >
                    {message?.content}
                    <p className="text-[10px] mt-1 text-end">
                      {formatTime(message?.createdAt)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <>
                <p>No messages found.</p>
                <p>Start the conversation by sending one :)</p>
              </>
            )}
          </div>
          <MessageInput
            receiverId={receiverId}
            chatId={chat?.id}
            getUpdatedChat={refreshChat}
          />
        </>
      )}
    </section>
  );
};
export default ChatSection;
