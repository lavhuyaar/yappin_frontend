import useAuth from "../hooks/useAuth";

import type { IMessage, IUser } from "../interfaces";
import { formatTime } from "../utils/formatTime";

interface IChatListProps {
  userB: IUser;
  messages: IMessage[];
  receiverId: string | null;
  chatOnClick: (userBId: string) => void;
}

const ChatList = ({
  userB,
  messages,
  receiverId,
  chatOnClick,
}: IChatListProps) => {
  const { userData } = useAuth();

  return (
    <div
      title={userB?.username}
      onClick={() => chatOnClick(userB?.id)}
      className={`p-3 flex items-center w-full cursor-pointer border-b border-primary-hover/10 ${
        userB?.id === receiverId ? "bg-primary-hover/10" : "bg-surface"
      }`}
    >
      <img
        className="!size-[35px] rounded-full shrink-0 bg-background object-cover object-center"
        src={userB?.profilePicture ?? "/blank-pfp.webp"}
      />

      <div className="flex flex-col ml-4">
        {" "}
        {/* Other User's username */}
        <h4 className="font-semibold">{userB.username}</h4>
        {/* Latest message preview */}
        {messages.length > 0 ? (
          <p className="text-xs text-wrap break-all h-5 overflow-ellipsis overflow-hidden">
            {/* If User is the sender of the last message */}
            {messages[0]?.sender?.id === userData?.id
              ? "You: "
              : `${messages[0]?.sender?.firstName}: `}
            {messages[0]?.content}
          </p>
        ) : (
          <p className="text-xs whitespace-break-spaces overflow-ellipsis overflow-hidden">
            Click here to start the conversation
          </p>
        )}
      </div>
      {messages[0]?.createdAt && (
        <p className="ml-auto text-[10px] self-start mt-1 text-end">
          {formatTime(messages[0].createdAt)}
        </p>
      )}
    </div>
  );
};
export default ChatList;
