import { FC, useState } from "react";

type ChatFormProps = {
  sendMessage: (message?: string) => void;
  isChatEnabled: boolean;
};

const ChatForm: FC<ChatFormProps> = ({ sendMessage, isChatEnabled }) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmitChatNewMessage = (event: React.FormEvent<Element>) => {
    event.preventDefault();
    sendMessage(message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSubmitChatNewMessage} className="form-container" style={{ minWidth: "500px" }}>
      <h1>Write something to everyone!</h1>
      <input
        className="form-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Your message"
        disabled={!isChatEnabled}
      />
      <button className="form-button capitalize" type="submit" disabled={!isChatEnabled}>
        Send message
      </button>
    </form>
  );
};

export default ChatForm;
