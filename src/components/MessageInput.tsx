import { useEffect, useState } from "react";

import useChats from "../hooks/useChats";

import { axiosInstance } from "../api/axiosInstance";
import { handleAxiosError } from "../utils/handleAxiosError";

interface IMessageInputProps {
  receiverId: string | null;
  chatId: string | null;
  getUpdatedChat: VoidFunction;
}

const MessageInput: React.FC<IMessageInputProps> = ({
  receiverId,
  chatId,
  getUpdatedChat,
}) => {
  const [value, setValue] = useState<string>("");
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [valueValidator, setValueValidator] = useState<string>("");
  const [error, setError] = useState<string | undefined>(undefined);

  const { refreshChats } = useChats();

  const textAreaOnChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  //Ensures that an empty message is not sent by User
  useEffect(() => {
    if (!valueValidator) return;

    if (valueValidator) {
      if (value.trim()) {
        setValueValidator("");
      }
    }
  }, [value, valueValidator]);

  const onSubmit = async () => {
    // Ensures that User only sees the validation after he tries to submit empty message
    if (!value.trim()) {
      setValueValidator("Message cannot be empty");
      return;
    }

    // Prevents User from submitting message if message is empty
    if (valueValidator) return;

    setSubmitting(true);
    try {
      await axiosInstance.post("/message", {
        content: value,
        chatId,
        receiverId,
      });
      getUpdatedChat(); //Gets the updated chat
      setValue(""); //Resets textarea
      setError(undefined);
      refreshChats(); //Ensures refreshed Chats list
    } catch (err) {
      handleAxiosError(err, "Failed to send message", setError, false);
    } finally {
      setSubmitting(false);
    }
  };

  // const onPressEnter = (event: React.KeyboardEvent) => {
  //   if (event.key === "Enter") {
  //     onSubmit();
  //   }
  // };

  return (
    <div className="flex w-full items-start gap-2 mt-10 justify-end p-2 mb-4">
      <div className="w-full flex flex-col">
        <textarea
          name="message"
          id="message"
          className="text-text-primary border-2 border-primary-hover/10 rounded-md w-full p-2 min-h-[100px] resize-none focus:outline-none message-input"
          onChange={textAreaOnChange}
          placeholder="Your message..."
          // onKeyDown={onPressEnter}
          disabled={submitting}
          value={value}
        ></textarea>
        {error && <p className="text-xs mt-1 text-red-600">{error}</p>}
        {valueValidator && (
          <p className="text-xs mt-1 text-red-600">{valueValidator}</p>
        )}
      </div>

      <button
        disabled={submitting}
        onClick={onSubmit}
        className={`mt-1 text-md ${
          submitting
            ? "bg-primary/50"
            : "hover:bg-primary-hover transition bg-primary"
        } font-semibold cursor-pointer text-primary-txt   px-4 py-2 rounded-lg `}
      >
        Send
      </button>
    </div>
  );
};
export default MessageInput;
